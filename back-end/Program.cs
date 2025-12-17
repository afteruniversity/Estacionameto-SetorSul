using Skeleton.Utils;
using Skeleton.Modules;
using Skeleton.Services;
using Skeleton.Models;
using Skeleton.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Stripe;
using Skeleton.Settings;


var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.Configure<StripeSettings>(
    builder.Configuration.GetSection("Stripe")
);

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()
?? throw new InvalidOperationException("JwtSettings configuration is missing");

var stripeSecretKey = builder.Configuration["Stripe:SecretKey"]
    ?? throw new InvalidOperationException("Stripe SecretKey is missing");

StripeConfiguration.ApiKey = stripeSecretKey;

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Skeleton API",
        Version = "v1",
        Description = "Skeleton API Documentation with JWT Authentication"
    });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorCodesToAdd: null)
    ));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEnderecoUsuarioService, EnderecoUsuarioService>();
builder.Services.AddScoped<IEstacionamentoService, EstacionamentoService>();
builder.Services.AddScoped<IDiasSemanaService, DiasSemanaService>();
builder.Services.AddScoped<IStripeService, StripeService>();

builder.Services.AddHealthChecks();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseSwagger(c =>
    {
        c.RouteTemplate = "skeleton/swagger/{documentName}/swagger.json";
    });

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/skeleton/swagger/v1/swagger.json", "Skeleton API V1");
        c.RoutePrefix = "skeleton/docs";
    });

    app.MapGet("/", () => Results.Redirect("/skeleton/docs"))
        .ExcludeFromDescription();
}
else
{
    app.UseHttpsRedirection();
    app.UseHsts();
}

// CORS
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

StartupLogger.LogStartupInformation(app);

if (app.Environment.IsDevelopment())
{
    var endpoints = app.Services.GetRequiredService<IEnumerable<EndpointDataSource>>();
    Console.WriteLine("\n=== Registered Endpoints ===");
    foreach (var endpoint in endpoints.SelectMany(e => e.Endpoints))
    {
        if (endpoint is Microsoft.AspNetCore.Routing.RouteEndpoint routeEndpoint)
        {
            Console.WriteLine($"{routeEndpoint.RoutePattern.RawText}");
        }
    }
    Console.WriteLine("============================\n");
}

app.Run();

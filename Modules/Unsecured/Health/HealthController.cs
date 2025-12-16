namespace Skeleton.Modules;

public static class HealthController
{
    public static void MapHealthEndpoints(this WebApplication app)
    {
        var healthGroup = app.MapGroup("/health")
            .WithTags("Health");

        healthGroup.MapGet("/", () => Results.Ok(new
        {
            status = "Healthy",
            timestamp = DateTime.UtcNow,
            service = "Skeleton API"
        }))
        .WithName("HealthCheck")
        .WithOpenApi();

        healthGroup.MapGet("/ping", () => Results.Ok(new
        {
            message = "pong",
            timestamp = DateTime.UtcNow
        }))
        .WithName("Ping")
        .WithOpenApi();
    }
}

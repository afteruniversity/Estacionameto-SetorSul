namespace Skeleton.Utils;

using Microsoft.EntityFrameworkCore;

public static class StartupLogger
{
    public static void LogStartupInformation(WebApplication app)
    {
        app.Lifetime.ApplicationStarted.Register(async () =>
        {
            var logger = app.Services.GetRequiredService<ILogger<Program>>();
            var urls = app.Urls;
            var environment = app.Environment.EnvironmentName;

            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine(@"
    ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
    ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
    ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
    ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
    ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
    ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
                                 API
            ");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("╔════════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║              Skeleton API Started Successfully!                ║");
            Console.WriteLine("╚════════════════════════════════════════════════════════════════╝");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"🌍 Environment: {environment}");
            Console.WriteLine($"📍 Listening on: {string.Join(", ", urls)}");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"📚 Swagger UI: {urls.FirstOrDefault()?.Replace("http://", "https://")}/skeleton/docs");
            Console.WriteLine($"🏥 Health Check: {urls.FirstOrDefault()}/health");
            Console.ResetColor();

            await CheckDatabaseConnection(app, logger);

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("📚 Press Ctrl+C to shutdown");
            Console.ResetColor();
            Console.WriteLine();
        });
    }

    private static async Task CheckDatabaseConnection(WebApplication app, ILogger logger)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        try
        {
            Console.Write("💾 Database: ");

            var canConnect = await dbContext.Database.CanConnectAsync();

            if (canConnect)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.Write("✓ Connected");
                Console.ResetColor();

                var connectionString = dbContext.Database.GetConnectionString();
                var dbName = ExtractDatabaseName(connectionString);

                Console.ForegroundColor = ConsoleColor.Gray;
                Console.WriteLine($" ({dbName})");
                Console.ResetColor();

            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("✗ Failed to connect");
                Console.ResetColor();
                logger.LogWarning("Database connection failed");
            }
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"✗ Error: {ex.Message}");
            Console.ResetColor();
            logger.LogError(ex, "Database connection error");
        }
    }

    private static string ExtractDatabaseName(string? connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
            return "Unknown";

        var parts = connectionString.Split(';');
        var dbPart = parts.FirstOrDefault(p => p.Trim().StartsWith("Database=", StringComparison.OrdinalIgnoreCase));

        return dbPart?.Split('=')[1].Trim() ?? "Unknown";
    }
}

namespace Skeleton.Utils.Models;

using Microsoft.EntityFrameworkCore;
using Skeleton.Models;

public static class PaginationExtensions
{
    public static async Task<PagedResult<T>> ToPaginatedListAsync<T>(
        this IQueryable<T> source,
        int pageNumber,
        int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<T>(items, count, pageNumber, pageSize);
    }

    public static async Task<PagedResult<T>> ToPaginatedListAsync<T>(
        this IQueryable<T> source,
        PaginationParams paginationParams)
    {
        return await source.ToPaginatedListAsync(
            paginationParams.PageNumber,
            paginationParams.PageSize);
    }
}

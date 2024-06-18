
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApiContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }

    public ApiContext(DbContextOptions<ApiContext> options) : base(options)
    {
    }

    public ApiContext()
    {
    }
}
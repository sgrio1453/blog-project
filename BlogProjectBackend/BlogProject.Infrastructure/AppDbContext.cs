using BlogProject.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogProject.Infrastructure
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Id).ValueGeneratedOnAdd();
                entity.Property(u => u.UserName).IsRequired().HasMaxLength(50);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(50);

                entity.HasMany(u => u.Blogs)
                      .WithOne(b => b.User)
                      .HasForeignKey(b => b.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(u => u.Comments)
                      .WithOne(c => c.User)
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.CategoryName).IsRequired();
                entity.HasMany(c => c.Blogs)
                    .WithOne(a => a.Category)
                    .HasForeignKey(a => a.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.HasKey(b => b.Id);
                entity.Property(b => b.Title).IsRequired().HasMaxLength(50);
                entity.Property(b => b.Content).IsRequired();

                entity.HasMany(b => b.Comments)
                      .WithOne(c => c.Blog)
                      .HasForeignKey(c => c.BlogId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Content).IsRequired().HasMaxLength(500);
                entity.HasOne(c => c.User)
                      .WithMany(u => u.Comments)
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(c => c.Blog)
                      .WithMany(b => b.Comments)
                      .HasForeignKey(c => c.BlogId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }

    }
}

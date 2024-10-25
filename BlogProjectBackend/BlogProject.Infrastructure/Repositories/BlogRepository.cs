using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Infrastructure.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly AppDbContext _context;

        public BlogRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddBlogAsync(Blog blog)
        {
            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogAsync(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if(blog != null)
            {
                _context.Comments.RemoveRange(blog.Comments);
                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Blog>> GetAllBlogsAsync()
        {
            return await _context.Blogs.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Blog> GetBlogByIdAsync(int id)
        {
            return await _context.Blogs.Include(c => c.Comments).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task UpdateBlogAsync(Blog blog)
        {
            _context.Blogs.Update(blog);
            await _context.SaveChangesAsync();
        }
    }
}

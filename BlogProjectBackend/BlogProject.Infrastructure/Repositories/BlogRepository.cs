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

        public void DeleteBlog(int id)
        {
            var comments = _context.Comments.Where(c => c.BlogId == id).ToList();
            _context.Comments.RemoveRange(comments);


            var blog =  _context.Blogs.Find(id);
            if(blog != null)
            {
                _context.Comments.RemoveRange(blog.Comments);
                _context.Blogs.Remove(blog);
            }

            _context.SaveChanges();
        }

        public async Task<List<Blog>> GetAllBlogsAsync()
        {
            return await _context.Blogs.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Blog> GetBlogByIdAsync(int id)
        {
            return await _context.Blogs.Include(c => c.Comments).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Blog>> GetBlogsByCategoryIdAsync(int categoryId)
        {
            return await _context.Blogs
                .Where(b => b.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<List<Blog>> GetBlogsByUserIdAsync(string userId)
        {
            return await _context.Blogs
                .Where (b => b.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<Blog>> SearchBlogsAsync(string searchTerm)
        {
            var blogs = await _context.Blogs
                .Include(b => b.User)
                .Include(b => b.Category)
                .Where(b =>
                    b.Title.Contains(searchTerm) ||
                    b.Category.CategoryName.Contains(searchTerm) ||
                    b.User.DisplayName.Contains(searchTerm))
                .ToListAsync();

            return blogs;
        }


        public async void UpdateBlog(Blog blog)
        {
            _context.Blogs.Update(blog);
            await _context.SaveChangesAsync();
        }
    }
}

using BlogProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Interfaces
{
    public interface IBlogRepository
    {
        Task<List<Blog>> GetAllBlogsAsync();
        Task<Blog> GetBlogByIdAsync(int id);
        Task<List<Blog>> GetBlogsByCategoryIdAsync(int categoryId);
        Task<List<Blog>> GetBlogsByUserIdAsync(string userId);
        Task<List<Blog>> SearchBlogsAsync(string searchTerm);
        Task AddBlogAsync(Blog blog);
        void UpdateBlog(Blog blog);
        void DeleteBlog(int id);
    }
}

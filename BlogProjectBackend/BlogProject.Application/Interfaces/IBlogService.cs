using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.Result;
using Microsoft.AspNetCore.Http;

namespace BlogProject.Application.Interfaces
{
    public interface IBlogService
    {
        Task<ServiceResult<BlogDto>> GetBlogByIdAsync(int id);
        Task<ServiceResult<List<BlogDto>>> GetAllBlogsAsync();
        Task<ServiceResult<BlogDto>> CreateBlogAsync(BlogCreateDto blogCreateDto, IFormFile blogImage);
        Task<ServiceResult<BlogDto>> UpdateBlogAsync(int blogId, BlogUpdateDto blogUpdateDto, IFormFile blogImage);
        Task<ServiceResult> DeleteBlogAsync(int id);
    }
}

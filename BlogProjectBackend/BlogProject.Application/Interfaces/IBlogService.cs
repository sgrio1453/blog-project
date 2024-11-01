﻿using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.Result;
using BlogProject.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace BlogProject.Application.Interfaces
{
    public interface IBlogService
    {
        Task<ServiceResult<BlogDto>> GetBlogByIdAsync(int id);
        Task<ServiceResult<List<BlogDto>>> GetAllBlogsAsync();
        Task<ServiceResult<List<BlogDto>>> GetBlogsByCategoryIdAsync(int categoryId);
        Task<ServiceResult<List<BlogDto>>> GetBlogsByUserIdAsync(string userId);
        Task<ServiceResult<BlogDto>> CreateBlogAsync(BlogCreateDto blogCreateDto, IFormFile blogImage);
        Task<ServiceResult<BlogDto>> UpdateBlogAsync(int blogId, BlogUpdateDto blogUpdateDto, IFormFile blogImage);
        Task<ServiceResult<List<BlogDto>>> SearchBlogsAsync(string searchTerm);
        Task<ServiceResult> DeleteBlogAsync(int id);
    }
}

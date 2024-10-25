using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.DTOs.Category;
using BlogProject.Application.Result;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResult<List<CategoryDto>>> GetAllCategoriesAsync();
        Task<ServiceResult<CategoryDto>> GetCategoryByIdAsync(int id);
        Task<ServiceResult<CategoryDto>> CreateCategoryAsync(CategoryCreateDto categoryCreateDto);
        Task<ServiceResult<CategoryDto>> UpdateCategoryAsync(int id, CategoryCreateDto categoryCreateDto);
        Task<ServiceResult> DeleteCategoryAsync(int id);
    }
}

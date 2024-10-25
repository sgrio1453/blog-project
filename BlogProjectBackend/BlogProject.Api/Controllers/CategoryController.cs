using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.DTOs.Category;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : CustomBaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var result = await _categoryService.GetAllCategoriesAsync();

            return CreateActionResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var result = await _categoryService.GetCategoryByIdAsync(id);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CategoryCreateDto categoryCreateDto)
        {
            var result = await _categoryService.CreateCategoryAsync(categoryCreateDto);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id,CategoryCreateDto categoryCreateDto)
        {
            var result = await _categoryService.UpdateCategoryAsync(id, categoryCreateDto);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);
            return CreateActionResult(result);
        }

    }
}

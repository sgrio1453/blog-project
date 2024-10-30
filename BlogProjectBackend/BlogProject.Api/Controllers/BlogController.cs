using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Service;
using BlogProject.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BlogProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : CustomBaseController
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromForm] BlogCreateDto blogCreateDto, IFormFile? blogImage)
        {
            var result = await _blogService.CreateBlogAsync(blogCreateDto, blogImage);
            return CreateActionResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var result = await _blogService.GetAllBlogsAsync();

            if (!result.IsSuccess)
            {
                return CreateActionResult(result);
            }

            return CreateActionResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogId(int id)
        {
            var result = await _blogService.GetBlogByIdAsync(id);
            return CreateActionResult(result);
        }

        [HttpGet("categoryWithBlogs/{categoryId}")]
        public async Task<IActionResult> GetAllCategoryWithBlogs(int categoryId)
        {
            var result = await _blogService.GetBlogsByCategoryIdAsync(categoryId);

            return CreateActionResult(result);
        }

    
        [HttpGet("userWithBlogs/{userId}")]
        public async Task<IActionResult> GetAllCategoryWithBlogs(string userId)
        {
            var result = await _blogService.GetBlogsByUserIdAsync(userId);

            return CreateActionResult(result);
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog( int id, [FromForm] BlogUpdateDto blogUpdateDto, IFormFile? blogImage)
        {
            var result = await _blogService.UpdateBlogAsync(id, blogUpdateDto, blogImage);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var result = await _blogService.DeleteBlogAsync(id);
            return CreateActionResult(result);
        }


        [HttpGet("search")]
        public async Task<IActionResult> SearchBlogs([FromQuery] string query)
        {
            var result = await _blogService.SearchBlogsAsync(query);
            return CreateActionResult(result);
        }


    }
}

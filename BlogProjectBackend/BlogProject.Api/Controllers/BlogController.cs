using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

    }
}

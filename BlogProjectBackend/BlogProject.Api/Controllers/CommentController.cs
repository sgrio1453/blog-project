using BlogProject.Application.DTOs.Comment;
using BlogProject.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : CustomBaseController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentCreateDto commentCreateDto)
        {
            var result = await _commentService.CreateCommentAsync(commentCreateDto);
            return CreateActionResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            var result = await _commentService.GetCommentByIdAsync(id);
            return CreateActionResult(result);
        }

        [HttpGet("blog/{blogId}")]
        public async Task<IActionResult> GetCommentByBlogId(int blogId)
        {
            var result = await _commentService.GetCommentsByBlogIdAsync(blogId);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, CommentUpdateDto commentUpdateDto)
        {
            var result = await _commentService.UpdateCommentAsync(id, commentUpdateDto);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var result = await _commentService.DeleteCommentAsync(id);
            return CreateActionResult(result);
        }
    }
}

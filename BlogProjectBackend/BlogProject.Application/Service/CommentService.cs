using AutoMapper;
using BlogProject.Application.DTOs.Comment;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Result;
using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogProject.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task<ServiceResult<CommentDto>> CreateCommentAsync(CommentCreateDto commentCreateDto)
        {
            if (string.IsNullOrEmpty(commentCreateDto.Content))
            {
                return ServiceResult<CommentDto>.Fail("Yorum içeriği boş olamaz.", HttpStatusCode.BadRequest);
            }
            var comment = _mapper.Map<Comment>(commentCreateDto);
            comment.UserId = GetCurrentUserId();
            comment.CreatedAt = DateTime.Now;
            await _commentRepository.AddCommentAsync(comment);
            var createdCommentDto = _mapper.Map<CommentDto>(comment);
            return ServiceResult<CommentDto>.SuccessAsCreated(createdCommentDto, $"api/blog/{comment.Id}");
        }

        public async Task<ServiceResult> DeleteCommentAsync(int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return ServiceResult.Fail("Yorum bulunamadı.", HttpStatusCode.NotFound);
            }

            var userId = GetCurrentUserId();
            if (comment.UserId != userId)
            {
                return ServiceResult.Fail("Yalnızca kendi yorumlarınızı silebilirsiniz.", HttpStatusCode.Forbidden);
            }

            await _commentRepository.DeleteCommentAsync(id);
            return ServiceResult.Success(HttpStatusCode.NoContent);
        }

        public async Task<ServiceResult<CommentDto>> GetCommentByIdAsync(int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return ServiceResult<CommentDto>.Fail("Yorum bulunamadı.", HttpStatusCode.NotFound);
            }

            var commentDto = _mapper.Map<CommentDto>(comment);
            return ServiceResult<CommentDto>.Success(commentDto);
        }

        public async Task<ServiceResult<List<CommentDto>>> GetCommentsByBlogIdAsync(int blogId)
        {
            var comments = await _commentRepository.GetCommentsByBlogIdAsync(blogId);
            var commentsDto = _mapper.Map<List<CommentDto>>(comments);
            return ServiceResult<List<CommentDto>>.Success(commentsDto);
        }

        public async Task<ServiceResult<CommentDto>> UpdateCommentAsync(int id, CommentUpdateDto commentUpdateDto)
        {
            var existingComment = await _commentRepository.GetCommentByIdAsync(id);
            if (existingComment == null)
            {
                return ServiceResult<CommentDto>.Fail("Yorum bulunamadı.", HttpStatusCode.NotFound);
            }

            var userId = GetCurrentUserId();
            if (existingComment.UserId != userId)
            {
                return ServiceResult<CommentDto>.Fail("Yalnızca kendi yorumlarınızı güncelleyebilirsiniz.", HttpStatusCode.Forbidden);
            }

            if (string.IsNullOrEmpty(commentUpdateDto.Content))
            {
                return ServiceResult<CommentDto>.Fail("Yorum içeriği boş olamaz.", HttpStatusCode.BadRequest);
            }

            existingComment.Content = commentUpdateDto.Content;
            existingComment.Updated = DateTime.Now;


            await _commentRepository.UpdateCommentAsync(existingComment);
            var updatedCommentDto = _mapper.Map<CommentDto>(existingComment);
            return ServiceResult<CommentDto>.Success(updatedCommentDto);
        }
    }
}

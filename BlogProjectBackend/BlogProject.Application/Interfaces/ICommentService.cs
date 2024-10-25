using BlogProject.Application.DTOs.Comment;
using BlogProject.Application.Result;

namespace BlogProject.Application.Interfaces
{
    public interface ICommentService
    {
        Task<ServiceResult<CommentDto>> GetCommentByIdAsync(int id);
        Task<ServiceResult<List<CommentDto>>> GetCommentsByBlogIdAsync(int blogId);
        Task<ServiceResult<CommentDto>> CreateCommentAsync(CommentCreateDto commentCreateDto);
        Task<ServiceResult<CommentDto>> UpdateCommentAsync(int id, CommentUpdateDto commentUpdateDto);
        Task<ServiceResult> DeleteCommentAsync(int id);
    }
}

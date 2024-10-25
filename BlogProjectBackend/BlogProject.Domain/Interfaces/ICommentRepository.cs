using BlogProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync();
        Task<List<Comment>> GetCommentsByBlogIdAsync(int blogId);
        Task<List<Comment>> GetCommentsByUserIdAsync(string userId);
        Task<Comment> GetCommentByIdAsync(int commentId);
        Task AddCommentAsync(Comment comment);
        void UpdateComment(Comment comment);
        void DeleteComment(int commentId);
    }
}

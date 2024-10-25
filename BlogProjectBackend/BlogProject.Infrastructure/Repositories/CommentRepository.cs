using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async void DeleteComment(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if(comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment> GetCommentByIdAsync(int commentId)
        {
            return await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);
        }

        public async Task<List<Comment>> GetCommentsByBlogIdAsync(int blogId)
        {
            return await _context.Comments.Where(c => c.BlogId == blogId).ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsByUserIdAsync(string userId)
        {
            return await _context.Comments.Where(c => c.UserId == userId).ToListAsync();
        }

        public async void UpdateComment(Comment comment)
        {
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }
    }
}

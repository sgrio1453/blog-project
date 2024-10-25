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
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async void DeleteUser(string userId)
        {
            var user = await _context.Users
                                     .Include(u => u.Blogs)
                                     .Include(u => u.Comments)
                                     .FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null)
            {
                _context.Comments.RemoveRange(user.Comments);

                foreach (var blog in user.Blogs)
                {
                    var blogComments = await _context.Comments.Where(c => c.BlogId == blog.Id).ToListAsync();
                    _context.Comments.RemoveRange(blogComments);
                    _context.Blogs.Remove(blog);
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async void UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}

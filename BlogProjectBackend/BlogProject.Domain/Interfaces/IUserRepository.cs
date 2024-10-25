using BlogProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string userId);
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<User> GetUserByUserNameAsync(string userName);
        void UpdateUser(User user);
        void DeleteUser(string userId);
    }
}

using BlogProject.Application.DTOs;
using BlogProject.Application.DTOs.User;
using BlogProject.Application.Result;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResult<List<UserDto>>> GetAllUsersAsync();
        Task<ServiceResult<UserDto>> GetUserByIdAsync(string userId);
        Task<ServiceResult<UserDto>> CreateUserAsync(UserCreateDto userCreateDto, IFormFile profileImage);
        Task<ServiceResult<UserDto>> UpdateUserAsync(string userId, UserUpdateDto userUpdateDto, IFormFile profileImage);
        Task<ServiceResult> UpdateUserPasswordAsync(string userId, UserPasswordUpdateDto userPasswordUpdateDto);
        Task<ServiceResult> DeleteUserAsync(string userId);
        Task<ServiceResult<string>> LoginAsync(UserLoginDto userLoginDto);
        Task<ServiceResult<UserDto>> GetCurrentUserProfileAsync();
    }
}

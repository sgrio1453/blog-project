using BlogProject.Application.DTOs;
using BlogProject.Application.DTOs.User;
using BlogProject.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {

        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] UserCreateDto userCreateDto, IFormFile? imagePath)
        {
            var result = await _userService.CreateUserAsync(userCreateDto, imagePath);
            return CreateActionResult(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var result = await _userService.LoginAsync(userLoginDto);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var result = await _userService.GetUserByIdAsync(id);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromForm] string id,[FromForm] UserUpdateDto userUpdateDto, IFormFile? ImagePath)
        {
            var result = await _userService.UpdateUserAsync(id, userUpdateDto, ImagePath);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpPut("{id}/update-password")]
        public async Task<IActionResult> UpdateUserPassword(string id, UserPasswordUpdateDto userPasswordUpdateDto)
        {
            var result = await _userService.UpdateUserPasswordAsync(id, userPasswordUpdateDto);
            return CreateActionResult(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _userService.DeleteUserAsync(id);
            return CreateActionResult(result);
        }
    }
}

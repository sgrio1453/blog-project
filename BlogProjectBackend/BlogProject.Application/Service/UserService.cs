using AutoMapper;
using BlogProject.Application.DTOs;
using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.DTOs.User;
using BlogProject.Application.Helpers;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Result;
using BlogProject.Domain.Constant;
using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace BlogProject.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly ITokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, ITokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }

        private string? GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext?.User?.FindFirst("sub")?.Value;
        }

        public async Task<ServiceResult<UserDto>> CreateUserAsync(UserCreateDto userCreateDto, IFormFile profileImage)
        {
            var existingUserByUserName = await _userRepository.GetUserByUserNameAsync(userCreateDto.UserName);
            if (existingUserByUserName != null)
            {
                return ServiceResult<UserDto>.Fail("Bu kullanıcı adı zaten mevcut.", HttpStatusCode.Conflict);
            }

            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(userCreateDto.Email);
            if (existingUserByEmail != null)
            {
                return ServiceResult<UserDto>.Fail("Bu e-posta adresi zaten kullanılıyor.", HttpStatusCode.Conflict);
            }

            var user = _mapper.Map<User>(userCreateDto);
            HashingHelper.CreatePasswordHash(userCreateDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = Convert.ToBase64String(passwordHash);
            user.PasswordSalt = Convert.ToBase64String(passwordSalt);

            if (profileImage != null)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(profileImage.FileName)}";
                var imagePath = await _photoService.SavePhotoAsync(profileImage, "ProfileImages", fileName);
                user.ProfileImagePath = imagePath;
            }
            else
            {
                user.ProfileImagePath = $"{Url.BaseUrl}/Photos/DefaultPhoto/profile.png";
            }

            user.CreatedAt = DateTime.Now;
            await _userRepository.AddUserAsync(user);

            var createdUserDto = _mapper.Map<UserDto>(user);
            return ServiceResult<UserDto>.SuccessAsCreated(createdUserDto, $"api/blog/{createdUserDto.Id}");
        }

        public async Task<ServiceResult> DeleteUserAsync(string userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return ServiceResult.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            if (!string.IsNullOrEmpty(user.ProfileImagePath))
            {
                _photoService.DeletePhoto(user.ProfileImagePath);
            }

            _userRepository.DeleteUser(userId);

            return ServiceResult.Success(HttpStatusCode.NoContent);
        }
        public async Task<ServiceResult<List<UserDto>>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            var usersAsDto = _mapper.Map<List<UserDto>>(users);
            return ServiceResult<List<UserDto>>.Success(usersAsDto);
        }

        public async Task<ServiceResult<UserDto>> GetUserByIdAsync(string userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return ServiceResult<UserDto>.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            var userDto = _mapper.Map<UserDto>(user);
            return ServiceResult<UserDto>.Success(userDto);
        }

        public async Task<ServiceResult<string>> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(userLoginDto.Email);

            if (user == null)
            {
                return ServiceResult<string>.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            var isPasswordValid = HashingHelper.VerifyPasswordHash(userLoginDto.Password,
                Convert.FromBase64String(user.PasswordHash), Convert.FromBase64String(user.PasswordSalt));

            if (!isPasswordValid)
            {
                return ServiceResult<string>.Fail("Geçersiz şifre.", HttpStatusCode.Unauthorized);
            }

            var token = _tokenService.CreateToken(user);
            return ServiceResult<string>.Success(token);
        }

        public async Task<ServiceResult<UserDto>> UpdateUserAsync(string userId, UserUpdateDto userUpdateDto, IFormFile profileImage)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return ServiceResult<UserDto>.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            var existingUserByUserName = await _userRepository.GetUserByUserNameAsync(userUpdateDto.UserName);
            if (existingUserByUserName != null && existingUserByUserName.Id != userId)
            {
                return ServiceResult<UserDto>.Fail("Bu kullanıcı adı zaten mevcut.", HttpStatusCode.Conflict);
            }

            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(userUpdateDto.Email);
            if (existingUserByEmail != null && existingUserByEmail.Id != userId)
            {
                return ServiceResult<UserDto>.Fail("Bu e-posta adresi zaten kullanılıyor.", HttpStatusCode.Conflict);
            }

            user.UserName = userUpdateDto.UserName;
            user.Email = userUpdateDto.Email;
            user.DisplayName = userUpdateDto.DisplayName;

            if (profileImage != null)
            {
                if (!string.IsNullOrEmpty(user.ProfileImagePath))
                {
                    _photoService.DeletePhoto(user.ProfileImagePath);
                }

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(profileImage.FileName)}";
                var imagePath = await _photoService.SavePhotoAsync(profileImage, "ProfileImages", fileName);
                user.ProfileImagePath = imagePath;
            }

            user.Updated = DateTime.Now;
            _userRepository.UpdateUser(user);

            var updatedUserDto = _mapper.Map<UserDto>(user);
            return ServiceResult<UserDto>.Success(updatedUserDto);
        }

        public async Task<ServiceResult> UpdateUserPasswordAsync(string userId, UserPasswordUpdateDto userPasswordUpdateDto)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return ServiceResult.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            var passwordHash = Convert.FromBase64String(user.PasswordHash);
            var passwordSalt = Convert.FromBase64String(user.PasswordSalt);
            var isPasswordValid = HashingHelper.VerifyPasswordHash(userPasswordUpdateDto.CurrentPassword, passwordHash, passwordSalt);

            if (!isPasswordValid)
            {
                return ServiceResult.Fail("Mevcut şifre hatalı.", HttpStatusCode.BadRequest);
            }

            HashingHelper.CreatePasswordHash(userPasswordUpdateDto.NewPassword, out byte[] newPasswordHash, out byte[] newPasswordSalt);
            user.PasswordHash = Convert.ToBase64String(newPasswordHash);
            user.PasswordSalt = Convert.ToBase64String(newPasswordSalt);

            user.Updated = DateTime.Now;

            _userRepository.UpdateUser(user);

            return ServiceResult.Success(HttpStatusCode.NoContent);
        }

        public async Task<ServiceResult<UserDto>> GetCurrentUserProfileAsync()
        {
            var userId = GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return ServiceResult<UserDto>.Fail("Kullanıcı kimliği alınamadı.", HttpStatusCode.Unauthorized);
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return ServiceResult<UserDto>.Fail("Kullanıcı bulunamadı.", HttpStatusCode.NotFound);
            }

            var userDto = _mapper.Map<UserDto>(user);
            return ServiceResult<UserDto>.Success(userDto);
        }
    }
}

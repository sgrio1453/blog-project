using AutoMapper;
using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Result;
using BlogProject.Domain.Constant;
using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogProject.Application.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BlogService(IBlogRepository blogRepository, IMapper mapper, IPhotoService photoService, IHttpContextAccessor httpContextAccessor)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
            _photoService = photoService;
            _httpContextAccessor = httpContextAccessor;
        }

        private string GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task<ServiceResult<BlogDto>> CreateBlogAsync(BlogCreateDto blogCreateDto, IFormFile blogImage)
        {
            var blog = _mapper.Map<Blog>(blogCreateDto);
            blog.UserId = GetCurrentUserId(); 

            if (blogImage != null)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(blogImage.FileName)}";
                var imagePath = await _photoService.SavePhotoAsync(blogImage, "BlogImages", fileName);
                blog.ImagePath = imagePath;
            } else
            {
                blog.ImagePath = $"{Url.BaseUrl}/Photos/DefaultPhoto/blog.png"; ;
            }
            blog.CreatedAt = DateTime.Now;
            await _blogRepository.AddBlogAsync(blog);
            var createdBlogDto = _mapper.Map<BlogDto>(blog);
            return ServiceResult<BlogDto>.SuccessAsCreated(createdBlogDto, $"api/blog/{createdBlogDto.Id}");
        }

        public async Task<ServiceResult> DeleteBlogAsync(int id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id);
            if (blog == null)
            {
                return ServiceResult.Fail("Blog bulunamadı.", HttpStatusCode.NotFound);
            }

            var userId = GetCurrentUserId();
            if (blog.UserId != userId)
            {
                return ServiceResult.Fail("Yalnızca kendi bloglarınızı silebilirsiniz.", HttpStatusCode.Forbidden);
            }

            if (!string.IsNullOrEmpty(blog.ImagePath))
            {
                _photoService.DeletePhoto(blog.ImagePath);
            }

            _blogRepository.DeleteBlog(id);
            return ServiceResult.Success(HttpStatusCode.NoContent);
        }

        public async Task<ServiceResult<List<BlogDto>>> GetAllBlogsAsync()
        {
            var blogs = await _blogRepository.GetAllBlogsAsync();
            var blogsAsDto = _mapper.Map<List<BlogDto>>(blogs);
            return ServiceResult<List<BlogDto>>.Success(blogsAsDto);
        }

        public async Task<ServiceResult<BlogDto>> GetBlogByIdAsync(int id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id);
            if (blog == null)
            {
                return ServiceResult<BlogDto>.Fail("Blog bulunamadı.", HttpStatusCode.NotFound);
            }

            var blogAsDto = _mapper.Map<BlogDto>(blog);
            return ServiceResult<BlogDto>.Success(blogAsDto);
        }

        public async Task<ServiceResult<List<BlogDto>>> GetBlogsByCategoryIdAsync(int categoryId)
        {
            var blogs = await _blogRepository.GetBlogsByCategoryIdAsync(categoryId);

            if (blogs == null)
            {
                return ServiceResult<List<BlogDto>>.Fail("Kategoriye ait blog bulunamadı", HttpStatusCode.NotFound);
            }

            var blogsAsDto = _mapper.Map<List<BlogDto>>(blogs);
            return ServiceResult<List<BlogDto>>.Success(blogsAsDto);
        }

        public async Task<ServiceResult<List<BlogDto>>> GetBlogsByUserIdAsync(string userId)
        {
            var blogs = await _blogRepository.GetBlogsByUserIdAsync(userId);

            if (blogs == null)
            {
                return ServiceResult<List<BlogDto>>.Fail("Kullanıcıya ait blog bulunamadı", HttpStatusCode.NotFound);
            }

            var blogsAsDto = _mapper.Map<List<BlogDto>>(blogs);
            return ServiceResult<List<BlogDto>>.Success(blogsAsDto);
        }
        public async Task<ServiceResult<List<BlogDto>>> SearchBlogsAsync(string searchTerm)
        {
            var blogs = await _blogRepository.SearchBlogsAsync(searchTerm);
            var blogsAsDto = _mapper.Map<List<BlogDto>>(blogs);

            return ServiceResult<List<BlogDto>>.Success(blogsAsDto);
        }


        public async Task<ServiceResult<BlogDto>> UpdateBlogAsync(int blogId, BlogUpdateDto blogUpdateDto, IFormFile blogImage)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(blogId);
            if (blog == null)
            {
                return ServiceResult<BlogDto>.Fail("Blog bulunamadı.", HttpStatusCode.NotFound);
            }

            var userId = GetCurrentUserId();
            if (blog.UserId != userId)
            {
                return ServiceResult<BlogDto>.Fail("Yalnızca kendi bloglarınızı güncelleyebilirsiniz.", HttpStatusCode.Forbidden);
            }

            blog.Title = blogUpdateDto.Title;
            blog.Content = blogUpdateDto.Content;
            blog.CategoryId = blogUpdateDto.CategoryId;

            if (blogImage != null)
            {
                if (!string.IsNullOrEmpty(blog.ImagePath))
                {
                    _photoService.DeletePhoto(blog.ImagePath);
                }

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(blogImage.FileName)}";
                var imagePath = await _photoService.SavePhotoAsync(blogImage, "BlogImages", fileName);
                blog.ImagePath = imagePath;
            }

            blog.Updated = DateTime.Now;

            _blogRepository.UpdateBlog(blog);

            var updatedBlogDto = _mapper.Map<BlogDto>(blog);

            return ServiceResult<BlogDto>.Success(updatedBlogDto);
        }
    }
}

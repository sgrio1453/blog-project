using AutoMapper;
using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.DTOs.Category;
using BlogProject.Application.DTOs.Comment;
using BlogProject.Application.Interfaces;
using BlogProject.Application.Result;
using BlogProject.Domain.Entities;
using BlogProject.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<CategoryDto>> CreateCategoryAsync(CategoryCreateDto categoryCreateDto)
        {
            var existingCategory = await _categoryRepository.GetCategoryByNameAsync(categoryCreateDto.CategoryName);
            if (existingCategory != null)
            {
                return ServiceResult<CategoryDto>.Fail("Bu isimde başka bir kategori zaten mevcut.", HttpStatusCode.Conflict);
            }

            var category = _mapper.Map<Category>(categoryCreateDto);

            await _categoryRepository.AddCategoryAsync(category);
            var categoryAsDto = _mapper.Map<CategoryDto>(category);
            return ServiceResult<CategoryDto>.Success(categoryAsDto);
        }

        public async Task<ServiceResult> DeleteCategoryAsync(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            if(category == null)
            {
                return ServiceResult.Fail("Category bulunamadı", HttpStatusCode.NotFound);
            }

            _categoryRepository.DeleteCategory(id);
            return ServiceResult.Success(HttpStatusCode.NoContent);
        }

        public async Task<ServiceResult<List<CategoryDto>>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();
            var categoriesAsDto = _mapper.Map<List<CategoryDto>>(categories);
            return ServiceResult<List<CategoryDto>>.Success(categoriesAsDto);
        }

        public async Task<ServiceResult<CategoryDto>> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            if(category == null)
            {
                return ServiceResult<CategoryDto>.Fail("Category bulunamadı", HttpStatusCode.NotFound);
            }

            var categoryAsDto = _mapper.Map<CategoryDto>(category);
            return ServiceResult<CategoryDto>.Success(categoryAsDto);
        }

        public async Task<ServiceResult<CategoryDto>> UpdateCategoryAsync(int id, CategoryCreateDto categoryCreateDto)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            if(category == null)
            {
                return ServiceResult<CategoryDto>.Fail("Category bulunamadı", HttpStatusCode.NotFound);
            }

            var existingCategory = await _categoryRepository.GetCategoryByNameAsync(categoryCreateDto.CategoryName);
            if (existingCategory != null)
            {
                return ServiceResult<CategoryDto>.Fail("Bu isimde başka bir kategori zaten mevcut.", HttpStatusCode.Conflict);
            }

            category.CategoryName = categoryCreateDto.CategoryName;


            _categoryRepository.UpdateCategory(category);
            var updatedCategoryDto = _mapper.Map<CategoryDto>(category);
            return ServiceResult<CategoryDto>.Success(updatedCategoryDto);
        }
    }
}

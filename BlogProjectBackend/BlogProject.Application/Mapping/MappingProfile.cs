using AutoMapper;
using BlogProject.Application.DTOs.Blog;
using BlogProject.Application.DTOs.Comment;
using BlogProject.Application.DTOs.User;
using BlogProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();


            CreateMap<Blog, BlogDto>().ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments)).ReverseMap();
            CreateMap<BlogCreateDto, Blog>();
            CreateMap<BlogUpdateDto, Blog>();


            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<CommentCreateDto, Comment>();
            CreateMap<CommentUpdateDto, Comment>();
        }
    }
}

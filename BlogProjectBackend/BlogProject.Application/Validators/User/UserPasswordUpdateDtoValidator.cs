using BlogProject.Application.DTOs.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Validators.User
{
    public class UserPasswordUpdateDtoValidator : AbstractValidator<UserPasswordUpdateDto>
    {
        public UserPasswordUpdateDtoValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty().WithMessage("Mevcut şifre boş olamaz.");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("Yeni şifre boş olamaz.")
                .MinimumLength(6).WithMessage("Yeni şifre en az 6 karakter olmalıdır.");
        }
    }
}

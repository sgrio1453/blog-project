using BlogProject.Domain.Entities;

namespace BlogProject.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}

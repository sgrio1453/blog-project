using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.Interfaces
{
    public interface IPhotoService
    {
        Task<string> SavePhotoAsync(IFormFile photo, string directoryName, string fileName);
        void DeletePhoto(string filePath);
    }
}

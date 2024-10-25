using BlogProject.Application.Interfaces;
using BlogProject.Domain.Constant;
using Microsoft.AspNetCore.Http;

namespace BlogProject.Infrastructure.FileStorage
{
    public class PhotoHelper : IPhotoService
    {
        private readonly string _photosPath;

        public PhotoHelper(string photosPath)
        {
            _photosPath = photosPath;
        }

        public async Task<string> SavePhotoAsync(IFormFile photo, string directoryName, string fileName)
        {
            if (photo == null || photo.Length == 0)
                return null;

            var directoryPath = Path.Combine(_photosPath, directoryName);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            var filePath = Path.Combine(directoryPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            return $"{Url.BaseUrl}/Photos/{directoryName}/{fileName}";
        }

        public void DeletePhoto(string filePath)
        {
            var fullPath = Path.Combine(_photosPath, filePath.TrimStart('/'));
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }
}

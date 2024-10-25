using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.DTOs.User
{
    public class UserUpdateDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
    }
}

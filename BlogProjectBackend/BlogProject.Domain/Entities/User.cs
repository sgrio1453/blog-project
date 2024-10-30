using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Entities
{
    public class User
    {
        public string Id { get; set; }           
        public string UserName { get; set; }       
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Email { get; set; }          
        public string DisplayName { get; set; }   
        public string ProfileImagePath { get; set; } 
        public DateTime CreatedAt { get; set; }  
        public DateTime? Updated { get; set; }  
        public List<Blog> Blogs { get; set; }  
        public List<Comment> Comments { get; set; }
    }
}

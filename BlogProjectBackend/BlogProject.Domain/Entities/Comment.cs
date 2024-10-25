using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? Updated { get; set; }
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}

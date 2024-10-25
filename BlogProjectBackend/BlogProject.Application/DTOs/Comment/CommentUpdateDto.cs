using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Application.DTOs.Comment
{
    public class CommentUpdateDto
    {
        public string Content { get; set; }
        public int BlogId { get; set; }
    }
}

namespace BlogProject.Domain.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; } = default!;
        public List<Blog>? Blogs { get; set; }
    }
}

namespace B2B.Server.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public int? CategoryParentId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImage { get; set; }
        public bool CategoryStatus { get; set; }
        public int CategorySortOrder { get; set; }
    }
}

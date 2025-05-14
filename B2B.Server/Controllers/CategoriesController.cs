using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using B2B.Server.Data;
using B2B.Server.Models;

namespace B2B.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CategoriesController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories
                .FromSqlRaw("SELECT * FROM Categories")
                .ToListAsync();
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories
                .FromSqlRaw("SELECT * FROM Categories WHERE category_id = {0}", id)
                .FirstOrDefaultAsync();

            if (category == null)
                return NotFound();

            return category;
        }

        // POST: api/categories/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateCategory([FromForm] Category category, IFormFile imageFile)
        {
            string imagePath = "";
            if (imageFile != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "uploads/categories");
                Directory.CreateDirectory(uploads);
                imagePath = Path.Combine("uploads/categories", Guid.NewGuid() + Path.GetExtension(imageFile.FileName));
                var fullPath = Path.Combine(_env.WebRootPath, imagePath);
                using var stream = new FileStream(fullPath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
            }

            var result = await _context.Database.ExecuteSqlRawAsync(
                @"INSERT INTO Categories (category_parent_id, category_name, category_image, category_status, category_sort_order)
                VALUES ({0}, {1}, {2}, {3}, {4})",
                category.CategoryParentId, category.CategoryName, imagePath, category.CategoryStatus, category.CategorySortOrder
            );

            return Ok(new { message = "Category created", rowsAffected = result });
        }

        // PUT: api/categories/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] Category category, IFormFile imageFile)
        {
            if (id != category.CategoryId) return BadRequest("ID mismatch");

            string imagePath = category.CategoryImage;

            if (imageFile != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "uploads/categories");
                Directory.CreateDirectory(uploads);
                imagePath = Path.Combine("uploads/categories", Guid.NewGuid() + Path.GetExtension(imageFile.FileName));
                var fullPath = Path.Combine(_env.WebRootPath, imagePath);
                using var stream = new FileStream(fullPath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
            }

            var result = await _context.Database.ExecuteSqlRawAsync(
                @"UPDATE Categories SET category_parent_id = {0}, category_name = {1}, 
                  category_image = {2}, category_status = {3}, category_sort_order = {4}
                  WHERE category_id = {5}",
                category.CategoryParentId, category.CategoryName, imagePath, category.CategoryStatus,
                category.CategorySortOrder, id
            );

            return Ok(new { message = "Category updated", rowsAffected = result });
        }

        // DELETE: api/categories/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("DELETE FROM Categories WHERE category_id = {0}", id);

            if (result == 0) return NotFound();

            return Ok(new { message = "Category deleted", rowsAffected = result });
        }
    }
}

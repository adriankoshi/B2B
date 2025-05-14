using B2B.Server.Data;
using B2B.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace B2B.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .FromSqlRaw("SELECT * FROM Products")
                .ToListAsync();
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products
                .FromSqlRaw("SELECT * FROM Products WHERE product_id = {0}", id)
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            return product;
        }

        // POST: api/products/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromForm] Product product, IFormFile? imageFile)
        {
            string imagePath = "";

            if (imageFile != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "uploads/products");
                Directory.CreateDirectory(uploads);
                imagePath = Path.Combine("uploads/products", Guid.NewGuid() + Path.GetExtension(imageFile.FileName));
                var fullPath = Path.Combine(_env.WebRootPath, imagePath);
                using var stream = new FileStream(fullPath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
            }

            var result = await _context.Database.ExecuteSqlRawAsync(@"
                INSERT INTO Products 
                (product_name, product_description, product_quantity, product_price, product_discount,
                 product_image, product_status, category_id, product_date_inserted, product_date_modified,
                 product_manual, product_specifications, product_license, product_barcode,
                 product_unit, product_package_quantity, unit_id, product_warranty)
                VALUES ({0}, {1}, {2}, {3}, {4},
                        {5}, {6}, {7}, GETDATE(), GETDATE(),
                        {8}, {9}, {10}, {11},
                        {12}, {13}, {14}, {15})",
                product.ProductName, product.ProductDescription, product.ProductQuantity, product.ProductPrice, product.ProductDiscount,
                imagePath, product.ProductStatus, product.CategoryId,
                product.ProductManual, product.ProductSpecifications, product.ProductLicense, product.ProductBarcode,
                product.ProductUnit, product.ProductPackageQuantity, product.UnitId, product.ProductWarranty
            );

            return Ok(new { message = "Product created", rowsAffected = result });
        }

        // PUT: api/products/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] Product product, IFormFile? imageFile)
        {
            if (id != product.ProductId)
                return BadRequest("ID mismatch");

            string imagePath = product.ProductImage;

            if (imageFile != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "uploads/products");
                Directory.CreateDirectory(uploads);
                imagePath = Path.Combine("uploads/products", Guid.NewGuid() + Path.GetExtension(imageFile.FileName));
                var fullPath = Path.Combine(_env.WebRootPath, imagePath);
                using var stream = new FileStream(fullPath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
            }

            var result = await _context.Database.ExecuteSqlRawAsync(@"
                UPDATE Products SET
                    product_name = {0}, product_description = {1}, product_quantity = {2}, 
                    product_price = {3}, product_discount = {4}, product_image = {5},
                    product_status = {6}, category_id = {7}, product_date_modified = GETDATE(),
                    product_manual = {8}, product_specifications = {9}, product_license = {10},
                    product_barcode = {11}, product_unit = {12}, product_package_quantity = {13},
                    unit_id = {14}, product_warranty = {15}
                WHERE product_id = {16}",
                product.ProductName, product.ProductDescription, product.ProductQuantity,
                product.ProductPrice, product.ProductDiscount, imagePath,
                product.ProductStatus, product.CategoryId,
                product.ProductManual, product.ProductSpecifications, product.ProductLicense,
                product.ProductBarcode, product.ProductUnit, product.ProductPackageQuantity,
                product.UnitId, product.ProductWarranty, id
            );

            return Ok(new { message = "Product updated", rowsAffected = result });
        }

        // DELETE: api/products/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "DELETE FROM Products WHERE product_id = {0}", id);

            if (result == 0)
                return NotFound();

            return Ok(new { message = "Product deleted", rowsAffected = result });
        }
    }
}

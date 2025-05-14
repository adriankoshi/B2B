using B2B.Server.Models;

public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string? ProductDescription { get; set; }
    public int ProductQuantity { get; set; }
    public decimal ProductPrice { get; set; }
    public decimal? ProductDiscount { get; set; }
    public string? ProductImage { get; set; }
    public bool ProductStatus { get; set; }
    public int CategoryId { get; set; }
    public DateTime ProductDateInserted { get; set; }
    public DateTime ProductDateModified { get; set; }
    public string? ProductManual { get; set; }
    public string? ProductSpecifications { get; set; }
    public string? ProductLicense { get; set; }
    public string? ProductBarcode { get; set; }
    public string? ProductUnit { get; set; }
    public int? ProductPackageQuantity { get; set; }
    public int? UnitId { get; set; }
    public string? ProductWarranty { get; set; }

    public Category Category { get; set; }
}

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { apiFetch } from "../../services/api"; // your fetch helper

const ProductInsertForm = () => {
    const [formData, setFormData] = useState({
        ProductName: "",
        ProductDescription: "",
        ProductQuantity: 0,
        ProductPrice: 0,
        ProductDiscount: 0,
        ProductStatus: true,
        CategoryId: 0,
        ProductManual: "",
        ProductSpecifications: "",
        ProductLicense: "",
        ProductBarcode: "",
        ProductUnit: "",
        ProductPackageQuantity: 0,
        UnitId: 0,
        ProductWarranty: "",
    });

    const [productImageFile, setProductImageFile] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await apiFetch("categories");
                console.log("Raw categories response:", response);

                const catsArray = response.data ?? response;

                const mappedCats = catsArray.map((cat) => ({
                    CategoryId: cat.categoryId ?? cat.CategoryId,
                    CategoryName: cat.categoryName ?? cat.CategoryName,
                }));

                setCategories(mappedCats);
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to load categories", "error");
            }
        };

        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setProductImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            // Append all form fields
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            // Append file with key matching backend parameter "imageFile"
            if (productImageFile) {
                data.append("imageFile", productImageFile);
            }

            // POST with isFormData = true so apiFetch handles headers correctly
            await apiFetch("products/create", "POST", data, true);

            Swal.fire("Success", "Product added successfully!", "success");

            // Reset form
            setFormData({
                ProductName: "",
                ProductDescription: "",
                ProductQuantity: 0,
                ProductPrice: 0,
                ProductDiscount: 0,
                ProductStatus: true,
                CategoryId: 0,
                ProductManual: "",
                ProductSpecifications: "",
                ProductLicense: "",
                ProductBarcode: "",
                ProductUnit: "",
                ProductPackageQuantity: 0,
                UnitId: 0,
                ProductWarranty: "",
            });
            setProductImageFile(null);
            e.target.reset();
        } catch (err) {
            Swal.fire("Error", "Failed to add product: " + err.message, "error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                    <label htmlFor="ProductName" className="block font-semibold mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="ProductName"
                        name="ProductName"
                        value={formData.ProductName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="ProductDescription" className="block font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        id="ProductDescription"
                        name="ProductDescription"
                        value={formData.ProductDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Quantity and Price */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <label htmlFor="ProductQuantity" className="block font-semibold mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="ProductQuantity"
                            name="ProductQuantity"
                            value={formData.ProductQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="ProductPrice" className="block font-semibold mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="ProductPrice"
                            name="ProductPrice"
                            value={formData.ProductPrice}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Discount and Package Quantity */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <label htmlFor="ProductDiscount" className="block font-semibold mb-1">
                            Discount
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="ProductDiscount"
                            name="ProductDiscount"
                            value={formData.ProductDiscount}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="ProductPackageQuantity" className="block font-semibold mb-1">
                            Package Quantity
                        </label>
                        <input
                            type="number"
                            id="ProductPackageQuantity"
                            name="ProductPackageQuantity"
                            value={formData.ProductPackageQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Product Unit and UnitId */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <label htmlFor="ProductUnit" className="block font-semibold mb-1">
                            Unit
                        </label>
                        <input
                            type="text"
                            id="ProductUnit"
                            name="ProductUnit"
                            value={formData.ProductUnit}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="UnitId" className="block font-semibold mb-1">
                            Unit ID
                        </label>
                        <input
                            type="number"
                            id="UnitId"
                            name="UnitId"
                            value={formData.UnitId}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category Select */}
                <div>
                    <label htmlFor="CategoryId" className="block font-semibold mb-1">
                        Category
                    </label>
                    <select
                        id="CategoryId"
                        name="CategoryId"
                        value={formData.CategoryId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.length === 0 && <option>Loading...</option>}
                        {categories.map((cat) => (
                            <option key={cat.CategoryId} value={cat.CategoryId}>
                                {cat.CategoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Other Text Fields */}
                <div>
                    <label htmlFor="ProductManual" className="block font-semibold mb-1">
                        Product Manual
                    </label>
                    <textarea
                        id="ProductManual"
                        name="ProductManual"
                        value={formData.ProductManual}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="ProductSpecifications" className="block font-semibold mb-1">
                        Product Specifications
                    </label>
                    <textarea
                        id="ProductSpecifications"
                        name="ProductSpecifications"
                        value={formData.ProductSpecifications}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="ProductLicense" className="block font-semibold mb-1">
                        Product License
                    </label>
                    <input
                        type="text"
                        id="ProductLicense"
                        name="ProductLicense"
                        value={formData.ProductLicense}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="ProductBarcode" className="block font-semibold mb-1">
                        Product Barcode
                    </label>
                    <input
                        type="text"
                        id="ProductBarcode"
                        name="ProductBarcode"
                        value={formData.ProductBarcode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Product Status */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="ProductStatus"
                        name="ProductStatus"
                        checked={formData.ProductStatus}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />
                    <label htmlFor="ProductStatus" className="font-semibold">
                        Active
                    </label>
                </div>

                {/* Product Image Upload */}
                <div>
                    <label htmlFor="ProductImage" className="block font-semibold mb-1">
                        Product Image
                    </label>
                    <input
                        type="file"
                        id="ProductImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600"
                    />
                </div>

                {/* Product Warranty */}
                <div>
                    <label htmlFor="ProductWarranty" className="block font-semibold mb-1">
                        Product Warranty
                    </label>
                    <input
                        type="text"
                        id="ProductWarranty"
                        name="ProductWarranty"
                        value={formData.ProductWarranty}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductInsertForm;

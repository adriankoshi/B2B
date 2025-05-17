import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../../services/api";
import AdminMain from "../../components/partials/AdminMain";

const ProductsAdmin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await apiFetch("products");

                // Destroy any existing instance before creating new
                if ($.fn.dataTable.isDataTable("#productsTable")) {
                    $("#productsTable").DataTable().destroy();
                }

                // Populate DataTable manually
                const table = $("#productsTable").DataTable({
                    data: products,
                    columns: [
                        { title: "ID", data: "productId" },
                        { title: "Name", data: "productName" },
                        { title: "Price", data: "productPrice" },
                        { title: "Quantity", data: "productQuantity" },
                        {
                            title: "Status",
                            data: "productStatus",
                            render: (data) =>
                                data
                                    ? `<span class="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded">Active</span>`
                                    : `<span class="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded">Inactive</span>`,
                        },
                        {
                            title: "Actions",
                            data: null,
                            orderable: false,
                            render: function (data, type, row) {
                                return `
                  <button class="btn-edit text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2 text-sm font-semibold" data-id="${row.productId}">Edit</button>
                  <button class="btn-delete text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold" data-id="${row.productId}">Delete</button>
                `;
                            },
                        },
                    ],
                    // Optional: Adjust page length or language if needed
                    lengthMenu: [5, 10, 25, 50],
                });

                // Handle delete click with SweetAlert2
                $('#productsTable tbody').on('click', '.btn-delete', async function () {
                    const id = $(this).data("id");
                    const row = table.row($(this).parents("tr"));

                    const result = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#dc2626', // red-600
                        cancelButtonColor: '#6b7280', // gray-500
                        confirmButtonText: 'Yes, delete it!'
                    });

                    if (result.isConfirmed) {
                        try {
                            await apiFetch(`products/delete/${id}`, "DELETE");
                            row.remove().draw();
                            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                        } catch (err) {
                            Swal.fire('Error', 'Delete failed: ' + err.message, 'error');
                        }
                    }
                });

                // Edit button navigates to edit page
                $('#productsTable tbody').on('click', '.btn-edit', function () {
                    const id = $(this).data("id");
                    navigate(`/dashboard/products/edit/${id}`);
                });
            } catch (err) {
                Swal.fire('Error', 'Failed to load products: ' + err.message, 'error');
            }
        };

        loadProducts();
    }, [navigate]);

    return (
        <AdminMain>
            <div className="p-4 bg-white rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Product Management</h2>
                <div className="overflow-x-auto">
                    <table
                        id="productsTable"
                        className="min-w-full divide-y divide-gray-200"
                        width="100%"
                        style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
                    ></table>
                </div>
            </div>

            <style>
                {`
          /* Add padding for table cells */
          #productsTable td, #productsTable th {
            padding: 0.75rem 1rem;
            vertical-align: middle;
          }
          /* Header background and font weight */
          #productsTable thead th {
            background-color: #f3f4f6; /* Tailwind gray-100 */
            font-weight: 600;
          }
          /* Row hover effect */
          #productsTable tbody tr:hover {
            background-color: #e5e7eb; /* Tailwind gray-200 */
          }
          /* Remove default DataTables borders */
          table.dataTable.no-footer {
            border-bottom: none;
          }
        `}
            </style>
        </AdminMain>
    );
};

export default ProductsAdmin;

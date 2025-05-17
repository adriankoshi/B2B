// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserFormPage from "./pages/UserFormPage";
import Home from "./pages/Home";
import HomeAdmin from "./pages/dashboard/HomeAdmin";
import ProductsAdmin from "./pages/dashboard/ProductsAdmin";
import ProductInsertForm from "./pages/dashboard/ProductInsertForm";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/create" element={<UserFormPage />} />
                <Route path="/users/edit/:id" element={<UserFormPage />} />

                <Route path="/dashboard" element={<HomeAdmin />} />
                <Route path="/dashboard/home" element={<HomeAdmin />} />
                <Route path="/dashboard/products" element={<ProductsAdmin />} />
                <Route path="/dashboard/products/add" element={<ProductInsertForm />} />
            </Routes>
        </Router>
    );
}

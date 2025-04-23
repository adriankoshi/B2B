// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserFormPage from "./pages/UserFormPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/users/create" element={<UserFormPage />} />
                <Route path="/users/edit/:id" element={<UserFormPage />} />
            </Routes>
        </Router>
    );
}

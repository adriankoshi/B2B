// components/UserList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";
import { loginAsAdmin } from "../services/authService";
import Navbar from "./partials/Navbar";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loginAsAdmin();
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="relative">

                <div>
                    <h2>User List</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button onClick={() => navigate("/users/create")}>
                        Create User
                    </button>

                    <ul>
                        {users.map(u => (
                            <li key={u.id}>
                                {u.username} - {u.email}
                                <button onClick={() => navigate(`/users/edit/${u.id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(u.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
        
    );
}

// pages/UserFormPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, createUser, updateUser } from "../services/userService";
import UserForm from "../components/UserForm";

export default function UserFormPage() {
    const { id } = useParams(); // from route /users/edit/:id
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (id) {
            getUser(id).then(setInitialData).catch(console.error);
        }
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            if (id) await updateUser(id, data);
            else await createUser(data);
            navigate("/"); // go back to list
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>{id ? "Edit User" : "Create User"}</h2>
            <UserForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
    );
}

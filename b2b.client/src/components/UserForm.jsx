// components/UserForm.jsx
import { useEffect, useState } from "react";

export default function UserForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        country: "",
        address: "",
        address2: "",
        city: "",
        phone: "",
        businessNo: "",
        businessName: ""
    });

    useEffect(() => {
        if (initialData) setForm({ ...form, ...initialData });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                    <label>{key}</label>
                    <input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required={key !== "address2"}
                    />
                </div>
            ))}
            <button type="submit">Save</button>
        </form>
    );
}

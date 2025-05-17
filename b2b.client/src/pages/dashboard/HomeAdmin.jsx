import AdminMain from "../../components/partials/AdminMain";

export default function HomeAdmin() {

    return (
        <AdminMain>
            <div className="p-4 bg-white rounded-xl shadow">
                <h1 className="text-xl font-bold">Welcome to the Dashboard</h1>
                <p className="text-gray-600 mt-2">Here is your main content area.</p>
            </div>
        </AdminMain>
    );
}

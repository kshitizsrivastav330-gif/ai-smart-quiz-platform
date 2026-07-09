import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

function Category() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const response = await getCategories();

            console.log("Category Response:", response);
            console.log("Category Data:", response.data);

            setCategories(response.data);

        } catch (error) {

            console.error("Category Error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            alert("Failed to load categories");
        }

    };

    const saveCategory = async () => {

        if (name.trim() === "") {
            alert("Category Name is required");
            return;
        }

        try {

            if (editingId) {

                await updateCategory(editingId, {
                    name,
                    description
                });

                alert("Category Updated Successfully");

            } else {

                await addCategory({
                    name,
                    description
                });

                alert("Category Added Successfully");

            }

            setEditingId(null);
            setName("");
            setDescription("");

            loadCategories();

        } catch (error) {

            console.error(error);

            alert("Operation Failed");

        }

    };

    const editCategory = (category) => {

        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description);

    };

    const cancelEdit = () => {

        setEditingId(null);
        setName("");
        setDescription("");

    };

    const removeCategory = async (id) => {

        if (!window.confirm("Delete this category?")) return;

        try {

            await deleteCategory(id);

            alert("Category Deleted Successfully");

            loadCategories();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                📚 Category Management
            </h1>

            <div className="bg-white shadow rounded-lg p-6 mb-6">

                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded w-full mb-4"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-3 rounded w-full mb-4"
                    rows="4"
                />

                <button
                    onClick={saveCategory}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    {editingId ? "Update Category" : "Add Category"}
                </button>

                {editingId && (

                    <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-6 py-3 rounded ml-3"
                    >
                        Cancel
                    </button>

                )}

            </div>

            <div className="bg-white shadow rounded-lg p-6">

                <table className="w-full border">

                    <thead>

                    <tr className="bg-gray-200">

                        <th className="p-3">ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {categories.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center p-6"
                            >
                                No Categories Found
                            </td>

                        </tr>

                    ) : (

                        categories.map((category) => (

                            <tr
                                key={category.id}
                                className="text-center border-t"
                            >

                                <td className="p-3">{category.id}</td>

                                <td>{category.name}</td>

                                <td>{category.description}</td>

                                <td>

                                    <button
                                        onClick={() => editCategory(category)}
                                        className="bg-yellow-500 text-white px-3 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => removeCategory(category.id)}
                                        className="bg-red-600 text-white px-3 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default Category;
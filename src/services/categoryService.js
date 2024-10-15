const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BACKEND_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};
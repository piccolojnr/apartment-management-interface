import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { User, Role } from "@/types/user";
import { api } from "@/lib/api";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            const response = await api.post('/login', { username, password });
            const userData = response.data;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }

    };

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const decoded: any = jwtDecode(parsedUser.token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(parsedUser);
                } else {
                    logout();
                }
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }

    }, [logout]);

    return { user, loading, error, login, logout };
};

export default useAuth;

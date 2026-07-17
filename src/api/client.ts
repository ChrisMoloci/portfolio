import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token.
                // The browser automatically sends the HttpOnly refresh cookie.
                console.log("Attempting token refresh");
                await api.post('/auth/refresh', {});

                // If successful, retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token failed (e.g., expired). User must log in again.
                // You can dispatch an event here or redirect to login.
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
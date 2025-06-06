import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BE_URL + '/api',
    timeout: 1000, // Timeout request dalam milidetik
    withCredentials: true, // untuk mengizinkan cookies dikirim bersama permintaan
    headers: {
        'Content-Type': 'application/json',
    }
});


// Menambahkan token CSRF ke header permintaan
apiClient.interceptors.request.use(
    async (config) => {

        // const token = Cookies.get('token')
        let token = localStorage.getItem('auth')
        let parse = JSON.parse(token)
        token = parse?.token

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Tambahkan token ke header jika ada
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // // Jika status 401, token mungkin tidak valid atau telah kedaluwarsa
        if (error.response && error.response.status === 401) {

            // Hapus token dari localStorage dan cookie
            localStorage.clear();

            // Jika Anda menggunakan cookies untuk menyimpan token, hapus di sini
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // Hapus token dari cookie menggunakan js-cookie
            Cookies.remove('token');
            Cookies.remove('_csrf');
            Cookies.remove('user_id');

            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient
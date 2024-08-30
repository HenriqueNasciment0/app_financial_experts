import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

interface UserData {
    email: string;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    is_company?: boolean;
    is_expert?: boolean;
}

interface AuthData {
    username: string;
    password: string;
}


export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const authUser = async (authData: AuthData) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, authData);
        return response.data;
    } catch (error) {
        console.error('Auth error:', error)
        throw error;
    }
}

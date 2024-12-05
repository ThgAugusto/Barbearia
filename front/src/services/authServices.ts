import ConnectionAPI from "./api/connectionAPI";

function AuthServices() {

    const authenticate = async (email: string, password: string) => {
        const response = await ConnectionAPI.post('auth', { email, password, }, );
        return response.data;
    }

    const verifyAuth = async () => {
        const response = await ConnectionAPI.get('/auth/verify')
        return response.data;
    }

    return { authenticate, verifyAuth};
}

export default AuthServices;

import PropTypes from 'prop-types';
import {createContext, useEffect, useReducer, useCallback} from 'react';
import axios from '../utils/axios';
import {isValidToken, setSession} from './utils';

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const reducer = (state, action) => {
    if (action.type === 'INITIAL') {
        return {
            isInitialized: true,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGIN') {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === 'REGISTER') {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    }

    return state;
};

export const AuthContext = createContext({});

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);
                // const response = await axios.get('/api/account/my-account');
                // const {user} = response.data;
                const user = {
                    "id": "8864c717-587d-472a-929a-8e5f298024da-0",
                    "displayName": "rf.solutions",
                    "email": "demo@outlook.es",
                    "password": "demo1234",
                    "photoURL": "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg",
                    "phoneNumber": "66666",
                    "country": "Bolivia",
                    "address": "Calle Cajarmarca",
                    "state": "Cochabamba",
                    "city": "Cercado",
                    "zipCode": "94116",
                    "about": "Prueba",
                    "role": "admin",
                    "isPublic": true
                };
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'INITIAL',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = async (cuenta, password) => {
        /* const response = await axios.post('/api/account/login', {
             email,
             password,
         });*/

        const response = {
            data: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ODY0YzcxNy01ODdkLTQ3MmEtOTI5YS04ZTVmMjk4MDI0ZGEtMCIsImlhdCI6MTY3MzcyMzI0NSwiZXhwIjoxNjczOTgyNDQ1fQ.A1CSAzFJ7SQlsOyB4qISxh1O8n1hbYDuuE3aK3Y_TMc",
                user: {
                    "id": "8864c717-587d-472a-929a-8e5f298024da-0",
                    "displayName": "rf.solutions",
                    "email": "demo@outlook.es",
                    "password": "demo1234",
                    "photoURL": "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg",
                    "phoneNumber": "66666",
                    "country": "Bolivia",
                    "address": "Calle Cajarmarca",
                    "state": "Cochabamba",
                    "city": "Cercado",
                    "zipCode": "94116",
                    "about": "Prueba",
                    "role": "admin",
                    "isPublic": true
                }
            }
        }
        const {accessToken, user} = response.data;
        setSession(accessToken);
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        });
    };

    // REGISTER
    const register = async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
            email,
            password,
            firstName,
            lastName,
        });
        const {accessToken, user} = response.data;

        localStorage.setItem('accessToken', accessToken);

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        });
    };

    // LOGOUT
    const logout = async () => {
        setSession(null);
        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

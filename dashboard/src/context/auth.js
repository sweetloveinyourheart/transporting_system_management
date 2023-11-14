import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { login, getUser } from '../services/auth'
// import Loading from "../components/loading";

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const ValidRoles = ["ROLE_ADMIN", "ROLE_EMPLOYEE"]

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const signIn = async (username, password) => {
        const { accessToken: token } = await login(username, password)

        setError(null)
        setLoading(false)
        if (!token) return setUser(null)

        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        setAccessToken(token)
        Cookies.set('accessToken', token)
    }

    const signOut = async () => {
        Cookies.remove("accessToken")
        setUser(null)
        setAccessToken(null)
        navigate("/authentication/sign-in")
    }

    const getUserByAccessToken = async () => {
        const user = await getUser()

        if (!user || !ValidRoles.includes(user.role.name)) {
            if (error !== null) setError("Login failed. Please check your account !")
            return setUser(null)
        }

        navigate("/dashboard")
        return setUser(user)
    }

    useEffect(() => {
        (async () => {
            const token = Cookies.get('accessToken')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                setAccessToken(token)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (accessToken) {
                await getUserByAccessToken()
                setLoading(false)
            } else {
                setLoading(false)
                navigate("/authentication/sign-in")
            }
        })()
    }, [accessToken])

    if (loading) return <></>

    return (
        <AuthContext.Provider value={{
            user,
            error,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
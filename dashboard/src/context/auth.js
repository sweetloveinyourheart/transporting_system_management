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

const ValidRoles = ["ADMIN", "EMPLOYEE"]

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const signIn = async (username, password) => {
        const { accessToken } = await login(username, password)

        setError("")
        setLoading(false)
        if (!accessToken) return setUser(null)

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        setAccessToken(accessToken)
        Cookies.set('accessToken', accessToken)
    }

    const signOut = async () => {
        Cookies.remove("accessToken")
        setAccessToken(null)
        setUser(null)
        navigate("/authentication/sign-in")
    }

    const getUserByAccessToken = async () => {
        const user = await getUser()
        if (!user || !ValidRoles.includes(user.role.roleId)) {
            navigate("/authentication/sign-in")
            setLoading(false)
            if(error !== null) setError("Login failed. Please check your account !")
            return setUser(null)
        }
        navigate("/")
        setLoading(false)
        return setUser(user)
    }

    useEffect(() => {
        (async () => {
            const token = Cookies.get('accessToken')
            if(token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                setAccessToken(accessToken)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await getUserByAccessToken()
            setLoading(false)
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
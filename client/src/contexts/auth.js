import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { login, register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../services/account";
import { message } from "antd";

export const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [accessToken, setAccessToken] = useState(null)
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate();

	const signIn = async (username, password) => {
		const { access_token } = await login(username, password)
		setLoading(false)
		if (!access_token) {
			message.error("Login failed!")
			return setUser(null)
		}

		message.success("Login successfully !")
		axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
		setAccessToken(access_token)
		Cookies.set('access_token', access_token)
		navigate("/")
	}

	const signOut = async () => {
		Cookies.remove("access_token")
		setAccessToken(null)
		setUser(null)
		navigate("/login")
	}

	const getUserByAccessToken = async () => {
		const user = await getUser()
		if (!user) {
			// navigate("/login")
			setLoading(false)
			return setUser(null)
		}
		//If driver login navigate to driver page
		if (user.role.roleId === "DRIVER") {
			navigate("/driver/*")
			setLoading(false)
			return setUser(user)
		}

		setLoading(false)
		return setUser(user)
	}

	const getTokenFromCookie = () => {
		const token = Cookies.get("access_token")
		axios.defaults.headers.common.Authorization = `Bearer ${token}`
		setAccessToken(token)
	}

	useEffect(() => {
		getTokenFromCookie()
	}, [])

	useEffect(() => {
		(async () => {
			if (accessToken) {
				await getUserByAccessToken()
			}

			setLoading(false)
		})()
	}, [accessToken])

	if (loading) return <></>

	return (
		<AuthContext.Provider value={{
			accessToken,
			user,
			accessToken,
			signIn,
			signOut,
			setUser
		}}>
			{children}
		</AuthContext.Provider>
	)
}
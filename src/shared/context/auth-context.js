import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext({
    isLogedIn: false, 
    userId: null,
    token: null,
    login: ()=>{}, 
    logout: ()=>{} 
});


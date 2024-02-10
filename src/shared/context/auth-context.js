import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext({
    isLogedIn: false, 
    login: ()=>{}, 
    logout: ()=>{} 
});


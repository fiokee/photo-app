import { useState, useCallback, useRef } from "react";

const useHttpClient = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState();

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback (async (url, method = 'GET', body = null, headers = {})=>{ //useCallback so that the component that uses this hook never get rendered
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl)

        try { 
            const response = await  fetch(url,{
                method: method,
                body,
                headers
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            } 
            return responseData;
        } catch (err) {
           setError(err.message) 
        }
        setIsLoading(false);
        
    }, []);

    const clearError = ()=>{
        setError(null);
    }
    return {isLoading, error, sendRequest};
}
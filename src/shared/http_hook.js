import { useState, useCallback, useRef,useEffect } from "react";

const useHttpClient = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState();

    const activeHttpRequest = useRef([]); //this functions when we switch a page with an ongoing request the request completing

    const sendRequest = useCallback (async (url, method = 'GET', body = null, headers = {})=>{ //useCallback so that the component that uses this hook never get rendered
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl)

        try { 
            const response = await  fetch(url,{
                method: method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !==httpAbortCtrl);
            if(!response.ok){
                throw new Error(responseData.message);
            } 
            setIsLoading(false);
            return responseData;
        } catch (err) {
           setError(err.message) 
           setIsLoading(false);
           throw err;
        }
        
    }, []);

    const clearError = ()=>{
        setError(null);
    };

    // useEffect(()=>{
    //     return ()=>{
    //         activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
    //     }
    // },[])
    return {isLoading, error, sendRequest, clearError};
}

export default useHttpClient
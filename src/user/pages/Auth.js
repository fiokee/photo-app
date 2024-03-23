import React, { Fragment, useContext, useState } from 'react'
import './Auth.css';
import Card from '../../shared/UiElement/Card/Card';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';

const Auth = () => {
    const auth = useContext(AuthContext);

    
    const defaultForm = {
        email: '',
        password: ''
    };
    
    const [formFields, setFormFields]=useState(defaultForm);
    const {name, email, password}= formFields;
    const [isLogInMode, setIsLogInMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState();

    const handleInputChange = (event)=>{
        const {name, value}= event.target
        setFormFields({ ...formFields, [name]: value });
    }
    // console.log(formFields)

    //swichmode
    const switchModeHandler = ()=>{
        setIsLogInMode(prevMode => !prevMode);
        console.log("signup");
    }

    //reseting formfields
    const resetFormFields = ()=>{
        setFormFields(defaultForm);
    }

    const submitHandler = async (event)=>{
        event.preventDefault();

        //connecting to backend
        if(isLogInMode){ //check to see wether is login mode 

        }else{ //sending the post request when we are in signup mode
        
            try{
                setIsLoading(true);
               const response = await fetch(`http://localhost:5000/api/users/signup`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json' //this tells the kind of data we are expecting
                },
                body: JSON.stringify({
                    name:formFields.name,
                    email: formFields.email,
                    password: formFields.password
                })
            });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            console.log(responseData);
            setIsLoading(false); 
            auth.login();
            }catch(err){
                setIsLoading(false); 
                setError(err.message || 'Something went wrong, please try again')
            }
            
        }         
    }

    const errorHandler = ()=>{
        setError(null);
    }
    
  return (
    <Fragment>
        <ErrorModal error={error} onClear= {errorHandler}/>
    <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required!</h2>
        <hr/>
        <form onSubmit={submitHandler}>
            {!isLogInMode && (
                <input element="input"
                id="name"
                name="name"
                type="text"
                onChange={handleInputChange}
                label="Username"
                errorText="please enter a username"
                />
            )}

            <input 
            element="input" 
            id="email" 
            value={email}
            name="email"
            type="email" 
            label="E-mail" 
            onChange={handleInputChange}
            errorText="please enter a valid email address"/>
            
            <input 
            element="input" 
            id="password"
            value={password}
            name="password"
            type="password" 
            label="password" 
            onChange={handleInputChange}
            errorText="please enter a valid password"/>
            <Button type="submit">
                {isLogInMode ? "LOGIN" : "SIGNUP"}
                </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLogInMode ? "SIGNUP": "LOGIN"}
        </Button>
    </Card>
    </Fragment>
  )
}

export default Auth
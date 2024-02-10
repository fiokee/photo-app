import React, { useContext, useState } from 'react'
import './Auth.css';
import Card from '../../shared/UiElement/Card/Card';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);

    const submitHandler = (event)=>{
        event.preventDefault();
        auth.login();
        console.log("login")
    }

    const defaultForm = {
        email: '',
        password: ''
    };
    
    const [formFields, setFormFields]=useState(defaultForm);
    const {email, password}= formFields;
    const [isLogInMode, setIsLogInMode] = useState(true)

    const handleInputChange = (event)=>{
        const {name, value}= event.target
        setFormFields({ ...formFields, [name]: value });
    }
    console.log(formFields)

    //swichmode
    const switchModeHandler = ()=>{
        setIsLogInMode(prevMode => !prevMode);
        console.log("signup");
    }

    //reseting formfields
    const resetFormFields = ()=>{
        setFormFields(defaultForm);
    }

    
  return (
    <Card className="authentication">
        <h2>Login Required!</h2>
        <hr/>
        <form onSubmit={submitHandler}>
            {isLogInMode && (
                <Input element="input"
                id="username"
                name="username"
                type="text"
                label="Username"
                errorText="please enter a username"
                />
            )}

            <Input 
            element="input" 
            id="email" 
            value={email}
            name="email"
            type="email" 
            label="E-mail" 
            onChange={handleInputChange}
            errorText="please enter a valid email address"/>
            
            <Input 
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
  )
}

export default Auth
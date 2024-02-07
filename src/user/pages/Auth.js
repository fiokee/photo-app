import React, { useState } from 'react'
import './Auth.css';
import Card from '../../shared/UiElement/Card/Card';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';

const Auth = () => {
    const submitHandler = (event)=>{
        event.preventDefault();
        console.log("submitted")
    }

    const defaultForm = {
        email: '',
        password: ''
    };
    
    const [formFields, setFormFields]=useState(defaultForm);
    const {email, password}= formFields;

    const handleInputChange = (event)=>{
        const {name, value}= event.target
        setFormFields({ ...formFields, [name]: value });
    }
    console.log(formFields)

    //reseting formfields
    const resetFormFields = ()=>{
        setFormFields(defaultForm);
    }
  return (
    <Card className="authentication">
        <h2>Login Required!</h2>
        <hr/>
        <form onSubmit={submitHandler}>
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
            <Button type="submit">LOGIN</Button>
        </form>
    </Card>
  )
}

export default Auth
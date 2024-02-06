import React from 'react'
import './Auth.css';
import Card from '../../shared/UiElement/Card/Card';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';

const Auth = () => {
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("submitted")
    }
  return (
    <Card className="authentication">
        <h2>Login Required!</h2>
        <hr/>
        <form onSubmit={submitHandler}>
            <Input element="input" id="email" type="email" label="E-mail" errorText="please enter a valid email address"/>
            <Input element="input" id="password" type="password" label="password" errorText="please enter a valid password"/>
            <Button type="submit">LOGIN</Button>
        </form>
    </Card>
  )
}

export default Auth
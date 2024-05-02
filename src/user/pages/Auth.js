import React, { Fragment, useContext, useState } from 'react'
import './Auth.css';
import Card from '../../shared/UiElement/Card/Card';
import Input from '../../shared/formElement/Input';
import Button from '../../shared/formElement/Button/Button';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/UiElement/Errormodal/ErrorModal';
import LoadingSpinner from '../../shared/UiElement/Loading/LoadingSpinner';
import useHttpClient from '../../shared/http_hook';
import ImageUpload from '../../shared/formElement/ImageUpload';

const Auth = () => {
    const auth = useContext(AuthContext);

    const defaultForm = {
        email: '',
        password: '',
        image: ''
    };
    
    const [formFields, setFormFields]=useState(defaultForm);
    const {name, image, email, password}= formFields;
    const [isLogInMode, setIsLogInMode] = useState(true);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const handleInputChange = (event, file)=>{
        const {name, value}= event.target;
        if(name === 'image'){
            setFormFields({ ...formFields, image: file });
        }else{
            setFormFields({ ...formFields, [name]: value, image: file });

        }
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
        try {
            const responseData =  await sendRequest(
                `http://localhost:5000/api/users/login`,
                'POST',
                JSON.stringify({
                email: formFields.email,
                password: formFields.password
                }),
                {
                    'Content-Type': 'application/json' //this tells the kind of data we are expecting
                },   
            );

            auth.login(responseData.user.id);

        } catch (error) {
            
        }        
             //signup Mode

        }else{ //sending the post request when we are in signup mode
        
            try{
                const formData = new FormData();
                formData.append('email', formFields.email);
                formData.append('name', formFields.name);
                formData.append('password', formFields.password);
                formData.append('image', formFields.image);

                const responseData =  await sendRequest(
                `http://localhost:5000/api/users/signup`,
                'POST', 
                formData
            );
            auth.login(responseData.user.id);
            }catch(err){
                console.error(err)
            }
            
        }         
    };
    const errorHandler = ()=>{  
        clearError()
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
            {!isLogInMode && (<ImageUpload 
            onChange={(event, file)=>handleInputChange(event, file)} 
            center id="image" 
            errorText="please provide an image" 
            name="image"
            />)}

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
import React, {useEffect, useRef, useState} from 'react';
import './ImageUpload.css';
import Button from './Button/Button';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickRef = useRef();

    useEffect(()=>{
        if(!file){
            return
        }
        const fileReader = new FileReader(); //browser 
        fileReader.onload =()=>{
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    },[file]);

    const pickHandler =(event)=>{
        let pickedFile;
        let fileIsValid = isValid
        if(event && event.target.files && event.target.files.length === 1){ //check to see if the user picks a file or it's empty
           pickedFile = event.target.files[0]; //extrating the picked files and getting that one
          setFile(pickedFile);
          setIsValid(true);
          fileIsValid = true;
          props.onChange({ ...event, target: { ...event.target, name: props.id } }, pickedFile); // Pass the event object along with the file
          
        }else{
            setIsValid(false);
            fileIsValid = false
        }
        // props.onChange(props.id, pickedFile, fileIsValid);
    };
    // console.log(file)
    const pickImagehandler =()=>{
        filePickRef.current.click();
    };
    

  return (
    <div className='form-control'>
        <input 
        id={props.id}
        ref={filePickRef}  
        style={{display: 'none'}} 
        type='file' 
        accept='.jpg, .png, .jpeg'
        onChange={pickHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className='image-upload__preview'>
                {previewUrl && <img src={previewUrl} alt='preview'/>}
                {!previewUrl && <p>Please pick an image</p>}
            </div>
            <Button type="button" onClick={pickImagehandler}>PICK IMAGE</Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
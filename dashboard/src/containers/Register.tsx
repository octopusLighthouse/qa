import {
    useNavigate,
} from "react-router-dom";
import "./containers.css";
import axios from 'axios';
import { useState } from 'react';
import { Header } from "../components/header";
import { Input } from "../components/input";
import { Button } from "../components/button";

export function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const clickForm = async() => {
        try {
            const response = await axios.post('http://localhost:3000/auth/sign-up', { 
                email,
                password,
            });
            console.log(response.data);
            

        } catch (error) {
            console.error(error);
        }   
        navigate("/login");
    }
    
    return (
      <div className="white-page">
        <Header />
        <div className="center-it">
            <Input label="Email" onChange={handleEmail} value={email} />
            <Input label="Password" onChange={handlePassword} value={password} password />
            <Button label="Sign Up"  onClick={clickForm} />
        </div>
      </div>
    );
  }
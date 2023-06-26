import {
  useNavigate,
} from "react-router-dom";
import "./containers.css";
import { useState } from 'react';
import { Header } from "../components/header";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from 'axios';
import { useAuth } from "../App";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const auth = useAuth();

  const handleEmail = (event: any) => {
      setEmail(event.target.value);
  };

  const handlePassword = (event: any) => {
      setPassword(event.target.value);
  };

  const clickForm = async() => {
      try {
          const response = await axios.post('http://localhost:3000/auth/sign-in', { 
              email,
              password,
          });
          console.log(JSON.stringify(response.data));
          const token: string = response.data.token;
          auth.token = token;
          auth.logged = true;
          navigate("/");

      } catch (error) {
          console.error(error);
      }   
  }

  return (
    <div className="white-page">
      <Header />
      <div className="center-it">
          <Input label="Email" onChange={handleEmail} value={email} />
          <Input label="Password" onChange={handlePassword} value={password} password />
          <Button label="Sign In"  onClick={clickForm} />
      </div>
    </div>
  );
}
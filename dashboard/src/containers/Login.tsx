import {
    Link,
  } from "react-router-dom";
  import "./index.css";
  import axios from 'axios';
  import React, { useState } from 'react';

export function SignIn() {
    const [data, setData] = useState('');
    const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let formData = new FormData(event.currentTarget);
      let email = formData.get("email") as string;
      let password = formData.get("password") as string;
  
      try {
        const response = await axios.post('http://localhost:3000/auth/sign-in', { 
          email,
          password,
        });
        console.log(response.data);
        setData(response.data.token);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className="white-page">
        <h2>Sign-In</h2>
        <div className="row-box">
          <div className="box">
            <Link to="/login">Login</Link>
          </div>        
          <div className="box">
            <Link to="/register">Register</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="column-box">
            <div className="row-box">
              <label>
                Email: <input name="email" type="text" />
              </label>
            </div>
            <div className="row-box">
              <label>
                Password: <input name="password" type="password" />
              </label>
            </div>
            <div className="empty" />
            <div className="row-box">
              <button type="submit">Login</button>
            </div>
            <div className="empty" />
            <div className="row-box">
              <label>
                Token (you will get it after login): <br />
                <input name="token" type="text" readOnly value={data} maxLength={8048} size={200} />
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
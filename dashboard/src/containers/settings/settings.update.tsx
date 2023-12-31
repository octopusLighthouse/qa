import {
    useNavigate,
} from "react-router-dom";
import "../home.css";
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../../App";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
  
  export function ScenarioUpdate() {
    const auth = useAuth();
    if (auth.logged === false) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const [url, setUrl] = useState('');
    const [period, setPeriod] = useState(0);
    const [time, setTime] = useState(0);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    let navigate = useNavigate();
  
    const handleUrl = (event: any) => {
        setUrl(event.target.value);
    };

    const handlePeriod = (event: any) => {
        setPeriod(parseInt(event?.target?.value || 0));
    };

    const handleTime = (event: any) => {
        setTime(parseInt(event?.target?.value || 0));
    };

    const handlePhone = (event: any) => {
        setPhone(event.target.value);
    };

    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const clickForm = async() => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/scenarios', { 
                url,
                period,
                acceptance: {
                    time,
                },
                informChannels: {
                    phone,
                    email,
                }
                }, {
                    headers: {
                    Authorization: `Bearer ${auth.token}`,
                }
            });
            console.log(JSON.stringify(response.data));
            navigate("/");
  
        } catch (error) {
            console.error(error);
        }   
    }
    
    return (
      <div className="white-page">
        <Header />
        <div className="center-it">
            <h2>Update</h2>
            <Input label="Url" onChange={handleUrl} value={url} />
            <Input label="Period" onChange={handlePeriod} value={period} />
            <Input label="Time" onChange={handleTime} value={time} />
            <Input label="Phone" onChange={handlePhone} value={phone} />
            <Input label="Email" onChange={handleEmail} value={email} />
            <Button label="Create"  onClick={clickForm} />
        </div>
      </div>
    );
  }
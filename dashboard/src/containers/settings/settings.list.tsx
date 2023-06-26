import {
    // useNavigate,
    Link,
} from "react-router-dom";
import "./scenarios.list.css";
import { useEffect, useState } from "react";
// import axios from 'axios';
import { useAuth } from "../../App";
import { Header } from "../../components/header";
  
  export function ScenarioList() {
    const auth = useAuth();
    if (auth.logged === false) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Helper functions to generate random values
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const generateRandomUrl = () => {
    const urls = ['https://example.com', 'https://example.org', 'https://example.net'];
    return urls[Math.floor(Math.random() * urls.length)];
  };

  const generateRandomNumber = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomDate = () => {
    const startDate = new Date(2022, 0, 1); // Start date
    const endDate = new Date(); // Current date
    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
    return randomDate.toISOString();
  };

  const generateRandomEmail = () => {
    const emailNames = ['john', 'jane', 'emma', 'alex', 'sam'];
    const domains = ['example.com', 'example.org', 'example.net'];
    const randomName = emailNames[Math.floor(Math.random() * emailNames.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomName}@${randomDomain}`;
  };

  const generateRandomPhone = () => {
    const prefixes = ['+1', '+44', '+61', '+91'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
    return randomPrefix + randomNumber;
  };

    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            const generateRandomData = () => {
                const newData = [];
                for (let i = 0; i < 10; i++) {
                  const randomData = {
                    id: generateRandomId(),
                    url: generateRandomUrl(),
                    period: generateRandomNumber(1, 100),
                    createdAt: generateRandomDate(),
                    userId: generateRandomId(),
                    acceptanceTime: generateRandomNumber(1, 100),
                    email: generateRandomEmail(),
                    phone: generateRandomPhone(),
                  };
                  newData.push(randomData);
                }
                return newData;
              };
          
              

          try {
            // const response = await axios.get('your-api-endpoint');
            // setData(response.data);
            const fakeData = generateRandomData();
            setData({
                page: 1,
                pageSize: 3,
                count: 20,
                data: fakeData,
            });
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    }, []);

    // const [url, setUrl] = useState('');
    // const [period, setPeriod] = useState(0);
    // const [time, setTime] = useState(0);
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // let navigate = useNavigate();
  
    // const handleUrl = (event: any) => {
    //     setUrl(event.target.value);
    // };

    // const handlePeriod = (event: any) => {
    //     setPeriod(parseInt(event?.target?.value || 0));
    // };

    // const handleTime = (event: any) => {
    //     setTime(parseInt(event?.target?.value || 0));
    // };

    // const handlePhone = (event: any) => {
    //     setPhone(event.target.value);
    // };

    // const handleEmail = (event: any) => {
    //     setEmail(event.target.value);
    // };

    // const clickForm = async() => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/api/v1/scenarios', { 
    //             url,
    //             period,
    //             acceptance: {
    //                 time,
    //             },
    //             informChannels: {
    //                 phone,
    //                 email,
    //             }
    //             }, {
    //                 headers: {
    //                 Authorization: `Bearer ${auth.token}`,
    //             }
    //         });
    //         console.log(JSON.stringify(response.data));
    //         navigate("/");
  
    //     } catch (error) {
    //         console.error(error);
    //     }   
    // }
    
    return (
      <div className="white-page">
        <Header />
        <div className="center-horizontal">
            <div className="table-zone">
                <div className="items-aligned-row">
                    <div className="item-space" />
                    <div className="item-selected">All scenarios</div>
                    <div className="item-space" />
                    <div className="item">
                        <Link className="naked" to="/">
                            Create
                        </Link>
                    </div>
                    <div className="item-space-filler" />
                </div>
                {data ? (
                    <table className="my-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>URL</th>
                            <th>Period</th>
                            <th>Created At</th>
                            <th>User ID</th>
                            <th>Acceptance Time</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((item: any) => (
                            <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.url}</td>
                            <td>{item.period}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.userId}</td>
                            <td>{item.acceptanceTime}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                // Render loading or fallback UI
                <div>Loading...</div>
                )}
            </div>
        </div>
      </div>
    );
  }
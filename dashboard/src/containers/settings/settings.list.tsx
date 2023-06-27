import {
    // useNavigate,
    Link,
} from "react-router-dom";
import "./scenarios.list.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../App";
import { Header } from "../../components/header";
  
  export function ScenarioList() {
    const auth = useAuth();
    if (auth.logged === false) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/test', {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            });
            setData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    }, []);
    
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
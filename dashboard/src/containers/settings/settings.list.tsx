import {
    // useNavigate,
    Navigate,
    Link, useLocation,
} from "react-router-dom";
import "./scenarios.list.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../App";
import { Header } from "../../components/header";
import { Paginator } from "../../components/paginator";
  
  export function ScenarioList() {
    const location = useLocation();
    const auth = useAuth();
    if (auth.logged === false) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    const searchParams = new URLSearchParams(location.search);
    let page = parseInt(searchParams.get('page') || '1');
    let pageSize = parseInt(searchParams.get('pageSize') || '50');

    const [data, setData] = useState<any>(null);
    // const [count, setCount] = useState<number>(0);

    // const [page] = useState<number>(pageUrl);
    // const [pageSize] = useState<number>(pageSizeUrl);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/test?page=${page}&pageSize=${pageSize}&sort=createdAt`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
              timeout: 2000,
            });
            setData(response?.data);
          } catch (error) {
            console.log(error);
            // setData({
            //   count: 200,
            //   pageSize: 100,
            //   page: 1,
            //   data: [],
            // });
          }
          
        };
    
        fetchData();
    }, [location]);
    
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
                  <div>
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
                    
                  </div>
                ) : (
                // Render loading or fallback UI
                <div>Loading...</div>
                )}
                <Paginator page={page} pages={data?.count || 1} base='http://localhost/scenarios/list?' pageSize={pageSize} />
            </div>
        </div>
      </div>
    );
  }
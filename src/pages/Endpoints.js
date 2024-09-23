import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import Navbar from '../components/Navbar/Navbar';

function Endpoints (){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/api-endpoints/');
          setData(response.data.endpoints);
          setLoading(false);
        } catch (err) {
          setError('Error fetching data');
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
    return <div>{error}</div>;
    }  
    return (
        <div className='container-fluid p-0'>
            <Navbar />
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Path</th>
                        <th scope="col">Method</th>
                        <th scope="col">Summary</th>
                        <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.path}</td>
                                <td>{item.method}</td>
                                <td>{item.summary}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Endpoints;
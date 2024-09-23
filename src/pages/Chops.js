import React, { useEffect,useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import Table
 from '../components/Tables/Table';
import Navbar from '../components/Navbar/Navbar';
function Chops (){
    const [dataTable, setDataTable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
      
              const tableResponse = await axiosInstance.get('http://0.0.0.0:8000/filter/get/CHOPS/');
              setDataTable(tableResponse.data.Result);
    
              setLoading(false);
            } catch (err) {
              setError(err.message);
              setLoading(false);
            }
    };
    fetchData();
    },[])
    console.log(dataTable)
    return (
        <div className='container-fluid p-0'>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <div className="col-12">
                    <Table data={dataTable} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Chops;
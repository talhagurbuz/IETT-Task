import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Table from '../components/Tables/Table';
import axiosInstance from '../services/axiosConfig';
import Navbar from '../components/Navbar/Navbar';

const ListOfTables = () => {
  const [dataTable, setDataTable] = useState(null);
  const [dataFilter, setDataFilter] = useState(null);
  const [tableName, setTableName] = useState('Customers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const tableResponse = await axiosInstance.get('http://0.0.0.0:8000/list_tables');
        setDataTable(tableResponse.data.tables);

        const filterResponse = await axiosInstance.post('http://0.0.0.0:8000/filter/post', {
          table_name: tableName
        });
        setDataFilter(filterResponse.data.OrderDetails);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);
  
  const handleTableChange = (event) => {
    setTableName(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container-fluid p-0'>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-6 mx-auto my-3">
              <Form.Select aria-label="Tablo Seç" value={tableName} onChange={handleTableChange}>
                <option value="Customers">Customers</option>
                {dataTable && dataTable.map((table, index) => (
                  <option key={index} value={table}>
                    {table}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-12">
              <Table data={dataFilter} />
            </div>
          </div>
        </div>
    </div>
  );
};

export default ListOfTables;

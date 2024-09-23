import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../services/axiosConfig';
import ChartComponent from '../components/Chart/Chart';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [dataForIndex, setDataForIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [newShipName, setNewShipName] = useState('');
  const [customerID, setCustomerID] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://0.0.0.0:8000/filter/get/CHOPS/');
        const orders = response.data.Result;
        setDataForIndex(response.data.Result)
        const unitPriceByDate = {};
        orders.forEach(order => {
          const { ShippedDate, UnitPrice } = order;
          if (!unitPriceByDate[ShippedDate]) {
            unitPriceByDate[ShippedDate] = { total: 0, count: 0 };
          }
          unitPriceByDate[ShippedDate].total += UnitPrice;
          unitPriceByDate[ShippedDate].count += 1;
        });

        const labels = Object.keys(unitPriceByDate);
        const unitPrices = labels.map(date => (unitPriceByDate[date].total / unitPriceByDate[date].count).toFixed(2));

        setData({
          labels,
          datasets: [
            {
              label: 'Ortalama UnitPrice',
              data: unitPrices,
              backgroundColor: 'rgba(255, 255, 255,0.2)',
              borderColor: 'rgba(255, 255, 255,1)',
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBarClick = (index) => {
    setSelectedBar(index);
    setCustomerID(dataForIndex[index].CustomerID);
    setNewShipName('');
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post('http://0.0.0.0:8000/shipname_update', {
        customer_id: customerID,
        new_ship_name: newShipName,
      });
      setShowModal(false);
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container-fluid p-0 main-content'>
        <Navbar />
        <div className="container">
          <ChartComponent data={data} onBarClick={handleBarClick} />
          
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{data.labels[selectedBar]} için Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formShipName">
                <Form.Label>Müşteri ID:</Form.Label>
                <Form.Control type="text" value={customerID} disabled />

                <Form.Label>Yeni Ship Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={newShipName}
                  onChange={(e) => setNewShipName(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Kapat
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Kaydet
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    </div>
  );
};

export default Home;

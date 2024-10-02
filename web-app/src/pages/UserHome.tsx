import './styles.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const MerchantList = () => {
  const merchants = [
    { id: 1, name: 'Merchant 1', location: 'Location 1' },
    { id: 2, name: 'Merchant 2', location: 'Location 2' },
    { id: 3, name: 'Merchant 3', location: 'Location 3' },
    { id: 4, name: 'Merchant 4', location: 'Location 4' },
    { id: 5, name: 'Merchant 5', location: 'Location 5' },
    { id: 6, name: 'Merchant 6', location: 'Location 6' },
    { id: 7, name: 'Merchant 7', location: 'Location 7' },
    { id: 8, name: 'Merchant 8', location: 'Location 8' },
    { id: 9, name: 'Merchant 9', location: 'Location 9' },
    { id: 10, name: 'Merchant 10', location: 'Location 10' },
  ];

  return (
    <Router>
      <div className="container">
        <div className="topbar">Merchant List</div>
        <Routes>
          <Route path="/" element={
            <div className="container">
              {merchants.map((merchant) => (
                <Link key={merchant.id} to={`/merchant/${merchant.id}`} className="merchant-box">
                  <div className="merchant-name">{merchant.name}</div>
                  <div className="merchant-location">{merchant.location}</div>
                </Link>
              ))}
            </div>
          } />
          <Route path="/merchant/:id" element={<MerchantDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const MerchantDetail = () => {
  return (
    <div className="merchant-detail">
      <img src="/api/placeholder/300/200" alt="Merchant" className="merchant-image" />
      <button className="scan-button">Scan</button>
    </div>
  );
};

export default MerchantList;
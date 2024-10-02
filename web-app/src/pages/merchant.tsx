import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const MerchantHome = () => {
  const [amount, setAmount] = useState('');
  const [qrCodeShare, setQRCodeShare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQRCode = async () => {
    setLoading(true);
    setError(null);
    setQRCodeShare(null);

    try {
      const response = await axios.post('http://localhost:5000/generate-qr', { amount });
      const { share2 } = response.data;

      setQRCodeShare(share2);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="merchant-container">
      <h2>Enter Amount and Generate QR Code</h2>
      <form id="merchantForm">
        <div className="input-group">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            required
          />
        </div>
        <div className="input-group">
          <button
            type="button"
            className="generate-btn"
            onClick={generateQRCode}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>
      </form>
      <div className="qr-code" id="qrCode">
        {error && <p className="error">{error}</p>}
        {qrCodeShare ? (
          <div>
            <p>QR Code Share (2nd share):</p>
            <img src={qrCodeShare} alt="QR Code Share" />
          </div>
        ) : (
          <p>QR Code Share Space</p>
        )}
      </div>
    </div>
  );
};

export default MerchantHome;
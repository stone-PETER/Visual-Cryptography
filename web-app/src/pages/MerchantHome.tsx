import React, { useEffect, useState } from 'react';
import { db, auth } from '../utils/FireBaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MerchantHome = () => {
  const [upiID, setUpiID] = useState('');
  const { user } = useSelector((state) => state);
  const [decryptedData, setDecryptedData] = useState('');

  const [amount, setAmount] = useState('');
  const [qrCodeShare, setQRCodeShare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getUpiID = async () => {
    try {
      // Reference to the 'users' collection
      const usersRef = collection(db, 'users');

      // Create a query to find the document where the email matches
      const q = query(usersRef, where('email', '==', user.email));

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming UPI ID is stored in doc.data().upiID
        setUpiID(querySnapshot.docs[0].data().upiID);
      } else {
        console.error('No matching documents!');
      }
    } catch (error) {
      console.error('Error getting UPI ID:', error);
    }
  };

  const goToPay = async () => {
    try {
      const response = await axios.post('http://localhost:5000/decrypt-url', {
        qr_image: qrCodeShare
      });
      
      // Assuming the response contains decrypted URL
      setDecryptedData(response.data.url);
    } catch (err) {
      setError('Failed to decrypt the QR code.');
      console.error(err);
    }
  }

  const generateQRCode = async () => {
    setLoading(true);
    setError('');
    setQRCodeShare(null);

    // Clear the QR code if it already exists
    // const qrCode = document.getElementById('qrCode');
    

    try {
      // Ensure UPI ID is fetched before generating the QR code
      await getUpiID();

      // Check if both amount and UPI ID are valid
      if (amount === '' || upiID === '') {
        setError('Please enter amount and UPI ID');
        setLoading(false);
        return;
      }

      // Make API call to generate the QR code
      const response = await axios.post('http://localhost:5000/generate-qr', { amount, upiID });
      const { share2 } = response.data;

      // Update the state with the QR code share
      setQRCodeShare(share2);
      // console.log(share2);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <p>QR Code Share:</p>
              <img style={{width:'128px', height:'128px'}} id="qr" src={qrCodeShare} alt="QR Code Share" />
              <button onClick={goToPay} style={{margin:"10px"}}>Go To Pay</button>
            </div>
          ) : (
            <p>QR Code Share Space</p>
          )}
        </div>
        {decryptedData && (
        <div>
          <h3>Decrypted Data: {decryptedData}</h3>
        </div>
        )}
      </div>
    </>
  );
};

export default MerchantHome;

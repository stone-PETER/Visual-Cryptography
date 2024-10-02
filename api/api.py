# import os
import base64
import numpy as np
from flask import Flask, request, jsonify
from firebase_admin import credentials, initialize_app, storage, firestore
import qrcode
from io import BytesIO
from PIL import Image
from Modular_Binary.Modular_Binary import encrypt,decrypt
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("./config.json")
initialize_app(cred, {'storageBucket': 'gs://qr-913f7.appspot.com'})
db = firestore.client()

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    # Get amount from the request
    amount = request.json.get('amount')
    upi_id = request.json.get('upiID')
    if not amount:
        return {'error': 'Amount is required'}, 400
    if not upi_id:
        return {'error': 'UPI ID is required. Try Again'}, 400
    


    # Fetch UPI ID from Firebase
    # upi_doc = db.collection('upi_details').document('current').get()
    # if not upi_doc.exists:
    #     return {'error': 'UPI ID not found'}, 404
    
    # upi_id = upi_doc.to_dict().get('upi_id')
    
    # Generate QR code
    
    qr_data = f"upi://pay?pa={upi_id}&am={amount}"
    print(qr_data)


    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(qr_data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # # Save image to BytesIO object
    # img_io = BytesIO()
    # img.save(img_io, 'PNG')
    # img_io.seek(0)
    shares, input_matrix = encrypt(img, 2)

    bucket = storage.bucket()

    # Save first share to Firebase Storage (server-side)
    share1 = Image.fromarray(shares[:,:,0].astype(np.uint8) * 255)
    share1.save('Share_1.png', 'PNG')
    # share1_io = BytesIO()
    # # share1.save('test__2.png', 'PNG')
    # share1.save(share1_io, 'PNG')
    # share1_io.seek(0)

    # blob1 = bucket.blob(f"qr_codes/qr_{amount}_share_1.png")
    # blob1.upload_from_file(share1_io, content_type='image/png')

    # Prepare second share for frontend
    share2 = Image.fromarray(shares[:,:,1].astype(np.uint8) * 255)
    share2_io = BytesIO()
    share2.save(share2_io, 'PNG')
    share2_io.seek(0)
    share2_base64 = base64.b64encode(share2_io.getvalue()).decode('utf-8')

    # Save metadata to Firestore
    # db.collection('qr_codes').add({
    #     'amount': amount,
    #     'share1_path': f"qr_codes/qr_{amount}_share_1.png",
    #     'timestamp': firestore.SERVER_TIMESTAMP
    # })

    # Return only the second share to frontend
    response = {
        'share2': f"data:image/png;base64,{share2_base64}"
    }

    return jsonify(response)

@app.route('/decrypt-url', methods=['POST'])
def decrypt_url():
    data = request.json
    # qr_id = data.get('qr_id')

    data = data['qr_image']
    if not data:
        return jsonify({'error': 'QR ID is required'}), 400
    print(data)

    image = Image.open(BytesIO(base64.b64decode(data.split(',')[1])))
    share1 = Image.open('Share_1.png')

    op, f_image = decrypt((image, share1))

    op.save('op.png')
    f_image.save('fi.png')

    return jsonify({'data': 'success'})
    # return jsonify({'data': decrypted_data})


if __name__ == '__main__':
    app.run(debug=True)
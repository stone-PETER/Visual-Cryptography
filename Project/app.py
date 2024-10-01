import os
from flask import Flask, request, send_file
from firebase_admin import credentials, initialize_app, storage, firestore
import qrcode
from io import BytesIO

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase
cred = credentials.Certificate("path/to/your/firebase-credentials.json")
initialize_app(cred, {'storageBucket': 'your-storage-bucket-name.appspot.com'})
db = firestore.client()

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    # Get amount from the request
    amount = request.json.get('amount')
    
    if not amount:
        return {'error': 'Amount is required'}, 400

    # Fetch UPI ID from Firebase
    upi_doc = db.collection('upi_details').document('current').get()
    if not upi_doc.exists:
        return {'error': 'UPI ID not found'}, 404
    
    upi_id = upi_doc.to_dict().get('upi_id')

    # Generate QR code
    qr_data = f"upi://pay?pa={upi_id}&am={amount}"
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(qr_data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Save image to BytesIO object
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    # Upload image to Firebase Storage
    bucket = storage.bucket()
    blob = bucket.blob(f"qr_codes/qr_{amount}.png")
    blob.upload_from_file(img_io, content_type='image/png')

    # Get the public URL of the uploaded image
    blob.make_public()
    image_url = blob.public_url

    # Save image URL to Firestore
    db.collection('qr_codes').add({
        'amount': amount,
        'image_url': image_url,
        'timestamp': firestore.SERVER_TIMESTAMP
    })

    # Return the image
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)

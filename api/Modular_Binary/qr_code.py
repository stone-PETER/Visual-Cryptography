
import qrcode
from PIL import Image


def qr( a):
  qr = qrcode.QRCode(version=1, box_size=10, border=5)
  qr.add_data(a)
  qr.make(fit=True)
  img = qr.make_image(fill_color="black", back_color="white")

  # Save image to BytesIO object
  # img_io = BytesIO()
  # img.save(img_io, 'PNG')
  # img_io.seek(0)
  return img
  

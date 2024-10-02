import pyqrcode

def qr( a):
  q_img=pyqrcode.create(a)
  q_img.png("qrcode.png",scale=5)
  

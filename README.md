# user-sawitHub
API for Login &amp; Register user sawitHub with MySQL Database

# REGISTER
- URL
  - /register
- Method
  - POST
- Request Body
  - Name
  - Email
  - Password
- Response
  - "Register Success"
# LOGIN
- URL
  - /login
- Method
  - POST
- Request Body
  - Email
  - Password
- Response
  - Jika email user tidak ditemukan, output "User tidak ditemukan, silahkan register terlebih dahulu"
  - Jika email user ditemukan
    - Jika password salah, output "Password salah"
    - Jika password benar, output "Login berhasil"

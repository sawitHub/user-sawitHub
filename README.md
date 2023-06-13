# user-sawitHub
API for Login &amp; Register user sawitHub with MySQL Database

## REGISTER
- URL
  - /register
- Method
  - POST
- Request Body
  - Name
  - Email
  - Password
- Response
  ```json

  "message": "Register success"

  ```
  
## LOGIN
- URL
  - /login
- Method
  - POST
- Request Body
  - Email
  - Password
- Response
  - Jika email user tidak ditemukan menghasilkan output
    ```json

    "User tidak ditemukan, silahkan register terlebih dahulu"

    ```
  - Jika email user ditemukan
    - Jika password salah menghasilkan output
      ```json

      "message": "Password salah"

      ```
    - Jika password benar menghasilkan output
      ```json

      "message": "Login berhasil"

      ```

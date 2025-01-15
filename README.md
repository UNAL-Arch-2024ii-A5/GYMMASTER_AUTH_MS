# Authentication API

This is a **JavaScript-based RESTful API** built with **Express.js** for managing users, their authentication, and roles such as Admin and Coach. It supports user registration, login, and various user management features.

## Features

- User registration and login
- Role-based access control (Admin, Coach, and Regular Users)
- Password reset with token
- User updates
- Image upload and resizing (commented out for now)  soon\*

---

## **Installation and Setup**

### Prerequisites

- Node.js 16 or later
- MongoDB instance (local or cloud)

### Clone the Repository

```bash
git clone https://github.com/UNAL-Arch-2024ii-A5/GYMMASTER_AUTH_MS.git
cd auth_ms
```

### Install Dependencies

```bash
npm install
```

### Configure the Environment

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
MAIL_ID=your_email
MP=your_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_api_key
SECRET_KEY=your_secret_key
```

### Start the Server

```bash
npm start
```

The application will run on `http://localhost:5000` by default.

---

## **API Endpoints**

### **Base URL**

`http://localhost:5000`

### **User Routes**

#### **Authentication and User Management**

| Method | Endpoint                 | Description                      |
| ------ | ------------------------ | -------------------------------- |
| POST   | `/register`              | Register a new user              |
| POST   | `/login`                 | User/Admin/Coach (general) login |
| POST   | `/admin-login`           | Admin login                      |
| POST   | `/coach-login`           | Coach login                      |
| POST   | `/forgot-password-token` | Generate a password reset token  |
| PUT    | `/reset-password/:token` | Reset password with a token      |
| PUT    | `/password`              | Update password (authenticated)  |
| PUT    | `/edit-user`             | Update user details              |
|        |                          |                                  |

#### **User Data Retrieval and Deletion**

| Method | Endpoint     | Description                                                         |
| ------ | ------------ | ------------------------------------------------------------------- |
| GET    | `/all-users` | Retrieve all users                                                  |
| GET    | `/:id`       | Get details of a specific user                                      |
| DELETE | `/:id`       | Delete a specific user                                              |
| DELETE | `/`          | Delete all users                                                    |

---

## **Example Requests**

### **Register a User**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstname":"Laura",
    "lastname":"Maria",
    "email":"lmariap@unal.edu.co",
    "mobile":"123545556",
    "password":"Diana123",
    "address":"Calle falsa A falso # 77 L falso"
}' http://localhost:5000/register
```

### **Login as a User**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "email":"lmariap@unal.edu.co",
    "password":"Diana123"
}' http://localhost:5000/login
```

### **Register a Admin**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstname":"Laura",
    "lastname":"Maria",
    "email":"lmariap@unal.edu.co",
    "mobile":"123545556",
    "password":"Diana123",
    "address":"Calle falsa A falso # 77 L falso",
    "role":"admin"
}' http://localhost:5000/register
```

### **Login as a Admin**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "email":"lmariap@unal.edu.co",
    "password":"Diana123"
}' http://localhost:5000/admin-login
```

### **Register a Coach**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstname":"Laura",
    "lastname":"Maria",
    "email":"lmariap@unal.edu.co",
    "mobile":"123545556",
    "password":"Diana123",
    "address":"Calle falsa A falso # 77 L falso",
    "role":"Coach"
}' http://localhost:5000/register
```

### **Login as a Coach**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "email":"lmariap@unal.edu.co",
    "password":"Diana123"
}' http://localhost:5000/coach-login
```

### **Forgot Password**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstname":"Laura",
    "lastname":"Maria",
    "email":"lmariap@unal.edu.co",
    "mobile":"123545556",
    "address":"Calle falsa A falso # 77 L falso"
}' http://localhost:5000/forgot-password-token
```

### **Reset Password**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "newPassword": "newpassword123"
}' http://localhost:5000/reset-password/{token}
```

---

## **Docker Setup**

To build and run the application using Docker:

### Configure the .env.docker

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/GymMaster
JWT_SECRET=your_secret_key
MAIL_ID=your_email
MP=your_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_api_key
SECRET_KEY=your_secret_key
```


### Build the Application

```bash
docker-compose up --build 
```

---

## **Updating the Application**

To update the application:

1. Pull the latest changes from the repository:
   ```bash
   git pull origin main
   ```
2. Update dependencies if necessary:
   ```bash
   npm install
   ```
3. Restart the application:
   ```bash
   npm run start
   ```

# Node.js Authentication System

features:

- Form-based Registration and Login
- Google & Facebook OAuth 2.0 Login
- JWT-based authentication
- User Profile Service (View and Update)
- Modular microservice architecture

# Project Structure
<br>
project-root/
├── auth-service/  # Handles form & social login
├── user-profile-service/  # Handles user profile with JWT auth
├── .gitignore  # Excludes .env
└── README.md  

## ⚙️ Dependencies

  ## Auth Service
   npm install express mongoose dotenv bcryptjs jsonwebtoken axios cors
   
  ## User Profile Service
   npm install express mongoose dotenv jsonwebtoken cors



# Next.js Authentication App

This is a Next.js project implementing user authentication with NextAuth.js, Tailwind CSS for styling, and MongoDB for data storage. The application supports user signup and login using Google OAuth and credentials-based authentication (username and password).

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**:
  - Sign up and log in with username and password.
  - Google OAuth integration for seamless login.
- **Secure API**:
  - Backend API for handling user registration and login requests securely.
- **Responsive UI**:
  - Clean and modern user interface built with Tailwind CSS.
- **Database**:
  - MongoDB for storing user data securely.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js (Google OAuth, Credentials Provider)

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- A Google Cloud project with OAuth 2.0 credentials set up for Google authentication.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - If using a local MongoDB instance, ensure MongoDB is running on \`mongodb://localhost:27017\`.
   - If using MongoDB Atlas, get your connection string from the Atlas dashboard.

4. **Configure environment variables**:
   Create a `.env.local` file in the root directory and add the following:

## Environment Variables
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/your-database-name

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

- Generate a `NEXTAUTH_SECRET` using a random string (e.g., `openssl rand -base64 32`).
- Obtain \`GOOGLE_CLIENT_ID\` and \`GOOGLE_CLIENT_SECRET\` from the Google Cloud Console.

## Running the Application
1. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will be available at \`http://localhost:3000\`.

2. **Build for production**:
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`

## Project Structure
```bash
├── components/           # Reusable UI components
├── pages/                # Next.js pages
│   ├── api/              # API routes (e.g., NextAuth)
│   ├── auth/             # Authentication pages (signin, signup)
│   ├── _app.js           # Custom App component
├── public/               # Static assets
├── styles/               # Tailwind CSS and global styles
├── utils/                # Utility functions and database connection
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── README.md             # This file
```

## Frontend
The frontend is built with **Next.js** and styled using **Tailwind CSS**. Key features include:
- **Signup and Login UI**:
  - Responsive forms for user registration and login.
  - Google OAuth button for quick authentication.
  - Error handling and loading states for better UX.
- **Pages**:
  - `/`: Login page with credentials and Google login options.


## Backend
The backend uses **Next.js API Routes** and **NextAuth.js** for authentication, with **MongoDB** for data persistence. Key features include:
- **Authentication API**:
  - Handles user registration and login securely.
  - Password hashing for credentials-based authentication.
  - Session management with NextAuth.js.
- **MongoDB Integration**:
  - Stores user data (e.g., username, hashed password, Google account details).
  - Configured via `MONGODB_URI` in the environment variables.
- **NextAuth.js**:
  - Supports Google Provider and Credentials Provider.
  - Configured in `app/api/auth/[...nextauth]/route.ts`.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
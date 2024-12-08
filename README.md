
# Server Dashboard

A **Server Dashboard** built with **Next.js**, **TypeScript**, and **MongoDB**, allowing users to view, filter, and sort server statuses. The app includes a robust authentication system and user-friendly interface for managing server data.

---

## Features

- **Authentication**: Secure user login/logout with token-based authentication.
- **Server Status Overview**: Displays the status of servers (Up, Down, Degraded).
- **Filter and Sort**: Filter servers by status and sort them alphabetically.
- **Interactive Details**: Click on a server to view detailed information.
- **Responsive Design**: Fully responsive UI for desktops, tablets, and mobile devices.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- MongoDB database (local or cloud)

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/alihelmy27/server-dashboard.git
   cd server-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```env
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
server-dashboard/
├── app/                     # Next.js application folder
│   ├── api/                 # API routes for authentication and servers
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── globals.css          # Global CSS styles
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
├── public/                  # Static files
├── utils/                   # Utility functions
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

---

## API Endpoints

### Authentication

- **POST** `/api/auth/signin`  
  Authenticate user and return a JWT.

- **POST** `/api/auth/signout`  
  Logs out the user by invalidating the session.

- **GET** `/api/auth/check`  
  Checks if the user is authenticated.

### Servers

- **GET** `/api/servers`  
  Fetches the list of servers and their statuses.

---

## Features Breakdown

### Authentication

- Built using JWT tokens stored in local storage for user session management.
- Middleware ensures protected routes are accessible only to authenticated users.

### Server Management

- Displays server status (Up, Down, Degraded) with color-coded badges.
- Users can filter servers by their status and sort them alphabetically.

### UI/UX

- Intuitive and clean design.
- Responsive layout for all screen sizes.

---

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Ali Helmy**  
GitHub: [alihelmy27](https://github.com/alihelmy27)

---


## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [React Documentation](https://reactjs.org/docs/)

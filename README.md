# EduSkills

## 📸 Screenshot  
![Project Screenshot](https://i.ibb.co.com/4nCPqpMp/eduskills.jpg)

EduSkills is an educational platform designed to help learners enhance their skills through various courses, assignments, and resources.

## Features
- **Course Listings**: Explore a variety of courses with detailed descriptions.
- **Assignment Submission**: Students can submit assignments and track their progress.
- **Role-Based Access**:
  - **Student**: Enroll in courses and submit assignments.
  - **Instructor**: Create and manage courses and assignments.
  - **Admin**: Manage users and platform settings.
- **Search and Filter**: Find courses based on topics, difficulty level, and more.
- **Authentication**: Secure login and registration system.

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Axios (for API requests)
- React Toastify (for notifications)

### Backend
- Node.js
- Express.js
- MongoDB (native driver for database operations)
- JWT (for authentication)

### Additional Libraries
- React Router (for routing)
- TanStack Query (for API data fetching)

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud-based)

### Steps to Set Up Locally
1. Clone the repository:
   ```bash
   git clone `https://github.com/Razaul007/eduskill-client`
  
   ```
2. Navigate to the project folder:
   ```bash
   cd EduSkills
   ```
3. Install dependencies for the frontend and backend:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following environment variables:
   ```env
   VITE_API_URL=http://localhost:5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

## Usage
1. Visit the website at `https://eduskills.web.app/`.
2. Register as a new user or log in.
3. Browse available courses and interact with the platform based on your role.
4. Submit assignments and track your learning progress.

## Folder Structure
```
EduSkills/
├── backend/                # Backend API logic
│   └── index.js            # Main server file
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Pages for routing
│       ├── styles/         # Tailwind and DaisyUI setup
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## API Endpoints
### Courses
- **POST /courses**: Add a new course (only for instructors)
  - Request Body:
    ```json
    {
      "title": "Course Title",
      "description": "Course Description",
      "instructor": "Instructor Name",
      "category": "Category Name",
      "price": 100
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Course added successfully."
    }
    ```

## Contributing
We welcome contributions! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, please reach out to:
- **Name**: Muhammad Razaul Alam
- **Email**: razaulalam05@gmail.com


# BizCards2 - Server

BizCards2 is a Node.js project built on Express.js, serving as a server for managing business cards. It includes features such as authentication, access hierarchy, CRM system for admins, and various middleware for enhanced functionality. Below is a comprehensive overview of the project setup and included features:

## Features

- **Authentication:** Implements JWT for token creation and resolution, ensuring secure user authentication.
- **Access Hierarchy:** Includes a hierarchical access system to manage user roles and permissions effectively.
- **CRM System:** Provides a CRM system tailored for admins to manage business card data efficiently.
- **Environment Configuration:** Utilizes separate environment files for production (Atlas) and development (Compass), ensuring smooth deployment across different environments.
- **Initial Data Creation:** Includes a function to initialize the database with initial data for seamless setup.
- **Express Rate Limiter:** Implements rate limiting to block users after 5 failed attempts, enhancing security against brute force attacks.
- **Validation:** Utilizes JOI for data validation, ensuring incoming requests meet specified criteria.
- **Database Handling:** Utilizes Mongoose for organizing MongoDB data, facilitating smooth data operations.
- **CORS Support:** Implements CORS to handle cross-origin resource sharing effectively.
- **Logging:** Includes JSON logging using Morgan and debugging for enhanced debugging capabilities.
- **Password Encryption:** Utilizes Bcryptjs for password encryption, ensuring secure storage of sensitive user data.
- **Public Folder:** Provides a public folder containing a custom 404 HTML file for handling not found requests.
- **Express Middlewares:** Includes various Express middlewares for authentication checks and enhanced request handling.

## Installation

To get started with BizCards2, follow these steps:

1. Clone the repository: `git clone https://github.com/Shayzinger555/BizCards2.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create `.env` file for development environment and `.env.production` for production.
   - Include necessary environment variables such as database connection strings, JWT secrets, etc.
4. Run the server:
   - For development: `npm run dev`
   - For production: `npm start`

## Usage

- Once the server is running, you can access the API endpoints documented in the codebase.
- Ensure proper authentication and authorization for accessing restricted resources.
- Refer to the API documentation or code comments for detailed usage instructions.

## Contributing

Contributions to BizCards2 are welcome! Feel free to open issues or submit pull requests for any enhancements or bug fixes.

---



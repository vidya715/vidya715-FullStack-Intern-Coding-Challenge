# vidya715-FullStack-Intern-Coding-Challenge
**List the main functionalities and features of your solution using bullet points.** Be specific and highlight the most important aspects.]

* User registration and login with role-based access (System Administrator, Normal User, Store Owner).
* System Administrator: Add new stores, users (admin and normal), view listings with filtering, and manage user details.
* Normal User: Sign up, log in, view and search stores, submit and modify ratings for stores.
* Store Owner: Log in, view ratings for their store, and see the average rating.
* Form validations for user inputs (name, email, password, address).
* Store listings display name, address, overall rating, and user's submitted rating.
* All listings support sorting.

## Technologies Used

[**List the primary technologies, frameworks, and libraries you used.** This helps others understand the tech stack.]

* **Backend:** [e.g., Node.js with Express.js]
* **Database:** [e.g., PostgreSQL]
* **Frontend:** [e.g., ReactJS]
* **Other:** [e.g., Redux, Axios, bcrypt, jsonwebtoken]

## Installation

[**Provide clear and step-by-step instructions on how to set up and run your project locally.**]

1.  Clone the repository:
    ```bash
    git clone [repository URL]
    cd [your-project-name]
    ```
2.  Install backend dependencies:
    ```bash
    cd backend
    npm install  # or yarn install
    ```
3.  Set up the database:
    * Ensure you have [PostgreSQL/MySQL] installed and running.
    * Create a database named `[your_database_name]` (or configure as needed).
    * Configure the database connection details in `backend/config/database.js` (or `.env` file).
    * Run database migrations/schema creation (if using an ORM like Sequelize):
        ```bash
        npx sequelize db:migrate # or npx sequelize-cli db:migrate
        ```
        or import the `database_schema.sql` file.
4.  Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install  # or yarn install
    ```
5.  Configure frontend API URL (if necessary) in `frontend/src/config.js` or environment variables.

## Environment Variables

[**If your project uses environment variables, explain which ones are needed and how to configure them.**]

To run this project, you will need to set the following environment variables. You can typically create a `.env` file in the root of your `backend` and/or `frontend` directories:

**Backend (`backend/.env` - Example):**

DATABASE_URL=postgres://user:password@host:port/database
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000


**Frontend (`frontend/.env.local` or similar - Example):**

REACT_APP_API_BASE_URL=http://localhost:5000/api


[**Explain the purpose of each key variable.** For example:]

* `DATABASE_URL`: The connection string for your PostgreSQL database.
* `JWT_SECRET`: A secret key used for signing JSON Web Tokens for authentication.
* `REACT_APP_API_BASE_URL`: The base URL of your backend API.

## Usage

[**Explain how to use your application. Provide examples or screenshots if helpful.**]

1.  Start the backend server:
    ```bash
    cd backend
    npm run dev  # or npm start
    ```
2.  Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```
3.  Open your browser and navigate to `http://localhost:3000` (or the port your frontend runs on).

[**You can add more specific usage instructions based on the different user roles or functionalities here.** For example:]

* **Admin Login:** Navigate to `/admin` (or a specific admin login route) and use the credentials of a System Administrator.
* **Normal User Signup:** Navigate to `/signup` to create a new user account.
* **Rating a Store:** As a logged-in normal user, browse the list of stores and click the "Submit Rating" button for a specific store.

## API Endpoints



Here are some of the key API endpoints:

**Authentication:**

* `POST /api/auth/register`: Register a new normal user.
* `POST /api/auth/login`: Log in a user (all roles).
* `POST /api/auth/logout`: Log out the current user.
* `POST /api/auth/update-password`: Update the logged-in user's password (protected).

**Users (Admin Only):**

* `POST /api/admin/users`: Add a new user (admin or normal).
* `GET /api/admin/users`: Get a list of users with optional filters and sorting (protected).
* `GET /api/admin/users/:id`: Get details of a specific user (protected).

**Stores (Admin & Normal User):**

* `POST /api/admin/stores`: Add a new store (protected).
* `GET /api/admin/stores`: Get a list of stores with optional filters and sorting (protected).
* `GET /api/stores`: Get a list of all registered stores (public for normal users).

**Ratings (Normal User):**

* `POST /api/stores/:storeId/ratings`: Submit a rating for a store (protected).
* `PUT /api/stores/:storeId/ratings`: Update a user's existing rating for a store (protected).

**Dashboard:**

* `GET /api/admin/dashboard`: Get admin dashboard data (protected).
* `GET /api/owner/dashboard`: Get store owner dashboard data (protected).

## Database Schema (Simplified)

[**Provide a simplified overview of your database schema to give others a general understanding of how the data is organized.**]

Here's a simplified overview of the main database tables:

* **`users`:**
    * `id` (INT, Primary Key)
    * `name` (VARCHAR)
    * `email` (VARCHAR, Unique)
    * `password` (VARCHAR)
    * `address` (VARCHAR)
    * `role` (ENUM: 'admin', 'normal', 'owner')
    * `store_id` (INT, Foreign Key referencing `stores.id`, for Store Owners)
* **`stores`:**
    * `id` (INT, Primary Key)
    * `name` (VARCHAR)
    * `email` (VARCHAR)
    * `address` (VARCHAR)
    * `rating` (DECIMAL)
* **`ratings`:**
    * `id` (INT, Primary Key)
    * `user_id` (INT, Foreign Key referencing `users.id`)
    * `store_id` (INT, Foreign Key referencing `stores.id`)
    * `rating` (INT, 1-5)
    * *(Unique constraint on `user_id` and `store_id`)*


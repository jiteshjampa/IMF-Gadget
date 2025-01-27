
# IMF Gadget API

🔹 **IMF Gadget API** is a backend service built using **Node.js**, **Express**, and **PostgreSQL** for managing gadgets in a high-stakes mission environment. The API allows for CRUD operations on gadgets, tracks their mission status, and integrates JWT-based authentication.

---

## 🚀 Features

- **User Authentication**: JWT-based authentication to protect certain routes.
- **CRUD Operations**: Add, update, delete, and view gadgets.
- **Gadget Status**: Track the status of gadgets (Available, Deployed, Destroyed, Decommissioned).
- **Unique Gadget Names**: Assign unique codenames to gadgets like "The Kraken" or "The Nightingale".
- **Mission Probability**: Randomly generated success probabilities for missions.

---

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework to simplify routing and middleware management.
- **Sequelize**: ORM for database interaction with PostgreSQL.
- **PostgreSQL**: Relational database for storing gadget information.
- **JWT**: JSON Web Tokens for secure authentication.
- **CORS**: Cross-Origin Resource Sharing middleware for API accessibility.

---

## 📦 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/imf-gadget-api.git
```

### 2. Install dependencies

Navigate into the project directory and install the required dependencies.

```bash
cd imf-gadget-api
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project and add your environment variables.

```env
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4.Create and Migrate the database
To create a model in Sequelize, you can use the following command:
```bash
npx sequelize-cli model:generate --name ModelName --attributes attribute1:type,attribute2:type
```
Run the Sequelize migrations to create the necessary tables in the database.

```bash
npx sequelize-cli db:migrate
```

### 5. Start the server

Run the application locally using:

```bash
npm start
```

The server will start on `http://localhost:5000`.

---

## 🧑‍💻 API Endpoints
"For detailed information about the API endpoints and how to interact with them, please refer to the Postman API Documentation."
https://imf-gadget.postman.co/workspace/1ae47405-a128-4ef2-8d6b-976447f0c66f/documentation/36484787-493a3cb1-94b3-4956-9a1e-4e987176ff02
### 1. **POST** `/login`
- **Description**: Authenticate user and generate a JWT.
- **Body**:
  ```json
  { "username": "your_username" }
  ```
- **Response**:
  ```json
  { "token": "your_jwt_token" }
  ```

### 2. **GET** `/gadgets`
- **Description**: Retrieve a list of all gadgets.
- **Response**:
  ```json
  [
    {
      "id": "some-uuid",
      "name": "The Kraken",
      "status": "Available",
      "successProbability": "85%"
    },
    {
      "id": "some-uuid-2",
      "name": "The Nightingale",
      "status": "Deployed",
      "successProbability": "90%"
    }
  ]
  ```

### 3. **POST** `/gadgets`
- **Description**: Add a new gadget to the inventory.
- **Authentication**: Requires a valid JWT token.
- **Body**:
  ```json
  { "name": "The Vanguard" }
  ```
- **Response**:
  ```json
  {
    "id": "new-uuid",
    "name": "The Vanguard",
    "status": "Available"
  }
  ```

### 4. **PATCH** `/gadgets/:id`
- **Description**: Update a gadget's details (e.g., name, status).
- **Authentication**: Requires a valid JWT token.
- **Response**:
  ```json
  {
    "message": "Gadget updated",
    "gadget": {
      "id": "existing-uuid",
      "name": "The Vanguard",
      "status": "Deployed"
    }
  }
  ```

### 5. **DELETE** `/gadgets/:id`
- **Description**: Decommission a gadget (change its status).
- **Authentication**: Requires a valid JWT token.
- **Response**:
  ```json
  {
    "message": "Gadget decommissioned"
  }
  ```

### 6. **POST** `/gadgets/:id/self-destruct`
- **Description**: Initiate the self-destruct sequence for a gadget.
- **Authentication**: Requires a valid JWT token.
- **Response**:
  ```json
  {
    "message": "Self-destruct sequence initiated",
    "confirmationCode": 1234
  }
  ```
  Here's the updated README section with the **status filter API** added as the 7th endpoint:  

---

### 7. **GET** `/gadgets?status={status}`  
- **Description**: Retrieve gadgets filtered by their status.  
- **Query Parameter**:  
  - `status` (string) - The status of the gadget. Must be one of:  
    - `"Available"`  
    - `"Deployed"`  
    - `"Destroyed"`  
    - `"Decommissioned"`  
- **Example Request**:  
  ```
  GET /gadgets?status=Deployed
  ```
- **Response**:  
  ```json
  [
    {
      "id": "some-uuid",
      "name": "The Kraken",
      "status": "Deployed",
      "successProbability": "85%"
    },
    {
      "id": "some-uuid-2",
      "name": "The Nightingale",
      "status": "Deployed",
      "successProbability": "90%"
    }
  ]
  ```
- **Error Responses**:  
  - `400 Bad Request`: If an invalid status is provided.  
  - `500 Internal Server Error`: If there is an issue retrieving data.  

---

This ensures users can efficiently retrieve gadgets based on their mission status. You can now update your GitHub README with this section. 🚀 Let me know if you need any modifications!

---

## 🔒 Security

- **JWT Authentication**: Secures sensitive routes by requiring a valid token.
- **CORS**: Ensures that only authorized origins can interact with the API.

---

## 🧑‍💻 Contributing

We welcome contributions to improve this project! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit them (`git commit -am 'Add feature xyz'`).
4. Push to your branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

---



## 📣 Acknowledgments

- [Sequelize](https://sequelize.org) for providing a powerful ORM.
- [PostgreSQL](https://www.postgresql.org) for the reliable database engine.
- [Express.js](https://expressjs.com) for simplifying the web server setup.

---


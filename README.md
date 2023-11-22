#DF Backend Dev Test NodeJS
Description
This is a Node.js backend application developed for the DF Backend Dev Test. The application is designed to manage movies and user accounts. It provides various endpoints for creating movies, fetching movie details, managing favorites, and more.

Prerequisites
Make sure you have Docker and Docker Compose installed on your machine.

Docker Installation Guide
Docker Compose Installation Guide
How to Run
Clone the repository:

git clone https://github.com/LahceneDer/DF_Backend_Dev_Test_NodeJS.git
Navigate to the project directory:

cd DF_Backend_Dev_Test_NodeJS
Create a .env file in the project root and set the following environment variables:

MONGO_URI=mongodb://root:example@localhost:27017/your_database_name
JWT_SECRET=your_jwt_secret

Replace placeholders with your actual configuration.

Run the application using Docker Compose:

docker-compose up
This will start both the Node.js app and MongoDB containers.

Access the app at http://localhost:3030.

API Documentation
Swagger documentation is available at http://localhost:3030/api-docs.

Endpoints
POST /signup: User registration
POST /signin: User login
POST /movies: Create a new movie
GET /movies: Get a list of all movies
GET /movies/top: Get the top movies
GET /movies/{movieId}: Get details of a specific movie
GET /movies/{movieId}/trailer: Get the trailer of a specific movie
GET /movies/search/{query}: Search for movies based on a query
PATCH /favorites: Add a movie to favorites (requires authentication)
DELETE /favorites: Remove a movie from favorites (requires authentication)
GET /favorites/:userId: Get the list of favorite movies for a user (requires authentication)

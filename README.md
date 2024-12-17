# Book Keeping Service

## Description
The Book Keeping Service is a backend application designed to manage books and libraries. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on books and libraries. The system also allows borrowing and returning books, as well as managing the library inventory.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add the necessary environment variables

## Running the Application
- Start the application in development mode: `npm run dev`
- Start the application in production mode: `npm start`

## Features

- User Registration and Authentication: Users can sign up, log in, and authenticate using JWT tokens.
- Library and Book Management: Users can view and manage libraries, books, and their inventories.
- Borrowing and Returning Books: Users can borrow books from libraries and return them when done.
- Admin Role: Admins can manage books, libraries, and users, but they cannot borrow books.
- User Profile Management: Users can update their profile details and change their password.
- Vote Tracking: Users can only borrow books once at a time. Admins cannot borrow books.

## Technologies Used
- **Node.js:** Backend environment for building the application.
- **Express.js:** Framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing user and candidate data.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens):** For secure authentication and authorization.
- **RESTful API:** For communication between frontend and backend.

# API Endpoints

## Authentication

### Register

- `POST /api/users/register`: Register a new user.

### Login

- `POST /api/users/login`: Login an existing user and generate JWT token.

## Books

### Get All Books
- `GET /api/books`: Retrieve a list of all books.

### Get Book by ID
-`GET /api/books/:id`: Retrieve a specific book by its ID.

### Create Book
- `POST /api/books`: Add a new book to a library.

### Update Book
- `PUT /api/books/:id  `: Update a book's details.

### Delete Book
- `DELETE /api/books/:id`: Delete a book from the library.

## Library

### Get All Libraries
- `GET /api/libraries`: Retrieve a list of all libraries.

### Get Library by ID
- `GET /api/libraries/:id`: Retrieve a specific library by its ID.

### Create Library
- `POST /api/libraries`: Create a new library.

### Update Library
- `PUT /api/libraries/:id`: Update a library by its ID.

### Delete Library
- `DELETE /api/libraries/:id`: Delete a library by its ID.

## Borrowing

### Borrow Book
- `POST /books/borrow/:id`: Borrow a book from the library.

### Return Book
- `POST /books/return/:id`: Return a borrowed book.

## Library Inventory

### Get list of books available in a specific library
- `GET /api/libraries/:id/inventory` : Retrieve a list of books available in a specific library

### Add a book to the inventory
- `POST /api/libraries/:id/inventory` :  Add a book to the inventory of a specific library

### Delet a book from inventory
- `DELETE /api/libraries/:id/inventory/:bookId` : Remove a book from the inventory of a specific library by its ID

## Data Models
### User
The `User` data model represents the users who can interact with the Book Keeping Service, either as a `Author` or `Borrower`.

- **Fields:**
  - `name` (String): Name of the user (required).
  - `email` (String): Email address of the user (unique).
  - `password` (String): Password of the user (required).
  - `role` (String, Enum: ['Author', 'Borrower']): Role of the user, either as a `Author` or `Borrower`.
  - `borrowedBooks` (ObjectId): Reference to the Book model.
  - `timestamps` (Date) : Timestamp of User creation.

- **Example:**
  ```json
  {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "Password123",
      "role": "Borrower"
  }
  

### Books
The `Book` data model represents the books available in a library.

- **Fields:**
  - `title` (String): Title of the book (required).
  - `author` (ObjectId): Author of the book (required).
  - `library` (ObjectId): Reference to the library where the book is located.
  - `borrower` (ObjectId): List of users who have borrowed the book.
  - `image` (String): Image of the book
  - `timestamps` (Date) :Timestamp of Book creation.
  
- **Example:**
  ```json
  {
      "title": "Crime and Punishment",
      "author": "675f3d4b882baff056997995",
      "library": "675ca4ba4b588b0241d0c7ca",
      "borrower": "675f3be6882baff056997992",
      "image": "cover_image_url"
  }
  

### Library
The `Library` data model represents libraries that contain books.

- **Fields:**
  - `name` (String): Name of the library (required).
  - `address` (String): Address of the library (required).
  - `books` (ObjectId): List of books available in the library.
  
- **Example:**
  ```json
  {
    "name": "Central Library",
    "address": "123 Main St, City",
    "books": [
     {
        "book": "605c72ef15320725e891c62a",
        
       }
    ]
  }

## Multilingual Support
The APIs support English for error and success messages. Use the lang query parameter to set the language (e.g., ?lang=hi).

## Authorization
All endpoints except registration and login require a valid JWT token for access. Only authenticated users with appropriate roles can add or remove books from the library inventor

## Additional Notes
**Role Management:** The system distinguishes between two user roles: author and borrower. Author can manage books in libraries, while users can borrow and return books.

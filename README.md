# Book Keeping Service

## Description
The Book Keeping Service is a backend application designed to manage books and libraries. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on books and libraries. The system also allows borrowing and returning books, as well as managing the library inventory.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add the necessary environment variables

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


## Borrowing and Returning Books

### Borrow Book
- `POST /books/borrow/:id`: Borrow a book from the library.

### Return Book
- `POST /books/return/:id`: Return a borrowed book.

User Profile
Get Profile

GET /users/profile: Retrieve user profile information.
Change Password

PUT /users/profile/password: Change user password.
Request Body:
json
Copy code
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}

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

- title (String): Title of the book (required).
author (String): Author of the book (required).
libraryId (ObjectId): Reference to the library where the book is located.
quantity (Number): Number of available copies of the book.
borrowers (Array): List of users who have borrowed the book.
borrowedAt (Date): Timestamp when the book was borrowed.
Example:

json
Copy code
{
  "title": "Introduction to Node.js",
  "author": "John Doe",
  "libraryId": "605b8e99a1d9c53a4b70db8e",
  "quantity": 10,
  "borrowers": [
    {
      "user": "5f8c072cb0f2b84c1a62c9bb",
      "borrowedAt": "2023-12-17T15:00:00Z"
    }
  ]
}
Library
The Library data model represents libraries that contain books.

Fields:

name (String): Name of the library (required).
address (String): Address of the library (required).
phone (String): Contact phone number of the library.
books (Array): List of books available in the library.
Example:

json
Copy code
{
  "name": "Central Library",
  "address": "123 Main St, City",
  "phone": "123-456-7890",
  "books": [
    {
      "book": "605c72ef15320725e891c62a",
      "quantity": 10
    }
  ]
}
Additional Notes
Role Management: The system distinguishes between two user roles: regular users and admins. Admins can manage books, libraries, and users, while regular users can only borrow and return books.
Borrowing Restrictions: A user can borrow only one book at a time. If the user has already borrowed a book, they cannot borrow another until the first one is returned.
Authentication and Authorization: JWT tokens are used for secure authentication and authorization. Only authenticated users can access protected routes.
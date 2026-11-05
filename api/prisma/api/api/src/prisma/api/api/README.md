# Library Management System

A Library Management System built with NestJS, Prisma ORM, PostgreSQL, and TypeScript.

## Project Overview

This project implements a relational database for managing library books, genres, users, and book reviews. It uses Prisma ORM to define database models, manage migrations, and seed sample data into a hosted PostgreSQL database.

## Technologies Used

- NestJS – Backend application framework
- Prisma ORM – Database access and schema management
- PostgreSQL – Relational database
- TypeScript – Application programming language
- Node.js – Runtime environment

## Database Models

### User
Stores library users, including their names, unique email addresses, password hashes, and roles.

The Role enum defines two types of users:
- PATRON – A regular library user.
- LIBRARIAN – A user responsible for library administration.

### Genre
Stores book categories such as Fiction, Science, Technology, and History.

### Book
Stores book information, including title, author, ISBN, availability, and the associated genre.

### Review
Allows users to submit ratings and comments for books. A user can submit only one review per book.

## Schema Decisions

### Why Book References Genre Instead of Embedding It

The Book model uses a `genreId` foreign key referencing the Genre model instead of storing genre information directly in each book record.

This approach was selected for the following reasons:

1. **Data normalization:** Separating genres into their own table reduces unnecessary duplication.
2. **Data consistency:** Each book references an existing genre, preventing inconsistent category names.
3. **Efficient maintenance:** Updating a genre name automatically reflects the change for all related books.
4. **Referential integrity:** PostgreSQL foreign keys prevent books from referencing nonexistent genres.
5. **Scalability:** The database can support additional genres and books without changing its fundamental structure.
6. **Query flexibility:** Prisma relations allow books to be retrieved together with their associated genre information.

### Database Relationships

- One Genre can have many Books.
- Each Book belongs to one Genre.
- One User can write many Reviews.
- One Book can have many Reviews.

### Constraints

- User emails must be unique.
- Genre names must be unique.
- Book ISBNs must be unique.
- Each Book must reference a valid Genre.
- A User can review each Book only once.

## Database Migration

Prisma migrations are used to create and update the PostgreSQL database structure while maintaining version-controlled schema changes.

Run the following command to create the initial migration:

`npx prisma migrate dev --name init_library_schema`

For a hosted production database, apply committed migrations using:

`npx prisma migrate deploy`

## Database Seeding

The seed script inserts:

- 4 genres
- 16 books
- 4 books per genre

Run:

`npm run seed`

The script uses Prisma's upsert functionality to prevent duplicate records when executed multiple times.

## Prisma vs. Document Database

One major difference between Prisma with PostgreSQL and a document database such as MongoDB is how relationships are represented.

In PostgreSQL, books reference genres through foreign keys, and relational constraints help maintain data integrity. In a document database, genre information may instead be embedded directly within each book document.

Prisma makes relational modeling explicit through model definitions and `@relation` attributes. This requires more upfront schema planning but provides stronger structural consistency and predictable relationships.

## Conclusion

The project demonstrates relational database design, Prisma schema modeling, PostgreSQL migrations, database seeding, and integration with NestJS. The resulting schema provides a foundation for future features such as book borrowing, inventory management, authentication, and library reporting.


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const genreNames = [
    'Fiction',
    'Science',
    'Technology',
    'History',
  ];

  const genres: Record<string, number> = {};

  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    genres[name] = genre.id;
  }

  const books = [
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      genre: 'Fiction',
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      isbn: '9780061122415',
      genre: 'Fiction',
    },
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      genre: 'Fiction',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      genre: 'Fiction',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      genre: 'Science',
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      genre: 'Science',
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      genre: 'Science',
    },
    {
      title: 'The Gene',
      author: 'Siddhartha Mukherjee',
      isbn: '9781476733524',
      genre: 'Science',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genre: 'Technology',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt and David Thomas',
      isbn: '9780135957059',
      genre: 'Technology',
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '9781449373320',
      genre: 'Technology',
    },
    {
      title: 'Code Complete',
      author: 'Steve McConnell',
      isbn: '9780735619678',
      genre: 'Technology',
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      genre: 'History',
    },
    {
      title: 'Guns, Germs, and Steel',
      author: 'Jared Diamond',
      isbn: '9780393354324',
      genre: 'History',
    },
    {
      title: 'The Silk Roads',
      author: 'Peter Frankopan',
      isbn: '9781101912379',
      genre: 'History',
    },
    {
      title: 'The Lessons of History',
      author: 'Will and Ariel Durant',
      isbn: '9781439149959',
      genre: 'History',
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        genreId: genres[book.genre],
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genreId: genres[book.genre],
      },
    });
  }

  console.log(
    `Seed completed: ${genreNames.length} genres, ` +
    `${books.length} books.`
  );
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

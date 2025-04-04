import Link from 'next/link';
import { getBooks } from '@/lib/api';
import BookList from '@/components/books/bookList';


async function getNewestBooks() {
  const books = await getBooks({ limit: 6, sort: 'publishedDate', order: 'desc' });
  return books;
}

export default async function Home() {

  const newestBooks = await getNewestBooks();


  return (
  <div className="home-page">
      <section className="hero bg-blue-50 p-8 rounded-lg mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Book Haven</h1>
          <p className="text-xl mb-6">Discover your next favorite book</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/books" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Browse Books
            </Link>
            <Link 
              href="/about" 
              className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="newest-books mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Newest Arrivals</h2>
          <Link href="/books" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <BookList books={newestBooks} />
      </section>

      <section className="features grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature p-6 bg-gray-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Extensive Collection</h3>
          <p>Browse our diverse collection of books across all genres.</p>
        </div>
        <div className="feature p-6 bg-gray-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Author Spotlight</h3>
          <p>Discover new authors and explore their complete works.</p>
        </div>
        <div className="feature p-6 bg-gray-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Genre Exploration</h3>
          <p>Find your favorite genres and explore similar categories.</p>
        </div>
      </section>
    </div>
  );
}

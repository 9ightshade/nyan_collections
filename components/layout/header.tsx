'use client';

import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import useAuth from '@/hooks/useAuth';
import Navbar from './nav';
import SearchBar from './search';

export default function Header() {
//   const { user, logout, isAuthenticated } = useAuth();
//   const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Nyan Collections
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <SearchBar />
          </div>
          
          {/* <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="hidden md:inline">Hello, {user?.name}</span>
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`${pathname === '/login' ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div> */}
        </div>
      </div>
      <Navbar />
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Authors', path: '/authors' },
    { name: 'Genres', path: '/genres' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-3 text-sm md:text-base whitespace-nowrap transition ${
                pathname === item.path
                  ? 'text-blue-700 font-medium border-b-2 border-blue-700'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
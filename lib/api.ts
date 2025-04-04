export async function getBooks(params = {}) {
    const apiUrl = `${process.env.BACKEND_API_URL}/books`;
    
    // Convert params object to URL search params
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  
    const queryString = searchParams.toString();
    const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache to ensure fresh data
    });
  
    if (!res.ok) {
      // This will be caught by the error boundaries
      throw new Error('Failed to fetch books');
    }
  
    return res.json();
  }
  
interface Book {
    id: string;
    title: string;
    author: string;
    [key: string]: unknown; // For additional properties
}

export async function getBookById(id: string): Promise<Book | null> {
    const apiUrl = `${process.env.BACKEND_API_URL}/books/${id}`;
    
    const res = await fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 404) {
            return null;
        }
        throw new Error('Failed to fetch book');
    }

    return res.json();
}
  

export async function getAuthors(params = {}) {
    const apiUrl = `${process.env.BACKEND_API_URL}/authors`;
    
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  
    const queryString = searchParams.toString();
    const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch authors');
    }
  
    return res.json();
  }

  export async function getGenres(params = {}) {
    const apiUrl = `${process.env.BACKEND_API_URL}/genres`;
    
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  
    const queryString = searchParams.toString();
    const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }
  
    return res.json();
  }
  
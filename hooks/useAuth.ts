'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}


// src/lib/auth.js
import { jwtVerify } from 'jose';

export async function verifyAuth(token) {
  if (!token) {
    return null;
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
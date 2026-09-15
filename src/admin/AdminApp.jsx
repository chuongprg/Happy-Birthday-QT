import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import LoginScreen from './LoginScreen.jsx';
import AdminDashboard from './AdminDashboard.jsx';

export default function AdminApp() {
  const [user, setUser] = useState(undefined); // undefined = still checking, null = signed out

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return <div className="flex min-h-screen items-center justify-center font-body text-ink/50">Đang tải…</div>;
  }

  return user ? <AdminDashboard /> : <LoginScreen />;
}

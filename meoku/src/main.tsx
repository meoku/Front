import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/common/NotFoundPage.tsx';
import Admin from './pages/admin/Admin.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RecoilRoot } from 'recoil';
import LoginPage from './pages/Login/LoginPage.tsx';
import { isAdminCheckApi } from './api/userApi.ts';
import Loading from './components/common/Loading.tsx';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = sessionStorage.getItem('access_token');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await isAdminCheckApi();
        if (response === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        alert('관리자가 아닙니다.');
        window.location.href = '/login';
        console.error('관리자 여부 확인 실패:', err);
        setIsAdmin(false);
      }
    };
    if (token) {
      checkAdmin();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === null) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // {
  //   path: "/ex",
  //   element: <ExForm />,
  // },
]);
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});

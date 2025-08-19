import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/common/NotFoundPage.tsx';
import Admin from './pages/admin/Admin.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RecoilRoot } from 'recoil';
import LoginPage from './pages/Login/LoginPage.tsx';
import { isAdminCheckApi } from './api/userApi.ts';
import Loading from './components/common/Loading.tsx';
import Suggest from './pages/Suggest/SuggestMenu.tsx';
import SignUpPage from './pages/SignUp/SignUpPage.tsx';
import MainPage from './pages/Main/MainPage.tsx';
import OAuthCallback from './pages/Login/OAuthCallback.tsx';

function AuthRoute({ children }: { children: React.ReactElement }) {
  const token = sessionStorage.getItem('access_token');
  const location = useLocation();
  if (!token) {
    //sessionStroage 방식으로 로그인 후 이전 url로 돌아가게 처리
    sessionStorage.setItem('post_login_redirect', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }
  return children;
}

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
    children: [
      { path: '', element: <MainPage /> },
      {
        path: 'suggest',
        element: (
          <AuthRoute>
            <Suggest />
          </AuthRoute>
        ),
      },
    ],
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
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/oauth/callback',
    element: <OAuthCallback />,
  },
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

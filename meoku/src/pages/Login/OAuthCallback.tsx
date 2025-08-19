import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';

export default function OAuthCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const processTokens = () => {
      try {
        console.log('전체 쿠키:', document.cookie);

        const getCookie = (name: string): string | null => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
          return null;
        };

        const accessToken = getCookie('access_token');
        const refreshToken = getCookie('refresh_token');
        if (accessToken && refreshToken) {
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);

          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('토큰 처리 중 오류:', error);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(processTokens, 100);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Loading />
      </div>
    );
  }

  return null;
}

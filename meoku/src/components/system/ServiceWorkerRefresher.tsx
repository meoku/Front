// src/components/system/ServiceWorkerRefresher.tsx
import { useRegisterSW } from 'virtual:pwa-register';

export default function ServiceWorkerRefresher() {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      updateServiceWorker(true); // 새 버전 감지 시 자동 새로고침
    },
    onRegisteredSW(_: unknown, registration?: ServiceWorkerRegistration) {
      registration?.update(); // 앱 시작 시 바로 확인
      setInterval(
        () => {
          registration?.update();
        },
        5 * 60 * 1000,
      ); // 5분마다 새 버전 확인
    },
  });

  return null;
}

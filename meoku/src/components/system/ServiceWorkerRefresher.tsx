/**
 * [미사용] 2026-09-30 기준 이 파일을 import 하는 곳이 없다.
 *
 * main.tsx 가 registerSW 를 직접 호출하는 방식(main.tsx:18)으로 바뀌면서
 * 이 컴포넌트(useRegisterSW 훅 방식)는 쓰이지 않는다.
 *
 * 번들에도 포함되지 않는다. 다음 정리 때까지 쓸 일이 없으면 삭제할 것.
 */
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

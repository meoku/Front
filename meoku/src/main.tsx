import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import Admin from "./pages/admin/Admin.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  // {
  //   path: "/ex",
  //   element: <ExForm />,
  // },
]);
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

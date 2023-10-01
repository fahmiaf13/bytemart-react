import { useRoutes } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { Home } from "@/pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
  ]);
}

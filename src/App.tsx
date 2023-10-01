import Routes from "@/routes";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <Routes />
    </HelmetProvider>
  );
}

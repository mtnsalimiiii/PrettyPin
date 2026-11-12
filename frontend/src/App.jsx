import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
      <>
        <AppRoutes />
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "inherit" } }} />
      </>
  );
}

export default App;
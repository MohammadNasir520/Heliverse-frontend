import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <MainLayout></MainLayout>
      <Toaster />
    </div>
  );
}

export default App;

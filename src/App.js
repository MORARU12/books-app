import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksPage />} />
    </Routes>
  );
}

export default App;

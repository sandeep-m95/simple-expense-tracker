import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/index";
import ExpenseTracker from "./pages/expenseTracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

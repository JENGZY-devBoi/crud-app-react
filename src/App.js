import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import User from './User';
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
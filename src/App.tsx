import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/Auth.layout";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/Register.page";
import AppLayout from "./layout/App.Layout";
import EditProfile from "./features/user/components/EditProfile";
import CreatePost from "./features/user/components/CreatePost";

function App() {
  return (
    <>
      <Routes>
        {/* public route */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/add" element={<CreatePost />} />
        </Route>
        {/* private route */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

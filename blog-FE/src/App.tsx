import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import PrivateRoute from "./Components/Utils/PrivateRoute";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
function App() {
  return (
    <div>
      <Nav></Nav>
     
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/post/:_id" element={<Blog />}></Route>
          <Route path="/editpost/:_id" element={<EditPost />}></Route>
          <Route path="/post/create" element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

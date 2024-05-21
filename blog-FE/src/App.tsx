import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import LoggedOutPrivateRoute from "./Components/Utils/LoggedOutPrivateRoute";
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
import Register from "./Components/Register";
import LoggedInPrivateRoute from "./Components/Utils/LoggedInPrivateRoute";
function App() {
  return (
    <div>
      <Nav></Nav>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoggedOutPrivateRoute>
                <Home></Home>
              </LoggedOutPrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <LoggedInPrivateRoute>
                <Login />
              </LoggedInPrivateRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <LoggedInPrivateRoute>
                <Register />
              </LoggedInPrivateRoute>
            }
          ></Route>
          <Route
            path="/post/:_id"
            element={
              <LoggedOutPrivateRoute>
                <Blog />
              </LoggedOutPrivateRoute>
            }
          ></Route>
          <Route
            path="/editpost/:_id"
            element={
              <LoggedOutPrivateRoute>
                <EditPost />
              </LoggedOutPrivateRoute>
            }
          ></Route>
          <Route
            path="/post/create"
            element={
              <LoggedOutPrivateRoute>
                <CreatePost />
              </LoggedOutPrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

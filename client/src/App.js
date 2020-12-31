import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container, Header } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />

          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

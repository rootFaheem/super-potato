import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Fib from "./Fib";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to="/"> Home</Link>
          <br></br>
          <Link to="/not-found"> Not Found</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib}></Route>
          <Route exact path="/not-found" component={NotFound}></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;

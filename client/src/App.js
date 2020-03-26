import React from "react";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Fib from "./Fib";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Fibonacci series Calculator</h1>
          <hr></hr>
          <Link to="/">Home</Link>
          <br></br>
          <br></br>
          <Link to="/not-found">Some other page</Link>
          <hr></hr>
        </header>

        <Router>
          {/* <Route path="/" component={Fib}></Route> */}
          <Route path="/not-found" component={NotFound}></Route>
        </Router>
      </div>
    </Router>
  );
}

export default App;

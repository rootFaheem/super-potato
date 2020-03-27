import React from "react";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

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
          <Switch>
            <Route exact path="/" component={Fib}></Route>
            <Route exact path="/not-found" component={NotFound}></Route>
          </Switch>
        </Router>
      </div>
    </Router>
  );
}

export default App;

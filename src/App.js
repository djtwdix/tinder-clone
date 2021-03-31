import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card"
import SwipeButtons from "./components/SwipeButtons"
import Chats from "./components/Chats"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
          <Header backButton="/"/>
            <Chats />
          </Route>
          <Route path="/">
          <Header />
            <Card />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


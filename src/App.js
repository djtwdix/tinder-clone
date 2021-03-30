import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <Switch>
        <Route path="/chat">

        </Route>
        <Route path="/">

        </Route>

      </Switch>

      </Router>
    </div>
  );
}

export default App;

{/* header */}
{/* card */}
{/* buttons */}

{/* chat screen */}
{/* individual chat screen */}
{/* profile screen */}
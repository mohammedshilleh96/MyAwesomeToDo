import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

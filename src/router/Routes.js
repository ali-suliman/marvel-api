import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../views/Home"
import Character from "../views/Character"
import Characters from "../views/Characters"

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/character" component={Character} />
      <Route path="/characters" component={Characters} />
    </Switch>
  </Router>
)

export default Routes

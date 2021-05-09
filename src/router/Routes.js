import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../views/Home/Home"
import Character from "../views/Character/Character"
import Characters from "../views/Characters/Characters"

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

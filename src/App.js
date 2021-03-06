import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import BudgetPageContainer from "./components/containers/budgetPageContainer";
import DashboardContainer from "./components/containers/dashboardContainer";
import { BudgetProvider } from "./context/budgetProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                The BakerBudget
              </Navbar.Brand>
            </Container>
          </Navbar>
        </header>
        <main>
          <Switch>
            <Route path="/budgets/:id">
              <BudgetProvider>
                <BudgetPageContainer />
              </BudgetProvider>
            </Route>
            <Route path="/">
              <DashboardContainer />
            </Route>
          </Switch>
        </main>
        <footer className="bg-dark">
          <Container>
            <p>This is the BakerBudget Footer. Gotta love it!</p>
          </Container>
        </footer>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import BudgetList from "../budgetList";
import NewBudgetModal from "../modals/newBudgetModal";

const DashboardContainer = () => {
  const [loading, setLoading] = useState(true);
  const [newestBudget, setNewestBudget] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const defaultBudget = {
    title: "",
    description: "",
    categories: [
      {
        title: "Income",
        description: "Money entering",
        isExpense: false,
        target: 0,
      },
      {
        title: "Expense",
        description: "Money exiting",
        isExpense: true,
        target: 0,
      },
    ],
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/budgets")
      .then((result) => {
        setBudgets(result.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError("ERROR LOADING BUDGETS");
        }
      })
      .finally(() => setLoading(false));
  }, [newestBudget]);

  const addBudget = (budgetData) => {
    setShowModal(false);
    axios
      .post("http://localhost:5000/api/budgets", {
        ...defaultBudget,
        title: budgetData.title,
        description: budgetData.description,
      })
      .then((response) => {
        setLoading(true);
        setNewestBudget(response);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError("ERROR ADDING BUDGET");
        }
      });
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h2 className="float-start">Budgets</h2>
        </Col>
        <Col>
          <Button
            className="float-end"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            Add Budget
          </Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <BudgetList budgets={budgets} />
      )}
      <NewBudgetModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        submit={addBudget}
        base={defaultBudget}
        modalTitle="Add Budget"
        reset
      >
        <p className="mb-3 text-muted">
          Your budget will have an &quot;Income&quot; and &quot;Expense&quot;
          category by default. Additional categories can be added/deleted in the
          individual budget page after it&apos;s created.
        </p>
      </NewBudgetModal>
      <Row>
        <h4>TODOList for MVP</h4>
        <ul>
          <li>Tests</li>
          <ul>
            <li>Unit test backend</li>
            <ul>
              <li>Create controller layer for middle logic and unit test it.</li>
              <li>Clean out unused endpoints</li>
            </ul>
            <li>Unit test frontend</li>
            <li>Coverage for both</li>
            <li>Integ tests?</li>
          </ul>
          <li>Graphs on the report (chart js integration)</li>
          <ul>
            <li>Bar graphs of income vs expenses</li>
            <li>Bar graphs actuals vs expected</li>
            <li>Pie graph of category compositions expected and actual</li>
          </ul>
          <li>
            Color-coding of categories where you&apos;ve overspent,
            under-received
          </li>
          <li>Templates</li>
          <ul>
            <li>Backend change to mark budget as template</li>
            <li>Backend changet to block transaction creation on templates</li>
            <li>Create budget modal, create from template (hard coded)</li>
            <li>View templates section</li>
            <li>View/create template page</li>
            <li>Create template from existing budget.</li>
          </ul>
          <li>Create production build and bundle into express server</li>
          <ul>
            <li>Yarn build</li>
            <li>Express route to serve the files</li>
            <li>Proper build command to automate bundling and exporting to right destination</li>
            <li>Some way to export the pure express server without all the react app node modules</li>
          </ul>
          <li>Host on RPi</li>
        </ul>
        <h4>TODOList for Stretch goals</h4>
        <ul>
          <li>Table sorting (alphabetical, by date, by amount)</li>
          <li>Website dark mode (sass?)</li>
          <li>New website favicon</li>
          <li>Bulk transaction adding.</li>
          <li>
            Line chart comparison of different budgets (incl specify as monthly)
          </li>
          <li>Intelligent parsing of bank statements to add expenses</li>
          <li>SSL</li>
          <li>Different users with a login system of some kind</li>
        </ul>
      </Row>
    </Container>
  );
};

export default DashboardContainer;

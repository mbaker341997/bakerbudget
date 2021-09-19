import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import BudgetList from '../budgetList';
import NewBudgetModal from '../modals/newBudgetModal';

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
        target: 0
      },
      {
        title: "Expense",
        description: "Money exiting",
        isExpense: true,
        target: 0
      }
    ] 
  };

  useEffect(() => {
    axios.get('http://localhost:5000/budgets')
      .then(result => {
        setBudgets(result.data);
      })
      .catch(err => {
        if(err.response) {
          setError(err.response.data);
        } else {
          setError('ERROR LOADING BUDGETS');
        }
      })
      .finally(() => setLoading(false));
  }, [newestBudget]);

  const addBudget = (budgetData) => {
    setShowModal(false);
    axios.post('http://localhost:5000/budgets', {
      ...defaultBudget,
      title: budgetData.title,
      description: budgetData.description
    })
      .then(response => {
        setLoading(true);
        setNewestBudget(response)
      })
      .catch(err => {
        if(err.response) {
          setError(err.response.data);
        } else {
          setError('ERROR ADDING BUDGET');
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
          <Button className="float-end" variant="primary" onClick={() => setShowModal(true)}>Add Budget</Button>
        </Col>
      </Row>
      { error && <Alert variant="danger">{error}</Alert> }
      { 
        loading ? 
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner> : <BudgetList budgets={budgets}/>
      }
      <NewBudgetModal
        showModal={showModal} 
        handleClose={() => setShowModal(false)} 
        submit={addBudget}
        base={defaultBudget}
        modalTitle="Add Budget"
        reset
      >
        <p className="mb-3 text-muted">
          Your budget will have an "Income" and "Expense" category by default. 
          Additional categories can be added/deleted in the individual budget page
          after it's created.
        </p>
      </NewBudgetModal>
      <Row>
        <h4>TODOList for MVP</h4>
        <ul>
          <li>Have react in a client directory with the backend being top-level</li>
          <li>Tests</li>
          <ul>
            <li>Unit test backend</li>
            <li>Unit test frontend</li>
            <li>Coverage for both</li>
            <li>Integ tests?</li>
          </ul>
          <li>Linter</li>
          <li>Prettifier</li>
          <li>Graphs on the report (chart js integration)</li>
          <ul>
            <li>Bar graphs of income vs actual</li>
            <li>Bar graphs actuals vs expected</li>
            <li>Pie graph of category compositions expected and actual</li>
          </ul>
          <li>Color-coding of categories where you've overspent, under-received</li>
          <li>Summaries of budget performance on the card view</li>
          <li>Hard-coded budget templates</li>
          <li>CRUD the templates on the backend</li>
          <li>Templates page/view</li>
          <li>Create template from budget</li>
          <li>Host on RPi</li>
        </ul>
        <h4>TODOList for Stretch goals</h4>
        <ul>
          <li>Table sorting (alphabetical, by date, by amount)</li>
          <li>Website dark mode (sass?)</li>
          <li>New website favicon</li>
          <li>Bulk transaction adding.</li>
          <li>Line chart comparison of different budgets (incl specify as monthly)</li>
          <li>Intelligent parsing of bank statements to add expenses</li>
          <li>SSL</li>
          <li>Different users with a login system of some kind</li>
        </ul>
      </Row>
    </Container>
  )
};

export default DashboardContainer;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import BudgetList from '../components/budgetList';
import NewBudgetModal from '../components/newBudgetModal';

const DashboardContainer = () => {
  const [loading, setLoading] = useState(true);
  const [newestBudget, setNewestBudget] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  // TODO: error handling
  useEffect(() => {
    axios.get('http://localhost:5000/budgets')
      .then(result => {
        setBudgets(result.data);
        setLoading(false);
    })
  }, [newestBudget]);

  const handleAddBudgetClick = () => {
    setShowModal(true);
  };

  const handleCloseAddBudget = () => {
    setShowModal(false);
  };

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
        alert('Error occurred when adding budget!');
        console.log(`${err}`);
      });
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h2 className="float-start">Budgets</h2>
        </Col>
        <Col>
          <Button className="float-end" variant="primary" onClick={handleAddBudgetClick}>Add Budget</Button>
        </Col>
      </Row>
      { 
        loading ? 
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner> : <BudgetList budgets={budgets}/>
      }
      <NewBudgetModal 
        showModal={showModal} 
        handleClose={handleCloseAddBudget} 
        submitBudget={addBudget}
        baseBudget={defaultBudget}
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
          <li>UD APIs in backend for categories</li>
          <li>Modify category</li>
          <li>Delete category</li>
          <li>Error handling (404s, 500s, etc)</li>
          <li>Logging middleware on the backend</li>
          <li>Fontawesome icons</li>
          <li>CLean up totals summary, make it look good</li>
          <li>Consolidations, get the project structure down</li>
          <li>Tests</li>  
          <li>Switch it around to host on heroku (or just with a run script)</li>
        </ul>
        <h4>TODOList for Stretch goals</h4>
        <ul>
          <li>Add/edit icons on the card view of the budget</li>
          <li>Color-coding of categories where you've overspent, under-received</li>
          <li>Website dark mode</li>
          <li>Summaries of budget performance on the card view</li>
          <li>Hard-coded budget templates</li>
          <li>CRUD the templates on the backend</li>
          <li>Graphs on the report</li>
          <li>Intelligent parsing of bank statements to add expenses</li>
          <li>Different users with a login system of some kind</li>
          <li>Bulk transaction adding.</li>
          <li>SSL?</li>
        </ul>
      </Row>
    </Container>
  )
};

export default DashboardContainer;
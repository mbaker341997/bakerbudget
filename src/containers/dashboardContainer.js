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

  const addBudget = (newBudget) => {
    setShowModal(false);
    axios.post('http://localhost:5000/budgets', newBudget)
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
        handleCloseAddBudget={handleCloseAddBudget} 
        addBudget={addBudget}
      />
      <Row>
        <h4>TODOList for MVP</h4>
        <ul>
          <li>Modify budget (text and description only)</li>
          <li>Add transaction</li>
          <li>Modify transaction</li>
          <li>Delete transaction</li>
          <li>Add category</li>
          <li>Modify category</li>
          <li>Delete category</li>
        </ul>
      </Row>
    </Container>
  )
};

export default DashboardContainer;
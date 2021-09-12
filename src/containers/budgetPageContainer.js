import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BudgetPage from '../components/budgetPage';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'

const BudgetPageContainer = () => {
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState({});
  const { id } = useParams();

  // TODO: error handling 
  useEffect(() => {
    axios.get(`http://localhost:5000/budgets/${id}/report`).then(result => {
      setBudget(result.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <Container>
      { loading ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> : 
        <BudgetPage budget={budget}/> }
    </Container>
  )
};

export default BudgetPageContainer;
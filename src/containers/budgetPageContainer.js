import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BudgetTables from '../components/budgetTables';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import DeleteModal from '../components/deleteModal';
import NewBudgetModal from '../components/newBudgetModal';
import { BudgetContext } from '../context/budgetProvider';
import { deleteBudgetAction, editBudgetAction, fetchBudgetAction } from '../context/budgetActions';
import { CURRENCY_FORMATTER } from '../constants';

const BudgetPageContainer = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { id } = useParams();
  const { budgetState, budgetDispatch } = useContext(BudgetContext);

  const deleteBudget = () => {
    setShowDelete(false);
    deleteBudgetAction(id, budgetDispatch);
  }

  const editBudget = (budgetData) => {
    setShowEdit(false);
    editBudgetAction(id, budgetData, budgetDispatch);
  };

  useEffect(() => {
    fetchBudgetAction(id, budgetDispatch);
  }, [id, budgetDispatch]);

  return (
    <Container>
      { budgetState.error && <Alert variant="danger">{budgetState.error}</Alert> }
      { budgetState.loading ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> :
        budgetState.budget && 
          <Container>
            <Row>
              <Col><h1>{budgetState.budget.title}</h1></Col>  
              <Col>
                <div className="float-end">   
                  <Button variant="primary" onClick={() => setShowEdit(true)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => setShowDelete(true)}>Delete</Button>
                </div>
              </Col>      
            </Row>
            <Row>
              <Container> 
                <p>{budgetState.budget.description}</p>
                <ul>
                  <li>Total Income: {CURRENCY_FORMATTER.format(budgetState.budget.incomeTotal)}</li>
                  <li>Total Expenses: {CURRENCY_FORMATTER.format(budgetState.budget.expenseTotal)}</li>
                  <li>Total Savings: {CURRENCY_FORMATTER.format(budgetState.budget.incomeTotal - budgetState.budget.expenseTotal)}{' '} 
                  vs target of {CURRENCY_FORMATTER.format(budgetState.budget.incomeTarget - budgetState.budget.expenseTarget)} </li>
                </ul>
              </Container>
              <hr />
            </Row>
            <BudgetTables budget={budgetState.budget} dispatch={budgetDispatch} />
            <DeleteModal
              show={showDelete}
              close={() => setShowDelete(false)}
              deleteAction={deleteBudget}
              title={budgetState.budget.title}
              body="Are you sure you want to delete this budget? Action cannot be undone."
            />
            <NewBudgetModal
              showModal={showEdit} 
              handleClose={() => setShowEdit(false)} 
              submit={editBudget}
              base={budgetState.budget}
              modalTitle="Edit Budget"
            />
          </Container>
      }
    </Container>
  )
};

export default BudgetPageContainer;
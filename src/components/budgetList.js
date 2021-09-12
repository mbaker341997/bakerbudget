import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const BudgetList = ({ budgets }) => {
  return (
    <Row xs={2} md={3}>
      {
        budgets.map(budget => {
          return (
            <Col className="mb-3" key={budget._id}>
              <Card>
                <Card.Body>
                  <Card.Title><Link to={`/${budget._id}`}>{budget.title}</Link></Card.Title>
                  <Card.Text>{budget.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
};

export default BudgetList;
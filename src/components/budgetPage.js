import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CategoryTable from './categoryTable';
import TransactionTable from './transactionTable';


const BudgetPage = ({ budget }) => {
  return (
    <Container>
      <Row>      
        <h1>{budget.title}</h1>
        <p>{budget.description}</p>
        <p>Total Income: {budget.incomeTotal}</p>
        <p>Total Expenses: {budget.expenseTotal}</p>
        <p>Total Savings: {budget.netSavings} vs target of {budget.netTarget}</p>
        <hr />
      </Row>
      <Row>
        <h2>Incomes</h2>
        <CategoryTable 
          categories={budget.incomeCategories} 
          targetTotal={budget.incomeTarget} 
          actualTotal={budget.incomeTotal} 
          diffTotal={budget.incomeTarget - budget.incomeTotal}
        />
        <TransactionTable transactions={budget.incomeTransactions}/>
      </Row>
      <Row>
        <h2>Expenses</h2>
        <CategoryTable 
          categories={budget.expenseCategories} 
          targetTotal={budget.expenseTarget} 
          actualTotal={budget.expenseTotal} 
          diffTotal={budget.expenseTarget - budget.expenseTotal}
        />
        <TransactionTable transactions={budget.expenseTransactions}/>  
      </Row>
    </Container>
  )
};

export default BudgetPage;
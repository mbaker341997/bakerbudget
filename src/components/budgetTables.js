import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CategoryTable from './categoryTable';
import TransactionTable from './transactionTable';


const BudgetTables = ({ budget }) => {
  return (
    <Container>
      <Row>
        <h2>Incomes</h2>
        <CategoryTable 
          categories={budget.incomeCategories} 
          targetTotal={budget.incomeTarget} 
          actualTotal={budget.incomeTotal} 
          diffTotal={budget.incomeTarget - budget.incomeTotal}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={budget.incomeCategories}
          transactions={budget.incomeTransactions}
        />
      </Row>
      <Row>
        <h2>Expenses</h2>
        <CategoryTable 
          categories={budget.expenseCategories} 
          targetTotal={budget.expenseTarget} 
          actualTotal={budget.expenseTotal} 
          diffTotal={budget.expenseTarget - budget.expenseTotal}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={budget.expenseCategories}
          transactions={budget.expenseTransactions}
        />  
      </Row>
    </Container>
  )
};

export default BudgetTables;
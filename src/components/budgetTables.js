import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CategoryTable from './categoryTable';
import TransactionTable from './transactionTable';


const BudgetTables = ({ budget, dispatch }) => {
  return (
    <Container>
      <Row>
        <h2>Incomes</h2>
        <CategoryTable 
          categories={budget.incomeCategories} 
          targetTotal={budget.incomeTarget} 
          actualTotal={budget.incomeTotal} 
          diffTotal={budget.incomeTotal - budget.incomeTarget}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={budget.incomeCategories}
          transactions={budget.incomeTransactions}
          isExpense={false}
          dispatch={dispatch}
        />
      </Row>
      <Row>
        <h2>Expenses</h2>
        <CategoryTable 
          categories={budget.expenseCategories} 
          targetTotal={budget.expenseTarget} 
          actualTotal={budget.expenseTotal} 
          diffTotal={budget.expenseTotal - budget.expenseTarget}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={budget.expenseCategories}
          transactions={budget.expenseTransactions}
          isExpense={true}
          dispatch={dispatch}
        />  
      </Row>
    </Container>
  )
};

export default BudgetTables;
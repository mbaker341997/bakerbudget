import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CategoryTable from '../tables/categoryTable';
import TransactionTable from '../tables/transactionTable';

// TODO: probably will divide this into two once we start adding graphs
const BudgetTablesContainer = ({ budget, dispatch }) => {
  const filterCategoriesByIsExpense = (isExpense) => budget.categories.filter(category => category.isExpense === isExpense);
  const filterTransactionsByIsExpense = (isExpense) => budget.transactions.filter(transaction => transaction.isExpense === isExpense);

  return (
    <Container>
      <Row>
        <h2>Incomes</h2>
        <CategoryTable
          budgetId={budget._id} 
          categories={filterCategoriesByIsExpense(false)}
          isExpense={false} 
          targetTotal={budget.incomeTarget} 
          actualTotal={budget.incomeTotal} 
          diffTotal={budget.incomeTotal - budget.incomeTarget}
          dispatch={dispatch}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={filterCategoriesByIsExpense(false)}
          transactions={filterTransactionsByIsExpense(false)}
          dispatch={dispatch}
        />
      </Row>
      <Row>
        <h2>Expenses</h2>
        <CategoryTable 
          budgetId={budget._id}
          categories={filterCategoriesByIsExpense(true)}
          isExpense={true} 
          targetTotal={budget.expenseTarget} 
          actualTotal={budget.expenseTotal} 
          diffTotal={budget.expenseTotal - budget.expenseTarget}
          dispatch={dispatch}
        />
        <TransactionTable 
          budgetId={budget._id} 
          categories={filterCategoriesByIsExpense(true)}
          transactions={filterTransactionsByIsExpense(true)}
          dispatch={dispatch}
        />  
      </Row>
    </Container>
  )
};

export default BudgetTablesContainer;
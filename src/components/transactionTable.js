import NewTransactionModal from './newTransactionModal';
import { addTransactionAction, deleteTransactionAction, editTransactionAction } from '../context/budgetActions';
import { CURRENCY_FORMATTER } from '../constants';
import ItemTable from './itemTable';

const TransactionTable = ({ budgetId, categories, transactions, dispatch }) => {
  const generateTransactionRow = (transaction, onClick) => {
    return (
      <tr key={transaction._id} id={transaction._id} onClick={onClick}>
        <td>{transaction.title}</td>
        <td>{transaction.categoryName}</td>
        <td>{transaction.date.split('T')[0]}</td>
        <td>{CURRENCY_FORMATTER.format(transaction.amount)}</td>
        <td>{transaction.description}</td>
      </tr>
    )
  };

  // wrapper arround NewTransactionModal so that we can add the categories
  // since base modal contract doesn't accept more than base data
  const transactionModalWrapper = (props) => {
    return (
      <NewTransactionModal {...props} categories={categories} />
    )
  };

  return (
    <>
      <ItemTable 
        title="Transactions"
        headerRow={
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>  
        }
        generateRowFunc={generateTransactionRow}
        data={transactions}
        itemName="Transaction"
        deleteItem={(transaction_id) => deleteTransactionAction(transaction_id, dispatch)}
        addItem={(formData) => addTransactionAction({ ...formData, budgetId }, dispatch)}
        editItem={(transaction_id, formData) => editTransactionAction(transaction_id, budgetId, formData, dispatch)}
        baseItem={{
          title: "",
          description: "",
          amount: "",
          budgetId: budgetId,
          categoryId: categories[0] ? categories[0]._id : "",
          date: ""
        }}
        AddModal={transactionModalWrapper}
      />
    </>
  )
}

export default TransactionTable;
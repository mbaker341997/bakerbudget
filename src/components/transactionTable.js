import Table from 'react-bootstrap/Table';

const TransactionTable = ({ transactions }) => {
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleString('en-US', { dateStyle: 'medium'});
  }

  return (
    <div>
      <h3>Transactions</h3>
      <Table>
        <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Category
            </th>
            <th>
              Date
            </th>
            <th>
              Amount
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map(transaction => {
              return (
                <tr key={transaction._id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.categoryName}</td>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default TransactionTable;
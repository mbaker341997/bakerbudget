import Table from 'react-bootstrap/Table';

const CategoryTable = ({ categories, targetTotal, actualTotal, diffTotal }) => {
  return (
    <div>
      <h3>Categories</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Description
            </th>
            <th>
              Target
            </th>
            <th>
              Actual
            </th>
            <th>
              Diff
            </th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map(category => {
              return (
                <tr key={category._id} id={category._id}>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>${category.target}</td>
                  <td>${category.actual}</td>
                  <td>${category.actual - category.target}</td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <th>Total</th>
            <td>${targetTotal}</td>
            <td>${actualTotal}</td>
            <td>${diffTotal}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

export default CategoryTable;
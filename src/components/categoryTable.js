import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NewCategoryModal from './newCategoryModal';
import DeleteModal from './deleteModal';
import { SELECTED_CLASSNAME } from '../constants';
import { addCategoryAction } from '../context/budgetActions';

const CategoryTable = ({ budgetId, categories, isExpense, targetTotal, actualTotal, diffTotal, dispatch }) => {
  const baseCategory = {
    title: "",
    description: "",
    target: ""
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
  };

  const submitCategory = (formData) => {
    setShowAddModal(false);
    addCategoryAction(budgetId, { ...formData, isExpense }, dispatch);
  };

  const handleShowDelete = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const deleteCategory = () => {
    console.log(`deleting category: ${selectedItem.title}`);
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  // TODO: this is repeated from TransactionTable, but i'm not smart enough to consolidate yet
  const clickCategory = (event) => {
    // note: currentTarget has the actual event listener on it, so it's how we get the row
    const clickedId = event.currentTarget.id;
    if(!selectedRow || selectedRow !== clickedId) {
      if (selectedRow) {
        document.getElementById(selectedRow).classList.remove(SELECTED_CLASSNAME);
      }
      setSelectedRow(clickedId);
      document.getElementById(clickedId).className = SELECTED_CLASSNAME;
      setSelectedItem(categories.find(category => category._id === clickedId));
    } else if (selectedRow === clickedId) {
      document.getElementById(selectedRow).classList.remove(SELECTED_CLASSNAME)
      setSelectedRow(null);
    }
  }

  return (
    <div>
      <Row className="justify-content-left">
        <Col md="auto">
          <h3>Categories</h3>
        </Col>
        <Col md="auto">
          <Button variant="outline-primary" onClick={handleShowAdd}><b>+</b></Button>
        </Col>
        { 
          selectedRow &&
          <> 
            <Col md="auto">
              <Button variant="primary" onClick={handleShowAdd}>Edit</Button>
            </Col>
            <Col md="auto">
              <Button variant="danger" onClick={handleShowDelete}>Delete</Button>
            </Col>
          </>        
        }
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Target</th>
            <th>Actual</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map(category => {
              return (
                <tr key={category._id} id={category._id} onClick={clickCategory}>
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
      <NewCategoryModal
        showModal={showAddModal}
        handleClose={handleCloseAdd}
        submitCategory={submitCategory}
        baseCategory={baseCategory}
        modalTitle="Add Category"
        reset
      />
      <DeleteModal
        show={showDeleteModal}
        close={handleCloseDelete}
        deleteAction={deleteCategory}
        title={selectedItem ? selectedItem.title : ""}
        body="Are you sure you want to delete this category? Action cannot be undone."
      />
    </div>
  )
}

export default CategoryTable;
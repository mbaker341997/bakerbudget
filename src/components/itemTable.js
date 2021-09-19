import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DeleteModal from './deleteModal';
import { SELECTED_CLASSNAME } from '../constants';

const ItemTable = ({
  title,
  headerRow, 
  generateRowFunc,
  footerRow,
  data,
  itemName,
  deleteItem,
  addItem,
  editItem,
  baseItem,
  AddModal
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(null);

  const handleSubmitAdd = (formData) => {
    console.log("submitting add with form data: " + formData);
    setShowAddModal(false);
    addItem(formData);
  }

  const handleSubmitEditModal = (formData) => {
    setEditModal(null);
    editItem(selectedItem._id, formData);
  }

  const handleShowEdit = () => {
    // item changes dynamically so we can't just switch it on with a flag
    setEditModal(
      <AddModal
        showModal={true}
        handleClose={() => setEditModal(null)}
        submit={handleSubmitEditModal}
        base={selectedItem}
        modalTitle={`Edit ${itemName}`}
      />
    );
  };

  const deleteAction = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
    deleteItem(selectedItem._id);
  }

  const clickItem = (event) => {
    // note: currentTarget has the actual event listener on it, so it's how we get the row
    const clickedId = event.currentTarget.id;
    if(!selectedItem || selectedItem._id !== clickedId) {
      if (selectedItem) {
        document.getElementById(selectedItem._id).classList.remove(SELECTED_CLASSNAME);
      }
      document.getElementById(clickedId).className = SELECTED_CLASSNAME;
      setSelectedItem(data.find(item => item._id === clickedId));
    } else if (selectedItem._id === clickedId) {
      document.getElementById(selectedItem._id).classList.remove(SELECTED_CLASSNAME)
      setSelectedItem(null);
    }
  }

  const generateClickableRow = (item) => generateRowFunc(item, clickItem);

  return (
    <>
      <Row className="justify-content-left">
        <Col md="auto">
          <h3>{ title }</h3>
        </Col>
        <Col md="auto">
          <Button variant="outline-primary" onClick={() => setShowAddModal(true)}><FontAwesomeIcon icon={faPlus}/></Button>
        </Col>
        { 
          selectedItem &&
          <> 
            <Col md="auto">
              <Button variant="primary" onClick={handleShowEdit}>Edit</Button>
            </Col>
            <Col md="auto">
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
            </Col>
          </>        
        }
      </Row>
      <Table bordered hover>
        <thead>
          { headerRow }
        </thead>
        <tbody>
          { data.map(item => generateClickableRow(item)) }
        </tbody>
        <tfoot>
          { footerRow }
        </tfoot>
      </Table>
      { <AddModal
          showModal={showAddModal}
          handleClose={() => setShowAddModal(false)}
          submit={handleSubmitAdd}
          base={baseItem}
          modalTitle={`Add ${itemName}`}
          reset
        /> 
      }
      { editModal }
      <DeleteModal
        show={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        deleteAction={deleteAction}
        title={selectedItem ? selectedItem.title : ""}
        body={`Are you sure you want to delete this ${itemName.toLowerCase()}? Action cannot be undone.`}
      />
    </>
  )
};

export default ItemTable;
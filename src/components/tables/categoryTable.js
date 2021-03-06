import React from "react";
import { CURRENCY_FORMATTER } from "../../constants/formatters";
import {
  addCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
} from "../../context/budgetActions";
import ItemTable from "./itemTable";
import NewCategoryModal from "../modals/newCategoryModal";

const CategoryTable = ({
  budgetId,
  categories,
  isExpense,
  targetTotal,
  actualTotal,
  diffTotal,
  dispatch,
}) => {
  const generateCategoryRow = (category, onClick) => {
    return (
      <tr key={category._id} id={category._id} onClick={onClick}>
        <td>{category.title}</td>
        <td>{category.description}</td>
        <td>{CURRENCY_FORMATTER.format(category.target)}</td>
        <td>{CURRENCY_FORMATTER.format(category.actual)}</td>
        <td>{CURRENCY_FORMATTER.format(category.actual - category.target)}</td>
      </tr>
    );
  };

  return (
    <>
      <ItemTable
        title="Categories"
        headerRow={
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Target</th>
            <th>Actual</th>
            <th>Diff</th>
          </tr>
        }
        generateRowFunc={generateCategoryRow}
        footerRow={
          <tr>
            <td></td>
            <th>Total</th>
            <td>{CURRENCY_FORMATTER.format(targetTotal)}</td>
            <td>{CURRENCY_FORMATTER.format(actualTotal)}</td>
            <td>{CURRENCY_FORMATTER.format(diffTotal)}</td>
          </tr>
        }
        data={categories}
        itemName="Category"
        deleteItem={(categoryId) =>
          deleteCategoryAction(categoryId, budgetId, dispatch)
        }
        addItem={(formData) =>
          addCategoryAction(budgetId, { ...formData, isExpense }, dispatch)
        }
        editItem={(categoryId, formData) =>
          editCategoryAction(categoryId, budgetId, formData, dispatch)
        }
        baseItem={{
          title: "",
          description: "",
          target: "",
        }}
        AddModal={NewCategoryModal}
      />
    </>
  );
};

export default CategoryTable;

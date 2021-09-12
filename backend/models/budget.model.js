const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaNames = require('./schema-names');
const Transaction = require('./transaction.model');

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  }, 
  description: {
    type: String
  },
  isExpense: {
    type: Boolean,
    required: true,
    default: false
  },
  target: {
    type: Number,
    required: true,
    default: 0
  }
});

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  }, 
  description: {
    type: String,
  },
  categories: [categorySchema],
}, {
  timestamps: true
})

budgetSchema.post('findOneAndDelete', function(doc) {
  if (doc != null) {
    Transaction.deleteMany({ budgetId: doc._id })
      .then(() => console.log(`Deleted all transactions for budget: ${doc._id}`))
      .catch(err => console.log(`Error deleting transactions for budget: ${doc._id}\n${err.toString()}`));
  }
});

const Budget = mongoose.model(SchemaNames.BUDGET_SCHEMA_NAME, budgetSchema);

module.exports = Budget;
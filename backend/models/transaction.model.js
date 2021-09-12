const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaNames = require('./schema-names');

const transactionSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  }, 
  description: {
    type: String,
    required: true,
    minlength: 3
  },
  amount: {
    type: Number,
    required: true
  },
  budgetId: {
    type: Schema.Types.ObjectId,
    ref: SchemaNames.BUDGET_SCHEMA_NAME, 
    required: true,
    index: true
  },
  categoryId: {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }  
}, {
  timestamps: true
})

// note: for some reason the "this" reference only works with old-style syntax
transactionSchema.pre('save', function(next) {
  const Budget = require('./budget.model'); // imported here to prevent a circular dependency
  Budget.findById(this.budgetId)
    .then(budget => { 
      if(budget) {
        if(budget.categories.id(this.categoryId) != null) {
          next();
        } else {
          throw new Error(`Category not found, id: ${this.categoryId}`);
        }
      } else {
        throw new Error(`Budget not found, id: ${this.budgetId}`);
      }
    })
    .catch(err => {
      throw err;
    });
});

const Transaction = mongoose.model(SchemaNames.TRANSACTION_SCHEMA_NAME, transactionSchema);

module.exports = Transaction;
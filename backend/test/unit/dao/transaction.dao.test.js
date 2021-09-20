const chai = require('chai');
chai.use(require("chai-as-promised"));
chai.should();
const sandbox = require('sinon').createSandbox();
const Transaction = require("../../../models/transaction.model");
const transactionDao = require("../../../dao/transaction.dao");
const testBudgets = require("../../constants/test-budgets");
const testTransactions = require("../../constants/test-transactions");

describe('Transaction DAO', async () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('getTransactionsForBudget', async () => {
    it('should return all transactions for budget', async () => {
      sandbox.stub(Transaction, 'find').withArgs({ budgetId: testBudgets.budgetArray[0]._id}).returns({
        lean: sandbox.stub().resolves(testTransactions.transactionArray)
      });
      return transactionDao
        .getTransactionsForBudget(testBudgets.budgetArray[0]._id)
        .should.eventually.equal(testTransactions.transactionArray);
    });

    it('should throw an error', async () => {
      sandbox.stub(Transaction, 'find').withArgs({ budgetId: testBudgets.budgetArray[0]._id}).returns({
        lean: sandbox.stub().rejects("New Error")
      });
      return transactionDao.getTransactionsForBudget(testBudgets.budgetArray[0]._id).should.be.rejected;
    });
  });

  describe('getTransactionsForCategory', async () => {
    it('should return all transactions for budget', async () => {
      sandbox.stub(Transaction, 'find')
        .withArgs({ categoryId: testTransactions.transactionArray[0].categoryId }).returns({
          lean: sandbox.stub().resolves(testTransactions.transactionArray)
        });
      return transactionDao
        .getTransactionsForCategory(testTransactions.transactionArray[0].categoryId)
        .should.eventually.equal(testTransactions.transactionArray);
    });

    it('should throw an error', async () => {
      sandbox.stub(Transaction, 'find')
        .withArgs({ categoryId: testTransactions.transactionArray[0].categoryId }).returns({
          lean: sandbox.stub().rejects("New Error")
        });
      return transactionDao
        .getTransactionsForCategory(testTransactions.transactionArray[0].categoryId)
        .should.be.rejected;
    });
  });

  describe('saveTransaction', async () => {
    it('should save transaction', async () => {
      sandbox.stub(Transaction.prototype, 'save').resolves(testTransactions.transactionArray[0]);
      return transactionDao.saveTransaction(new Transaction(testTransactions.transactionNoId))
        .should.eventually.eql(testTransactions.transactionArray[0]._id);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Transaction.prototype, 'save').rejects("New Error");
      return transactionDao.saveTransaction(new Transaction(testTransactions.transactionNoId))
        .should.be.rejected;
    });
  });

  describe('deleteTransaction', async () => {
    it('should delete transaction', async () => {
      const testId = testTransactions.transactionArray[0]._id;
      sandbox.stub(Transaction, 'findByIdAndDelete').withArgs(testId).resolves();
      return transactionDao.deleteTransaction(testId).should.eventually.equal(testId);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Transaction, 'findByIdAndDelete').rejects("New Error");
      return transactionDao.deleteTransaction("foo").should.be.rejected;
    });
  });

  describe('updateTransaction', async () => {
    it('should update transaction', async () => {
      const testId = testTransactions.transactionArray[0]._id;
      const newTransactionInfo = {
        title: "foo"
      };
      sandbox.stub(Transaction, 'findByIdAndUpdate').withArgs(testId, newTransactionInfo).resolves({
        ...testTransactions.transactionArray[0],
        title: "foo"
      });
      return transactionDao.updateTransaction(testId, newTransactionInfo).should.eventually.eql({
        ...testTransactions.transactionArray[0],
        title: "foo"
      });
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Transaction, 'findByIdAndUpdate').rejects("New Error");
      return transactionDao.updateTransaction("foo", {}).should.be.rejected;
    });
  });

  describe('deleteTransactionsForBudget', async () => {
    it('should delete all transactions for budget', async () => {
      sandbox.stub(Transaction, 'deleteMany').withArgs({ budgetId: testBudgets.budgetArray[0]._id }).resolves();
      return transactionDao
        .deleteTransactionsForBudget(testBudgets.budgetArray[0]._id)
        .should.eventually.equal(testBudgets.budgetArray[0]._id);
    });

    it('should throw an error', async () => {
      sandbox.stub(Transaction, 'deleteMany').withArgs({ budgetId: testBudgets.budgetArray[0]._id}).rejects("New Error");
      return transactionDao.deleteTransactionsForBudget(testBudgets.budgetArray[0]._id).should.be.rejected;
    });
  });
});

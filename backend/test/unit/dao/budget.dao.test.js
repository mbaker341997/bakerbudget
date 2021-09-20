const chai = require('chai');
chai.use(require("chai-as-promised"));
chai.should();
const sandbox = require('sinon').createSandbox();
const Budget = require("../../../models/budget.model");
const budgetDao = require("../../../dao/budget.dao");
const testBudgets = require("../../constants/test-budgets");

describe('Budget DAO', async () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('getAllBudgets', async () => {
    it('should return all budgets', async () => {
      sandbox.stub(Budget, 'find').returns({
        lean: sandbox.stub().resolves(testBudgets.budgetArray)
      });
      return budgetDao.getAllBudgets().should.eventually.equal(testBudgets.budgetArray);
    });

    it('should throw an error', async () => {
      sandbox.stub(Budget, 'find').returns({
        lean: sandbox.stub().rejects("New Error")
      });
      return budgetDao.getAllBudgets().should.be.rejected;
    });
  });

  describe('getBudget', async () => {
    it('should get budget by id', async () => {
      const testId = testBudgets.budgetArray[0]._id;
      sandbox.stub(Budget, 'findById').withArgs(testId).returns({
        lean: sandbox.stub().resolves(testBudgets.budgetArray[0])
      });
      return budgetDao.getBudget(testId).should.eventually.equal(testBudgets.budgetArray[0]);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Budget, 'findById').returns({
        lean: sandbox.stub().rejects("New Error")
      });
      return budgetDao.getBudget("foo").should.be.rejected;
    });
  });

  describe('getBudgetNonLean', async () => {
    it('should get budget by id without lean method', async () => {
      const testId = testBudgets.budgetArray[0]._id;
      sandbox.stub(Budget, 'findById').withArgs(testId).resolves(testBudgets.budgetArray[0]);
      return budgetDao.getBudgetNonLean(testId).should.eventually.equal(testBudgets.budgetArray[0]);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Budget, 'findById').rejects("New Error");
      return budgetDao.getBudgetNonLean("foo").should.be.rejected;
    });
  });

  describe('deleteBudget', async () => {
    it('should delete budget', async () => {
      const testId = testBudgets.budgetArray[0]._id;
      sandbox.stub(Budget, 'findByIdAndDelete').withArgs(testId).resolves();
      return budgetDao.deleteBudget(testId).should.eventually.equal(testId);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Budget, 'findByIdAndDelete').rejects("New Error");
      return budgetDao.deleteBudget("foo").should.be.rejected;
    });
  });

  describe('updateBudget', async () => {
    it('should update budget', async () => {
      const testId = testBudgets.budgetArray[0]._id;
      const newBudgetInfo = {
        title: "foo"
      };
      sandbox.stub(Budget, 'findByIdAndUpdate').withArgs(testId, newBudgetInfo).resolves({
        ...testBudgets.budgetArray[0],
        title: "foo"
      });
      return budgetDao.updateBudget(testId, newBudgetInfo).should.eventually.eql({
        ...testBudgets.budgetArray[0],
        title: "foo"
      });
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Budget, 'findByIdAndUpdate').rejects("New Error");
      return budgetDao.updateBudget("foo", {}).should.be.rejected;
    });
  });

  describe('saveBudget', async () => {
    it('should save budget', async () => {
      sandbox.stub(Budget.prototype, 'save').resolves(testBudgets.budgetArray[0]);
      return budgetDao.saveBudget(new Budget(testBudgets.budgetNoIds)).should.eventually.eql(testBudgets.budgetArray[0]._id);
    });

    // should throw error if error contacting mongoDB
    it('should throw an error', async () => {
      sandbox.stub(Budget.prototype, 'save').rejects("New Error");
      return budgetDao.saveBudget(new Budget(testBudgets.budgetNoIds)).should.be.rejected;
    });
  });
});

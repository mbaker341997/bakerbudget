const chai = require('chai');
chai.use(require("chai-as-promised"));
chai.should();
const sandbox = require('sinon').createSandbox();
const Budget = require("../../../models/budget.model");
const budgetDao = require("../../../dao/budget.dao");
const testBudgets = require("../../constants/test-budgets");

describe('Budget DAO', async () => {
  describe('getAllBudgets()', async () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return all budgets', async () => {
      sandbox.stub(Budget, 'find').resolves(testBudgets.budgetArray);
      budgetDao.getAllBudgets().should.eventually.equal(testBudgets.budgetArray);
    });

    // should throw an error
    it('should throw an error', async () => {
      sandbox.stub(Budget, 'find').rejects("New Error");
      budgetDao.getAllBudgets().should.be.rejectedWith("New Error");
    });
  });
});

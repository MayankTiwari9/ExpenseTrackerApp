const expense = require('express');

const expenseController = require('../controller/expenses');

const router = expense.Router();

router.post('/add-expense', expenseController.postAddExpenses);
router.get('/', expenseController.getAllExpenses);
router.post('/delete-expense', expenseController.postDeleteExpense);
router.put('/edit-expense', expenseController.putEditExpense);

module.exports = router;
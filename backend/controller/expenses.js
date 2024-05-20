const Expense = require('../model/expense');

exports.postAddExpenses = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
        amount: amount,
        description: description,
        category: category
    })
    .then(() => {
        console.log("Expense Created");
        res.status(201).json({message: "Expense Created"});
    })
    .catch((err) => {
        console.log(err);
    })
}  

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll()
    .then((expenses) => {
        res.status(200).json(expenses);
    })
    .catch((err) => console.log(err))
}

exports.postDeleteExpense = (req, res, next) => {
    const expenseId = req.body.id;
    console.log(req);
    Expense.findOne({where: {id : expenseId}})
    .then(res => {
        if(!res){
            return res.status(404).json({message: "Expense Not Found"});
        }
        return res.destroy();
    })
    .then(() => {
        res.status(200).json({message: "Expense Deleted"});
    })
    .catch((err) => console.log(err));
}

exports.putEditExpense = (req, res, next) => {
    const expenseId = req.body.id;
    const updatedAmount = req.body.amount;
    const updatedDescripton = req.body.description;
    const updatedCategory = req.body.category;
    
    Expense.findOne({where : {id: expenseId}})
    .then((expense) => {
        if(!expense){
            return res.status(404).json({message: "Expense Not Found"});
        }
        return expense.update({
            amount: updatedAmount,
            description: updatedDescripton,
            category: updatedCategory
        })
    })
    .then((updatedExpense) => {
        return res.status(200).json({message: "Expense Updated Successfully"});
    })
    .catch((err) => console.log(err));
}
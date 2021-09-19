const router = require("express").Router();
const Transaction = require("../models/transaction.model");

router.route("/").get((_, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const transaction = new Transaction(req.body);
  transaction
    .save()
    .then((saved) => res.json(saved))
    .catch((err) => res.status(400).json(err.toString()));
});

router.route("/:id").get((req, res) => {
  Transaction.findById(req.params.id)
    .then((transaction) =>
      transaction
        ? res.json(transaction)
        : res.status(404).json(`No transaction found of id ${req.params.id}`)
    )
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Deleted transaction: ${req.params.id}`))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  // why not use findbyIdAndUpdate? so that we can still hit the save middleware
  Transaction.findById(req.params.id)
    .then((transaction) => {
      if (!transaction) {
        res.status(404).json(`No transaction found of id ${req.params.id}`);
      } else {
        for (const [key, value] of Object.entries(req.body)) {
          transaction[key] = value;
        }
        transaction
          .save()
          .then((saved) => res.json(saved))
          .catch((err) => res.status(400).json(err.toString()));
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;

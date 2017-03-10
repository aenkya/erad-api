var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

router.delete('/deleteTask/:id', function (req, res) {
    Task.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err) return res.status(503).send(err);
        res.status(201).send({ message: 'Deleted' });
    });
});

module.exports = router;
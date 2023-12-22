const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator'); //import express validator

// Import database connection
const connection = require('../config/database')

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
    connection.query('SELECT * FROM post ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            })
        }
    });
});

// Add store POST with endpoint store
router.post('/store', [
    // Validation
    body('title').notEmpty(),
    body('content').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    // Define formData
    const formData = {
        title: req.body.title,
        content: req.body.content,
    };

    // Insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM post WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: '🫣 Oopss,Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: '⛔️ Data Post Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: '✅ Detail Data Post',
                data: rows[0]
            })
        }
    })
})

/** Update POST
 * PUT /posts/update/:id
 * */
router.patch('/update/(:id)', [

    // Validation
    body('title').notEmpty(),
    body('content').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    let id = req.params.id;

    // data formData
    const formData = {
        title: req.body.title,
        content: req.body.content,
    };

    connection.query('UPDATE post SET ? WHERE id = ?', [formData, id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Opps.. Data Not Found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully',
                data: formData
            });
        }
    })
})

router.delete('/delete/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`DELETE FROM post WHERE id = ${id}`, function (err, rows) {

        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else if (rows.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Opps.. Data Not Found, try to add data first',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully',
            });
        }
    })
})

module.exports = router;
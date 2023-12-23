const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator'); //import express validator

// Import database connection
const connection = require('../config/database')

/**
 * Method   : GET
 * Endpoint : api/posts
 * Description : Get all list posts
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

/**
 * Method   : POST
 * Endpoint : api/posts/store
 * Description : Store post
 */
router.post('/store', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const postData = { title, content };

    connection.query('INSERT INTO post SET ?', postData, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const postId = result.insertId;
        res.status(201).json({ message: 'Data inserted successfully', postId });
    });
});


/**
 * Method   : GET
 * Endpoint : api/posts/(:id)
 * Description : Get detail post
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

/**
 * Method   : PUT
 * Endpoint : api/posts/update/:id
 * Description : Update post
 * */
router.patch('/update/(:id)', [

    // Express Validation
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

/**
 * Method   : DELETE
 * Endpoint : api/posts/delete/(:id)
 * Description : Delete post by id
 */
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
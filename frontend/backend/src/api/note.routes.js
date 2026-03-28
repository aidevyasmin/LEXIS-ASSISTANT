const express = require('express');
const router = express.Router();
const noteController = require('./note.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, noteController.createNote);
router.get('/', verifyToken, noteController.getNotes);
router.get('/:id', verifyToken, noteController.getNoteById);
router.put('/:id', verifyToken, noteController.updateNote);
router.delete('/:id', verifyToken, noteController.deleteNote);

module.exports = router;

const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/create', gameController.game_create_get);
router.get('/', gameController.game_index);
router.post('/', gameController.game_create_post);
router.get('/:id', gameController.game_details);
router.delete('/:id', gameController.game_delete);
router.put('/edit/:id',gameController.game_edit);
router.get('/edit/:id',gameController.game_editget);

module.exports = router;
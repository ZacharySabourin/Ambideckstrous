import { Router } from 'express';
import CardsController from '../controllers/cards.controller.js';

const router = Router();

router.get('/search', CardsController.getCardsBySearchEndpoint);
router.get('/named/:name', CardsController.getCardByNameEndpoint);
router.get('/:id', CardsController.getCardByIdEndpoint);

export default router;

import { Router } from 'express';
import CardsController from '../controllers/cards.controller.mjs';

const router = Router();

router.get('/:id', CardsController.getCardByIdEndpoint);

export default router 
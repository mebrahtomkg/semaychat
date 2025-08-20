import express from 'express';
import {
  addContact,
  listAllContacts,
  removeContact,
} from '../controllers/contactController';

const router = express.Router();

router.post('/', addContact);
router.get('/', listAllContacts);
router.delete('/:userId', removeContact);

export default router;

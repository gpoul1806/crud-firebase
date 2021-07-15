import * as express from 'express';
import {
  getDocument,
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteAttachment
} from './users.service';

const router = express.Router();

// creating the endpoints
router.get('/', getAllDocuments);
router.get('/:documentID', getDocument);
router.post('/', createDocument);
router.put('/:documentID', updateDocument);
router.delete('/:documentID', deleteAttachment);

export default router;

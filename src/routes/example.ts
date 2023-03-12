import express from 'express'
import { getExample, postExampleData } from '../controllers/example';
import { postExampleDataValidation } from '../validation/exampleValidation/exampleValidation';
const router = express.Router();

router.get('/', getExample)
router.post('/post', postExampleDataValidation, postExampleData)

export default router;
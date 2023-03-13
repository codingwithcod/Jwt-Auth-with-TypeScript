import express from 'express'
import { getExample, postExampleData } from '../controllers/example';
import { authChecker } from '../midddleware/authChecker';
import { postExampleDataValidation } from '../validation/exampleValidation/exampleValidation';
const router = express.Router();

router.get('/',authChecker, getExample)
router.post('/post', postExampleDataValidation, postExampleData)

export default router;
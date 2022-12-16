import { Router } from 'express';
import postgraphile from '../utils/dev-tools/postgraphile';

const router = Router();

router.use(postgraphile);

export default router;

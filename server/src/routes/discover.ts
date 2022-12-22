import { Request, Response, Router } from 'express';
import { discover } from '../controlers/discover';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const result = await discover();
    res.json(result);
});

export default router;

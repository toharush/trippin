import { Router } from 'express';
import dev from './dev';

const router = Router();

if (process.env.NODE_ENV?.includes('development')) {
    console.log("You're on developer mode I hope u know what u doing...");
    router.use('/dev', dev);
}

export default router;

import { Router } from 'express';
import { findShortCode, linkSet } from './controllers';

export const linkRouter = Router();
linkRouter.post('/api/short-url', linkSet);
linkRouter.get('/:slug', findShortCode);

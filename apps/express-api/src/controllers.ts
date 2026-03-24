import type { Request, Response } from 'express';
import { logger } from './logger';
import { LinksService } from './services';

const SITE_URL = process.env.SITE_URL || 'http://localhost:4200';
const linksService = new LinksService(SITE_URL);
export async function linkSet(req: Request, res: Response) {
  try {
    const dbEntry = await linksService.saveLink(req.body);
    res.status(201).json(dbEntry);
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Validation failed',
    });
  }
}

export async function findShortCode(req: Request, res: Response) {
  if (Array.isArray(req.params.slug))
    return res.status(400).json(Error('Invalid URL'));

  try {
    const originalLink = await linksService.findOriginalLink(req.params.slug);
    if (!originalLink) {
      return res.status(404).send('Link not found');
    }
    res.redirect(301, `${originalLink}`);
  } catch (error) {
    logger.error(error);
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Link not found',
    });
  }
}

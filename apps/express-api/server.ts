import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { logger } from './src/logger';
import { linkRouter } from './src/routes';

const SITE_URL = process.env.SITE_URL;
const PORT = process.env.PORT || 4200;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit 10 requests for 15m
  message: 'Too many links created, please try again later.',
});

const app = express();
app.use(
  helmet(),
  //contentSecurityPolicy for example Google scripts
  /* {
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  } */
);
app.use(cors());
app.use(compression());
app.use('/api/short-url', limiter);
app.use(express.json());

dotenv.config();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});
app.use('/', linkRouter);

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.error(`Classic API running at ${SITE_URL}:${PORT}`);
  });
}

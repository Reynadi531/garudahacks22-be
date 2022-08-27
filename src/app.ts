import express, { Application, json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import consola from 'consola';
import { initDatabase } from './database';
import 'dotenv/config';

(async () => {
  await initDatabase(String(process.env['DSN']));
})();

const app: Application = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

import AuthRoute from './routes/auth.route';
app.use('/api/v1/auth', AuthRoute);

app.use('*', (_req: Request, res: Response) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  consola.info(`Server started on port ${PORT}`);
});

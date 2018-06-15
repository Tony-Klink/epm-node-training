import express from 'express';

import { cookieParser } from './middlewares/cookieMiddleware';
import { parseQuery } from './middlewares/queryMiddleware';
import router from './routes';

const app = express();

app.use(cookieParser);
app.use(parseQuery);
app.use(router);

export default app;
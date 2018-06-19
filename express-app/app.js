import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { cookieParser } from './middlewares/cookieMiddleware';
import { parseQuery } from './middlewares/queryMiddleware';
import router from './routes';
const app = express();


app.use(cookieParser);
app.use(parseQuery);
app.use(router);
app.use(session({secret: 'SUPER_SECRET'}));
app.use(bodyParser.urlencoded({extended: true}));

export default app;
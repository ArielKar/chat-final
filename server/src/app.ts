import * as express from 'express';
import * as cors from 'cors';
import * as routes from './routes';
import {authCheck} from "./middlewares/middlewares";
import CustomError from "./helpers/customError";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', routes.usersRouter);
app.use('/groups', authCheck, routes.groupsRouter);
app.use('/messages', authCheck, routes.messagesRouter);

app.use((req, res, next) => {
    const error = new CustomError('Bad request', 404);
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500).json({
        error: error.message
   });
});

export default app;
import express from 'express';
import {PORT} from './config/env.js';
import cookieParser from 'cookie-parser';

//Importando routes
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from "./routes/user.routes.js";
import connectionToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

//Procesar datos JSON del req.body
app.use(express.json());
//Procesar datos de formularios
app.use(express.urlencoded({ extended: false }));
//Leer cookies enviadas por el cliente
app.use(cookieParser());

//Usas use para decirle a tu aplicacion que routes quieres usar
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter );

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription tracker API')
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectionToDatabase();
});
export default app;

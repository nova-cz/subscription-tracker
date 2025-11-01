import express from 'express';
import {PORT} from './config/env.js';

//Importando routes
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from "./routes/user.routes.js";

const app = express();

//Usas use para decirle a tu aplicacion que routes quieres usar
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter );

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription tracker API')
});

app.listen(PORT, () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
});

console.log('Listening on port', PORT);
export default app;

import {Router} from 'express';

const subscriptionRouter = new Router();

subscriptionRouter.get('/', (req, res) => res.send({title:'GET all Subscriptions'}));

subscriptionRouter.get('/:id', (req, res) => res.send({title:'GET subscription details'}));

subscriptionRouter.post('/', (req, res) => res.send({title:'CREATE Subscription'}));

subscriptionRouter.put(':id/', (req, res) => res.send({title:'UPDATE Subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title:'DELETE Subscription'}));

//A diferencia d elas anteriores esta es para obtener todas las subscripciones d eun usuario en especifico
subscriptionRouter.get('/user/:id', (req, res) => res.send({title:'GET all user Subscriptions'}));

// va a cancelar un user subscription
subscriptionRouter.put('/user/:id', (req, res) => res.send({title:'CANCEL Subscription'}));

// ver que subscripciones vienen
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title:'GET upcoming renewals'}));

export default subscriptionRouter;
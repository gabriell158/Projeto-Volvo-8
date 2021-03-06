const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const VehicleController = require('./controllers/VehicleController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const EquipmentController = require('./controllers/EquipmentController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    /*whatsapp: Joi.string().required().min(10).max(11),*/
  })
}), UserController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.get('/vehicles', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), VehicleController.index);

routes.post('/vehicles', VehicleController.create);

routes.delete('/vehicles/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), VehicleController.delete);

routes.get('/equipments', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), EquipmentController.index);

routes.post('/equipments', EquipmentController.create);

routes.delete('/equipments/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), EquipmentController.delete);

module.exports = routes;
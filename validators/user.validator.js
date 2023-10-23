import Joi from '@hapi/joi';
import { apiresponse } from '../utils/commonResponse.util.js';

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export const UserRegisterSchema = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().label('Username is required.').required(),
    password: Joi.string().label('Password is required.').required(),
    mobile: Joi.string().label('phone number is required').required(),
    optionalMob: Joi.string().allow('').optional(),
    name: Joi.string().label('User real name is required.').required(),
    school: Joi.string().label('School name is required.').required(),
    userType: Joi.string().label('User type is required.').required()
  });

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    let errors = {};
    error.details.forEach((err) => {
      errors[err.context.key] = err.context.label;
    });
    return res.status(400).json(await apiresponse(false, errors, 400, null));
  } else {
    req.body = value;
    next();
  }
};
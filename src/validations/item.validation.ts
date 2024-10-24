import Joi from "joi";

export const createItemSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'Field "name" is required',
    "string.empty": 'Field "name" cannot be empty'
  }),
  price: Joi.number().required().min(0).messages({
    "any.required": 'Field "price" is required',
    "number.base": 'Field "price" must be a number',
    "number.min": 'Field "price" cannot be negative'
  })
});

export const updateItemSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().min(0).messages({
    "number.base": 'Field "price" must be a number',
    "number.min": 'Field "price" cannot be negative'
  })
});

const Joi = require('joi')


const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/), 
    username: Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    collegeName:Joi.string().required(),
    gender:Joi.string().valid('male', 'female', 'other').required(),
})

const validateUser = (data) => {
    return userSchema.validate(data);
}

module.exports = {
    validateUser
}
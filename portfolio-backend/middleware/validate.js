const { body, validationResult } = require('express-validator');

const contactValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').trim().isEmail().withMessage('Valid email is required'),
        body('projectType').trim().notEmpty().withMessage('Project type is required'),
        body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    return res.status(400).json({ success: false, errors: errors.array() });
};

module.exports = { contactValidationRules, validate };

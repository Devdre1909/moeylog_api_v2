const {
    check
} = require('express-validator')

const ObjCurrency = JSON.parse(fs.readFileSync('../../currency.json'));
let currency = []

for (const c in ObjCurrency) {
    currency.push(c);
}

const validateRegistrationBody = () => {
    return [
        check('name').exists().withMessage('name is required').isLength({
            min: 3
        }).withMessage('name must be greater that 3 letters'),
        check('email').exists().withMessage('email is required').isEmail().withMessage('email is invalid'),
        check('password').exists().withMessage('password is required').isLength({
            min: 8,
            max: 12
        }).withMessage('password must be in between 8 to 12 characters long'),
        check('currency').exists().withMessage('currency is required').isLength({
            min: 3,
            max: 3
        }).withMessage('currency must be 3 letters long').if(!currency.includes(check('currency'))).withMessage('invalid currency code, pick form list')
    ]
}

const validateLoginBody = () => {
    return [
        check('email').exists().withMessage('email is required').isEmail().withMessage('email is invalid'),
        check('password').exists().withMessage('password is required').isLength({
            min: 8,
            max: 12
        }).withMessage('password must be in between 8 to 12 characters long')
    ]
}

const validateTransactions = () => {
    return [
        check('user_id').exists().withMessage('user id is required'),
        check('amount').exists().withMessage('amount is required').isInt("invalid amount"),
        check('description').exists().withMessage('description is required').isLength({
            min: 12
        }).withMessage('decriptions should be more that 12 letters'),
        check('can_edit').exists().withMessage('can edit is required')
    ]
}
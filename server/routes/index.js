const chalk = require('chalk');

const apiRoutes = require('./apis');

const init = (server) => {
    server.get('*', (req, res, next) => {
        console.log(chalk.gray(`Request maded to ${chalk.bold(req.originalUrl)}`));
        return next();
    })
    server.use('/api', apiRoutes);
}

module.exports = {
    init
}
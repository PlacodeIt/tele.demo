const morgan = require('morgan');
const logger = require('../utils/logger');

const logMiddleware = morgan('combined', { stream: logger.stream });

module.exports = logMiddleware;

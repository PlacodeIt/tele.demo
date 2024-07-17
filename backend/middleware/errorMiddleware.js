const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation Error', details: err.message });
    } else if (err.name === 'MongoError') {
        return res.status(500).json({ message: 'Database Error', details: err.message });
    } else {
        return res.status(500).json({ message: 'Internal Server Error', details: err.message });
    }
};

module.exports = errorMiddleware;

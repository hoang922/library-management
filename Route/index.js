const errorController = require('../Controller/errorController');
const AppError = require('../utils/appError');
const bookRoutes = require('./bookRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const manageRoutes = require('./manageRoutes');
const reviewRoutes = require('./reviewRoutes');
module.exports = (app) => {
    app.use('/api/v1', manageRoutes);
    app.use('/api/v1/review', reviewRoutes);
    app.use('/api/v1/book', bookRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);
    app.use('/*', (req, res, next ) => {
        next(new AppError('Page not found', 404));
    })
    app.use(errorController);
}

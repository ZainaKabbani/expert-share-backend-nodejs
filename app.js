const express = require('express');
const userRouter = require('./routes/userRoutes');
const expertRouter = require('./routes/expertRoutes');
const expertFreeTimeRouter = require('./routes/expertFreeTimeRoutes')
const appointmentRouter = require('./routes/appointmentRoutes')
const AppError = require('./utils/appError');
const globalErrorHadler = require('./controllers/errorController');
const e = require('express');

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/expert', expertRouter);
app.use('/api/v1/freeTime', expertFreeTimeRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHadler);

module.exports = app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './src/modules/users/auth.google.js';

import chatbotRoutes from './src/modules/chatbot/chatbot.routes.js';
import usersRoutes from './src/modules/users/users.routes.js';
import googleAuthRoutes from './src/modules/users/googleauth.routes.js';
import portoRoutes from './src/modules/porto/porto.routes.js';
import commentRoutes from './src/modules/comment/comment.route.js';
import messageRoutes from './src/modules/messages/messages.routes.js';
import serviceRoutes from './src/modules/service/service.routes.js';
import partnerServiceRoutes from './src/modules/partnerService/partnerService.routes.js';
import assignmentRoutes from './src/modules/assignment/assignment.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Passport init (tanpa session)
app.use(passport.initialize());

// Routes
app.use(chatbotRoutes);
app.use('/users', usersRoutes);
app.use(googleAuthRoutes);
app.use('/porto', portoRoutes);
app.use(commentRoutes);
app.use(messageRoutes);
app.use('/service', serviceRoutes);
app.use('/partner-service', partnerServiceRoutes)
app.use('/assignment', assignmentRoutes)


// Error handler biar gampang debug
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

export default app;

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { authGuard, errorHandler, performAuth } from './middlewares';
import {
  authRoutes,
  blockedUserRoutes,
  chatRoutes,
  contactRoutes,
  messageRoutes,
  profilePhotoRoutes,
  rootRoutes,
  userRoutes, 
} from './routes';

const app = express();
 
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(performAuth);
app.use('/', rootRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', authGuard, userRoutes);
app.use('/api/profile-photos', authGuard, profilePhotoRoutes);
app.use('/api/chats', authGuard, chatRoutes);
app.use('/api/messages', authGuard, messageRoutes);
app.use('/api/contacts', authGuard, contactRoutes);
app.use('/api/blocked-users', authGuard, blockedUserRoutes);

app.use(errorHandler);

export default app;

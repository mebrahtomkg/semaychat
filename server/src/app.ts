import { authGuard, errorHandler, performAuth } from '@/middlewares';
import {
  authRoutes,
  blockedUserRoutes,
  chatRoutes,
  contactRoutes,
  messageRoutes,
  profilePhotoRoutes,
  rootRoutes,
  userRoutes,
} from '@/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import { ALLOWED_ORIGINS } from './config/general';

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow mobile apps and api test tools.
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
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

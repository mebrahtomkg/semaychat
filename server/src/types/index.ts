import * as express from 'express';

declare module 'express' {
  interface Request {
    userId?: number;
  }
}

export type VisibilityOption = 'everybody' | 'contacts' | 'nobody';

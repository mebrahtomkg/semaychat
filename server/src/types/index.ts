// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

export type VisibilityOption = 'everybody' | 'contacts' | 'nobody';

declare module 'express' {
  interface Request {
    userId?: number;
  }
}

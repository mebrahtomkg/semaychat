import { SignUpSchema } from '@/schemas';

interface DemoUser extends SignUpSchema {
  photos?: string[];
}

export const demoUsers: DemoUser[] = [
  {
    firstName: 'Tom',
    email: 't@e.com',
    password: 'tttttt',
    photos: ['demo.8.9.png', '1770202732756-BoOXeVyTGIxEcohfAZUV.png'],
  },
  {
    firstName: 'Edge',
    email: 'e@e.com',
    password: 'eeeeee',
    photos: ['1770206170218-QL8wo2cluNQRWad1AoI1.png'],
  },
  {
    firstName: 'Firefox',
    email: 'f@e.com',
    password: 'ffffff',
    photos: [],
  },
  {
    firstName: 'Safari',
    email: 's@e.com',
    password: 'ssssss',
  },
  {
    firstName: 'Opera',
    email: 'o@e.com',
    password: 'oooo',
  },
  {
    firstName: 'Bravo',
    email: 'b2@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Jackson',
    email: 'b3@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Merit',
    email: 'b4@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Abrham',
    email: 'b5@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Sansa',
    email: 'b6@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Sofiya',
    email: 'b7@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Taiwen',
    email: 'b8@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Muez',
    email: 'b9@e.c',
    password: 'bbbb',
  },
  {
    firstName: 'Bob',
    email: 'b10@e.c',
    password: 'bbbb',
  },
];

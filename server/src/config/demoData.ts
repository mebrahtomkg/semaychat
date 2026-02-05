import { SignUpSchema } from '@/schemas';

interface DemoUser extends SignUpSchema {
  photos?: string[];
}

export const demoUsers: DemoUser[] = [
  {
    firstName: 'Tom',
    lastName: 'Hope',
    email: 'tom@e.com',
    password: 'tttttt',
    photos: [],
  },
  {
    firstName: 'Edge',
    lastName: 'Brown',
    email: 'edge@e.com',
    password: 'eeeeee',
    photos: [],
  },
  {
    firstName: 'Abeba',
    lastName: 'Yohannes',
    email: 'abeba@e.com',
    password: 'aaaaaa',
    photos: [
      'demo-abeba-1.png',
      'demo-abeba-2.png',
      'demo-abeba-3.png',
      'demo-abeba-4.png',
    ],
  },
  {
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 'sarah@e.com',
    password: 'ssssss',
  },
  {
    firstName: 'Abdii',
    lastName: 'Beenoo',
    email: 'abdii@e.com',
    password: 'aaaaaa',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@e.com',
    password: 'jjjjjj',
  },
  {
    firstName: 'Chaltu',
    lastName: 'Borena',
    email: 'chaltu@e.com',
    password: 'cccccc',
  },
  {
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia@e.com',
    password: 'oooooo',
  },
  {
    firstName: 'Fatuma',
    lastName: 'Ahmed',
    email: 'fatuma@e.com',
    password: 'ffffff',
  },
  {
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert@e.com',
    password: 'rrrrrr',
  },
  {
    firstName: 'Selamawit',
    lastName: 'Gebre',
    email: 'selamawit@e.com',
    password: 'ssssss',
  },
  {
    firstName: 'Emily',
    lastName: 'Wilson',
    email: 'emily@e.com',
    password: 'eeeeee',
  },
  {
    firstName: 'Zekarias',
    lastName: 'Tadesse',
    email: 'zekarias@e.com',
    password: 'zzzzzz',
  },
  {
    firstName: 'David',
    lastName: 'Anderson',
    email: 'david@e.com',
    password: 'dddddd',
  },
  {
    firstName: 'Aster',
    lastName: 'Bekele',
    email: 'aster@e.com',
    password: 'aaaaaa',
    photos: [],
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael@e.com',
    password: 'mmmmmm',
  },
  {
    firstName: 'Meron',
    lastName: 'Tekle',
    email: 'meron@e.com',
    password: 'mmmmmm',
    photos: [],
  },
  {
    firstName: 'James',
    lastName: 'Williams',
    email: 'james@e.com',
    password: 'jjjjjj',
  },
  {
    firstName: 'Tolessa',
    lastName: 'Dibaba',
    email: 'tolessa@e.com',
    password: 'tttttt',
  },
  {
    firstName: 'Sophia',
    lastName: 'Garcia',
    email: 'sophia@e.com',
    password: 'ssssss',
    photos: [],
  },
  {
    firstName: 'Kedir',
    lastName: 'Mohammed',
    email: 'kedir@e.com',
    password: 'kkkkkk',
  },
  {
    firstName: 'Hannah',
    lastName: 'Walker',
    email: 'hannah@e.com',
    password: 'hhhhhh',
  },
  {
    firstName: 'Tigist',
    lastName: 'Mulugeta',
    email: 'tigist@e.com',
    password: 'tttttt',
    photos: [],
  },
  {
    firstName: 'Lucas',
    lastName: 'Martinez',
    email: 'lucas@e.com',
    password: 'llllll',
  },
];

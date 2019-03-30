import {Student} from '../models/student';

export const STUDENTS_MOCKED: Student[] = [
  {
    _id : '1',
    lastName : 'Delmotte',
    firstName : 'Jean-Yves',
    email : 'delmote@test.fr',
    password : 'test1',
    major: 'SI',
    wishList: [
      {
        id : 1,
        position : 1,
        university : 'polytech',
      },
      {
        id : 2,
        position : 2,
        university : 'Insa',
      }
    ],
    year: '3',
    phoneNumber: '06 06 06 06 06'
  },
  {
    _id : '2',
    lastName : 'Pourtier',
    firstName : 'Rémi',
    email : 'delmote@test.fr',
    password : 'test1',
    phoneNumber: '07 07 07 07 07',
    major: 'MAM',
  },
];


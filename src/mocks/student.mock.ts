import {Student} from '../models/student';

export const STUDENTS_MOCKED: Student[] = [
  {
    id : 1,
    lastName : 'Delmotte',
    firstName : 'Jean-Yves',
    email : 'delmote@test.fr',
    password : 'test1',
    major: 'SI3',
    wishList: [
      {
        id : 1,
        position : 1,
        university : "polytech",
      },
      {
        id : 2,
        position : 2,
        university : "Insa",
      }
    ],
  },
  {
    id : 2,
    lastName : 'Pourtier',
    firstName : 'Rémi',
    email : 'delmote@test.fr',
    password : 'test1',
    major: 'MAM',
  },
];

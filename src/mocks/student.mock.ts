import {Student} from '../models/student';

export const STUDENTS_MOCKED: Student[] = [
  {
    _id : '1',
    lastName : 'Delmotte',
    firstName : 'Jean-Yves',
    email : 'delmote@test.fr',
    password : 'test1',
    major: 'SI',
    wishes: [
      {
        id : 1,
        position : 1,
      },
      {
        id : 2,
        position : 2,
      }
    ],
    year: '3',
    phoneNumber: '06 06 06 06 06',
    notes: [
      {
        year: 2016,
        schoolLevel: 'bac+2',
        school: 'IUT Aix-En-Provence',
        note: 20
      }
    ],
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


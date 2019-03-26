import {University} from '../models/university';

export const UNIVERSITY_MOCKED: University[] = [
  {
    id : 1,
    country: 'Suede',
    name : 'University1',
    concernedDepartement: 'SI3',
    courses: [
      {
        name: 'IHM',
        major: 'MAM',
        semester: 7,
        ECTS_count: 15,
      },
      {
        name: 'prog C',
        major: 'SI3',
        semester: 8,
        ECTS_count: 15,
      },
      {
        name: 'IHM',
        major: 'MAM',
        semester: 7,
        ECTS_count: 15,
      },
      {
        name: 'anglais',
        major: 'SI3',
        semester: 7,
        ECTS_count: 15,
      }
    ],
  },
  {
    id : 2,
    country: 'Espagne',
    name: 'University2',
    concernedDepartement: 'MAM',
    courses: [],
  },
  {
    id : 3,
    country: 'Espagne',
    name: 'University3',
    concernedDepartement: 'SI3',
    courses: [],
  },
];

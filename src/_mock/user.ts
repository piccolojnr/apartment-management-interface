import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { User } from '../types/user';

// ----------------------------------------------------------------------

export const account: User = {
  id: "1",
  email: "admin@demo.com",
  notifications: [],
  profile: {
    first_name: "John",
    last_name: "Doe",
    id: "1",
    is_verified: true,
    avatar: "/static/mock-images/avatars/avatar_default.jpg",
  },
  role: "admin",
};


export const users: User[] = [...Array(24)].map((_, index) => ({
  id: index.toString(),
  email: faker.internet.email(),
  role: sample(['admin', 'user', 'staff', 'manager']),
  profile: {
    id: index.toString(),
    avatar: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    is_verified: faker.datatype.boolean(),
  },
  notifications: [],
}));

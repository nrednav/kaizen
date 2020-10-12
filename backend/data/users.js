import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@kaizen.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bob Jenkins',
    email: 'bob@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Tom Jenkins',
    email: 'tom@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

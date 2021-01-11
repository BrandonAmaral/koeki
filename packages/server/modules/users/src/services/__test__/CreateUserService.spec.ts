import CreateUserService from '../CreateUserService';
import { BadRequestError } from '@koeki/common';

it('should not allow duplicate emails', async () => {
  const service = new CreateUserService();

  await service.execute({
    firstname: 'Test',
    lastname: 'Test',
    email: 'test@test.com',
    password: 'password',
    isAdmin: false,
  });

  expect(
    service.execute({
      firstname: 'Test',
      lastname: 'Test',
      email: 'test@test.com',
      password: 'password',
      isAdmin: false,
    }),
  ).rejects.toBeInstanceOf(BadRequestError);
});

import AuthUserService from '../AuthUserService';
import CreateUserService from '../CreateUserService';

it('should not allow invalid credentials', async () => {
  const createService = new CreateUserService();
  const authService = new AuthUserService();

  const user = await createService.execute({
    firstname: 'Test',
    lastname: 'Test',
    email: 'test@test.com',
    password: 'password',
    isAdmin: false,
  });

  const signIn = await authService.execute({
    email: 'test@test.com',
    password: 'password',
  });

  expect(JSON.stringify(signIn.user)).toEqual(JSON.stringify(user));
});

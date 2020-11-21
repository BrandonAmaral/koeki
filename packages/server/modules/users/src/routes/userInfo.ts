import { Router } from 'express';

import { getUserInfo } from '@koeki/common';

const userInfo = Router();

userInfo.get('/api/users/user-info', getUserInfo, (request, response) => {
  return response.send({ userInfo: request.userInfo || null });
});

export default userInfo;

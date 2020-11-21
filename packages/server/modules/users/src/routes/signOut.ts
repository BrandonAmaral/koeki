import express from 'express';

const signOut = express.Router();

signOut.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

export default signOut;

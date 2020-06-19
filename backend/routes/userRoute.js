import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })
  } else {
    res.status(404).send({ msg: "Invalid Email or Password." })
  }
})

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  const newUser = await user.save();
  if (newUser) {
    res.send({
      name: newUser.name,
      email: newUser.email,
      admin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(404).send({ msg: "Invalid User Data." })
  }
})

router.get("/createAdmin", async (req, res) => {
  console.log('am i here');
  try {
    const user = new User({
      name: 'Akhil',
      email: 'akhilg1093@gmail.com',
      password: 'password',
      isAdmin: true
    });

    console.log('okay')
    const newUser = await user.save();
    console.log('alright')
    res.send(newUser);

  } catch (error) {
    res.send({ msg: error.message });
  }
})

export default router;

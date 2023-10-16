const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../model/user.js')
const adminModel = require('../model/admin.js')
const auth = require('../config/auth.js')
const tokenExpiry = '1h';
const ioredis = require('ioredis')

const redisClient = ioredis.createClient({
    host: '127.0.0.1',
    port: 6379,
  })

//register user
router.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new adminModel({ userName, password: hashedPassword })

    await admin.save();

    res.status(201).json({ msg: 'User Register success' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
});

//login user
router.post('/login', async (req,res) => {
    try{
        const {userName, password } = req.body
        const user = await adminModel.findOne({ userName })

        if(!user){
            res.status(404).json({ msg: 'user not found'})
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch){
            res.status(400).json({msg: 'wrong password'})
        }

        const token = jwt.sign({ userName: user.userName}, '4@re##', { expiresIn: tokenExpiry })
        res.status(200).json({token})
    } catch (error){
        res.status(400).json({msg: error.message})
    }
})

//get all data
const getList = async () => {
  const users = await userModel.find()
  return users
}
const checkRedis = async (req, res, next) => {
  const redisKey = `user:${req.query.id}`

  const redisData = await redisClient.get(redisKey)

  if (redisData) {
    return res.status(200).json(JSON.parse(redisData))
  }

  const users = await getList()

  redisClient.set(redisKey, JSON.stringify(users), 'EX', 3600)

  res.status(200).json(users)
}

router.get('/user', auth, checkRedis, async (req, res) => {
  let users;
  users = await redisClient.get(redisKey)

  if (!users) {
    users = await getList();
    redisClient.set(redisKey, JSON.stringify(users), 'EX', 3600)
  }
  res.status(200).json(users)
});

//add user
router.post('/user', auth, async (req, res) => {
    const addUser = new userModel(req.body)
    try {
      const post = await addUser.save()
      if (!post) {
        throw new Error('Something went wrong with the post')
      }
      res.status(201).json(post)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  })

//update  user
router.put('/user/:id', auth, async (req, res) => { // Perhatikan urutan `req` dan `res`
    try {
        const updt = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updt) {
            return res.status(404).json({ success: false, msg: 'User ID not found' })
        }
        res.status(200).json({ success: true, data: updt })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
});



//delete user
router.delete('/user/:id', auth, async (req,res) => {
    try {
        const del = await userModel.findByIdAndDelete(req.params.id)
        if(!del){
            return res.status(404).json({msg: 'User ID not found' })
    }
    res.status(200).json({success: true})
    } catch (error){
        res.status(400).json({msg: error.message})
    }
  })

module.exports = router
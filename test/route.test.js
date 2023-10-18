const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const route = require('../index')
const jwt = require('jsonwebtoken')
const redis = require('ioredis')
const bcrypt = require('bcrypt')
const sinon = require('sinon')
const should = chai.should()

//auth di route harus di hilangkan terlebih dahulu

describe('User Routes', () => {

  describe('POST /login', () => {
    it('should return a token when logging in with correct credentials', async function () {
      const app = await request(route)
  
      const user = {
        userName: 'admin',
        password: 'admin123'
      }
  
      const response = await app
        .post('/api/login')
        .send(user)
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token')
  
      const token = response.body.token
      jwt.verify(token, '4@re##', function (err, decode) {
        expect(err).to.be.null
        expect(decode).to.have.property('userName', user.userName)
      })
    })

    it('should return 404 when the user is not found', async function() {
      const app = await request(route)

      const user = {
        userName: 'uhuy',
        password: 'uhuy1'
      }

      const response = await app
      .post('/api/login')
      .send(user)

      expect(response.status).to.equal(404)
      expect(response.body).to.deep.equal({ msg: 'user not found'})
    })
  })

  describe('POST /register', () => {
    it('should return 201 and a success message when user is registered successfully', async () => {
      const response = await request(route).post('/api/register').send({
        userName: 'test',
        password: 'test1'
      })
      expect(response.status).to.equal(201)
      expect(response.body).to.deep.equal({ msg: 'User Register success' })
    })
  })

  describe('GET /user', () => {
    it('should return a list of users from the database when there is no cache in Redis', async () => {
      const redisClient = redis.createClient()
      const stub = sinon.stub(redisClient, 'get').resolves(null)
  
      const response = await request(route)
        .get('/api/user')
  
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
  
      stub.restore()
      redisClient.quit()
    });
  
    it('should return a list of users from the Redis cache when there is a cache', async () => {
      const redisClient = redis.createClient()
      const stub = sinon.stub(redisClient, 'get').resolves(JSON.stringify([
        {
          id: 1,
          name: 'John Doe'
        }
      ]))
  
      const response = await request(route)
        .get('/api/user')
  
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
  
      stub.restore()
      redisClient.quit()
    })
  })

  // describe('POST /user', () => {
  //   it('should return 201 and a success message when user is add successfully', async () => {
  //     const response = await request(route).post('/api/user').send({
  //       userName: "asep",
  //       accountNumber: "1239",
  //       emailAddress: "asep@gmail.com",
  //       identityNumber: "0009"
  //     })

  //     expect(response.status).to.equal(201)
  //     expect(response.body).to.deep.equal({ msg: 'User add success' })
  //   })
  // })

  // describe('PUT /user', () =>{
  //   it('should return 200 and a success message when user is update successfully', async () => {
  //     const response = await request(route).put('/api/user/652f4d79b76171e88d27422a').send({ //id harus ada yang di database
  //       userName: "udin edit",
  //       accountNumber: "123",
  //       emailAddress: "udin@gmail.com",
  //       identityNumber: "0001"
  //     })

  //     expect(response.status).to.equal(200)
  //     expect(response.body).to.deep.equal({msg: 'User Update success'})
  //   })
  // })

  // describe('DELETE /user', () => {
  //   it('should return 200 and a success message when user is Delete successfully', async () => {
  //     const response = await request(route).delete('/api/user/652f5db994261fe63cea17a2') //id harus yang ada di database

  //     expect(response.status).to.equal(200)
  //     expect(response.body).to.deep.equal({ msg: 'Delete Data Success' })
  //   })
  // })


})

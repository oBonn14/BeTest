const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const route = require('../index')
const jwt = require('jsonwebtoken')
const redis = require('ioredis')
const bcrypt = require('bcrypt')
const should = chai.should()


describe('User Routes', function () {
  describe('POST /login', function () {
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
})

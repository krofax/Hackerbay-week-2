import chai, { expect } from 'chai';
import request from 'request';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../../';

const should = chai.should();
chai.use(chaiHttp);

describe('Login/SignUp Routes', () => {
  // describe('POST /user/login', () => {
  //   it('it should POST a login ', done => {
  //     const params = {
  //       email: 'bunhouth99@gmail.com',
  //       password: '123456789',
  //     };
  //     chai
  //       .request(server)
  //       .post('/user/login')
  //       .send(params)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('token');
  //         done();
  //       });
  //   });
  // });
  // describe('POST /user/signup', () => {
  //   it('it should able to register new account', done => {
  //     const params = {
  //       email: 'bunhouth99@gmail.com',
  //       password: '123456789',
  //     };
  //     chai
  //       .request(server)
  //       .post('/user/signup')
  //       .send(params)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('token');
  //         done();
  //       });
  //   });
  // });
});

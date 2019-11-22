import { expect } from 'chai';
import bcrypt from 'bcrypt';

import { Users } from '../../models';

describe('Users Model', () => {
  it('should create a Users instance', (done) => {
    Users.create({
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'username',
      password: 'password',
      aboutme: 'cool',
      email: 'example@gmail.com',
      photo: ''
    }).then((user) => {
      expect(user.firstname).to.equal('Firstname');
      expect(user.lastname).to.equal('Lastname');
      expect(user.username).to.equal('username');
      expect(user.email).to.equal('example@gmail.com');
    }).catch(done());
  });

  it('should hash passwords before they are saved', (done) => {
    Users.create({
      username: 'username2',
      password: 'userpassword',
      email: 'example2@gmail.com',
      firstname: 'firstname',
      lastname: 'lastname'
    })
      .then((user) => {
        expect(user.password).to.not.equal('userpassword');
        done();
      }).catch(err => done(err));
  });

  it('should be able to check that password is same', (done) => {
    Users.create({
      username: 'username3',
      password: 'password',
      email: 'example3@gmail.com',
      firstname: 'firstname',
      lastname: 'lastname'
    })
      .then((user) => {
        expect(bcrypt.compareSync('password', user.password))
          .to.eql(true);
        done();
      }).catch(err => done(err));
  });
});

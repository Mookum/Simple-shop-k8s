import request from "supertest"
import { app } from "../../app"

it('Returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})


it('should return a 400 with a invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'Password'
    })
    .expect(400)
})


it('should return a 400 with a invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'P'
    })
    .expect(400)
})

it('should return a 400 with missing email and no password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be'
    })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password-with-no-email'
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(400)
})

it('should set a cookie after succesfull signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
});

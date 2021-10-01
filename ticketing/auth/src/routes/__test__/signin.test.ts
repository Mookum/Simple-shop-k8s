import request from "supertest"
import { app } from "../../app"

it('should fail when a email does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(400)
})

it('should fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.be',
      password: 'password'
    })
    .expect(400)
})

it('should response with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.be',
      password: 'Password'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
});

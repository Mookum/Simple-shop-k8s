import request from "supertest"
import { app } from "../../app"

it('should response with details about the current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'Password'
    })
    .expect(201)
  const cookie = authResponse.get('Set-Cookie')

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  //console.log(response.body)
  expect(response.body.currentUser.email).toEqual('test@test.com')

});

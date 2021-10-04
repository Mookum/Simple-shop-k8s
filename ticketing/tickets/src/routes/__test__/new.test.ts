import request from "supertest"
import { app } from '../../app'

it('should has a route handler listening to /api/tickets for post request', async function () {
  const response = await request(app)
    .post('/api/tickets')
    .send({})

  expect(response.status).not.toEqual(404)
});

it('should only be accessible if the user is logged in', async function () {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
});

it('should return a status other then 401 if the user is signed in', async function () {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getCookie())
    .send({})

  expect(response.status).not.toEqual(401)
});

it('should return an error if an invalid title is provided', async function () {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getCookie())
    .send({
      title: '',
      price: 10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getCookie())
    .send({
      price: 10
    })
    .expect(400)
});

it('should return an error if an invalid price is provided', async function () {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getCookie())
    .send({
      title: 'This is a title',
      price: -10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getCookie())
    .send({
      title: 'this is a title'
    })
    .expect(400)
});

it('should create a ticket with valid inputs', async function () {

});

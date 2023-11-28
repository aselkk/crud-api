import request from 'supertest';
import http from 'http';
import { handleUserRoutes } from '../src/routes/userRoutes';

describe('User API', () => {
  let server: http.Server;
  let createdUserId: string;

  beforeAll(() => {
    server = http.createServer((req, res) => {
      handleUserRoutes(req, res);
    });

    server.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('Scenario 1: Get all records with a GET api/users request (an empty array is expected)', (done) => {
    request(server)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toEqual([]);
      })
      .end(done);
  });

  test('Scenario 2: Create a new object by a POST api/users request (a response containing the newly created record is expected)', (done) => {
    request(server)
      .post('/api/users')
      .send({
        username: 'John Doe',
        age: 25,
        hobbies: ['Reading', 'Coding'],
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.username).toBe('John Doe');
        expect(response.body.age).toBe(25);
        expect(response.body.hobbies).toEqual(['Reading', 'Coding']);
        createdUserId = response.body.id;
      })
      .end(done);
  });

  test('Scenario 3: Get the created record by its id with a GET api/users/{userId} request (the created record is expected)', (done) => {
    request(server)
      .get(`/api/users/${createdUserId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.id).toBe(createdUserId);
        expect(response.body.username).toBe('John Doe');
        expect(response.body.age).toBe(25);
        expect(response.body.hobbies).toEqual(['Reading', 'Coding']);
      })
      .end(done);
  });

  test('Scenario 4: Update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)', (done) => {
    request(server)
      .put(`/api/users/${createdUserId}`)
      .send({
        username: 'Updated John Doe',
        age: 26,
        hobbies: ['Reading', 'Coding', 'Gaming'],
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.id).toBe(createdUserId);
        expect(response.body.username).toBe('Updated John Doe');
        expect(response.body.age).toBe(26);
        expect(response.body.hobbies).toEqual(['Reading', 'Coding', 'Gaming']);
      })
      .end(done);
  });

  test('Scenario 5: Delete the created record with a DELETE api/users/{userId} request (confirmation of successful deletion is expected)', (done) => {
    request(server)
      .delete(`/api/users/${createdUserId}`)
      .expect(204)
      .end(done);
  });

  test('Scenario 6: Get the deleted object by id with a GET api/users/{userId} request (expected answer is that there is no such object)', (done) => {
    request(server)
      .get(`/api/users/${createdUserId}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.error).toBe('User not found');
      })
      .end(done);
  });
});

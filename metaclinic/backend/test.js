const request = require('supertest');
const express = require('express');
const { admin, db } = require('./firebaseConfig');

// Mock Firebase Admin SDK
jest.mock('./firebaseConfig', () => ({
  admin: {
    auth: () => ({
      createUser: jest.fn().mockResolvedValue({ uid: 'test-uid' }),
      verifyIdToken: jest.fn().mockResolvedValue({ uid: 'test-uid' }),
    }),
  },
  db: {
    collection: (name) => ({
      add: jest.fn().mockResolvedValue({ id: 'test-event-id' }),
      get: jest.fn().mockResolvedValue({
        docs: [
          { id: 'event1', data: () => ({ description: 'event 1' }) },
          { id: 'event2', data: () => ({ description: 'event 2' }) },
        ],
      }),
      doc: (id) => ({
        get: jest.fn().mockResolvedValue({ exists: true }),
        update: jest.fn().mockResolvedValue(),
        delete: jest.fn().mockResolvedValue(),
      }),
    }),
  },
}));

const app = require('./server');

describe('Backend API', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('uid');
  });

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ idToken: 'test-token' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });

  it('should create a new health event', async () => {
    const res = await request(app)
      .post('/api/health-events')
      .send({ description: 'Test Event', location: { x: 1, y: 1, z: 1 }, severity: 5 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all health events', async () => {
    const res = await request(app).get('/api/health-events');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should update a health event', async () => {
    const res = await request(app)
      .put('/api/health-events/event1')
      .send({ description: 'Updated Event' });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a health event', async () => {
    const res = await request(app).delete('/api/health-events/event1');
    expect(res.statusCode).toEqual(200);
  });
});

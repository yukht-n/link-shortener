import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../server';

describe('Link Shortner API Integration', () => {
  it('POST /api/short-url should create a new short code', async () => {
    const longURL = { url: 'https://google.com', antiSpam: '' };

    const response = await request(app).post('/api/short-url').send(longURL);

    //Checking status-code
    expect(response.status).toBe(201);

    //Checking request obj
    expect(response.body).toHaveProperty('shortCode');
    expect(response.body.shortCode).toHaveLength(6);
  });
  it('POST /api/short-url should return 400 for invalid (without dot) URL', async () => {
    const response = await request(app)
      .post('/api/short-url')
      .send({ url: 'not-a-link', antiSpam: '' }); // without dot

    expect(response.status).toBe(400);
  });
  it('POST /api/short-url should return 400 for invalid (short) URL', async () => {
    const response = await request(app)
      .post('/api/short-url')
      .send({ url: 'i.u', antiSpam: '' }); // short url

    expect(response.status).toBe(400);
  });
  it('POST /api/short-url should return 400 for invalid (long) URL', async () => {
    const response = await request(app).post('/api/short-url').send({
      url: 'google.uk/malformed@invalid#url@string$with%special&characters*and(many)symbols!to~make^it_exactly+201=characters?long&more&padding&here&padding&more&padding&here&padding&more&padding&here&padding&more&padding&here&padding&more&padding&here&padding&more&padding&here&padding&more&padding&here&padding',
      antiSpam: '',
    }); // long url

    expect(response.status).toBe(400);
  });
});

describe('Redirect Logic Integration', () => {
  it('GET /:slug should redirect to the original URL', async () => {
    const longURL = { url: 'https://google.com', antiSpam: '' };

    const response = await request(app).post('/api/short-url').send(longURL);

    const { shortCode } = response.body;

    const resRedirect = await request(app).get(`/${shortCode}`);

    expect(resRedirect.status).toBe(301);
    expect(resRedirect.header.location).toBe(longURL.url);
  });

  it('GET /:slug should return 404 for non-existent code', async () => {
    const response = await request(app).get('/nonExi');

    expect(response.status).toBe(404);
  });
});

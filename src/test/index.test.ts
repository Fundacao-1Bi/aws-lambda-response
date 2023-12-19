import Responses from '../index';

describe('Responses object', () => {
  it('should be an object', () => {
    expect(typeof Responses).toBe('object');
  });

  const data = {
    name: 'test',
  };

  it('should return a string', () => {
    const res = Responses._200(data);
    expect(typeof res.body).toBe('string');
    const parsed = JSON.parse(res.body);
    expect(typeof parsed).toBe('object');
  });

  it('should return 200', () => {
    const res = Responses._200(data);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 200 with array', () => {
    const res = Responses._200([data]);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 200 with no data', () => {
    const res = Responses._200();
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 303', () => {
    const res = Responses._303(data);
    expect(res.statusCode).toBe(303);
    expect(typeof res.body).toBe('string');
    expect(JSON.parse(res.body).name).toBe('test');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 303 with no data', () => {
    const res = Responses._303();
    expect(res.statusCode).toBe(303);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 429', () => {
    const res = Responses._429('', data);
    expect(res.statusCode).toBe(429);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 429 with default message', () => {
    const res = Responses._429();
    expect(res.statusCode).toBe(429);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('Too many requests.');
  });

  it('should return 400', () => {
    const res = Responses._400('', data);
    expect(res.statusCode).toBe(400);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 400 with default message', () => {
    const res = Responses._400();
    expect(res.statusCode).toBe(400);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('There are missing or invalid parameters.');
  });

  it('should return 401', () => {
    const res = Responses._401('', data);
    expect(res.statusCode).toBe(401);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 401 with default message', () => {
    const res = Responses._401();
    expect(res.statusCode).toBe(401);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('Unauthorized.');
  });

  it('should return 404', () => {
    const res = Responses._404('', data);
    expect(res.statusCode).toBe(404);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 404 with default message', () => {
    const res = Responses._404();
    expect(res.statusCode).toBe(404);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('Resource not found.');
  });

  it('should return 403', () => {
    const res = Responses._403('', data);
    expect(res.statusCode).toBe(403);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return 403 with default message', () => {
    const res = Responses._403();
    expect(res.statusCode).toBe(403);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('Forbidden.');
  });

  it('should return 500 with custom message', () => {
    const res = Responses._500('custom message');
    expect(res.statusCode).toBe(500);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('custom message');
  });

  it('should return 500 with default message', () => {
    const res = Responses._500();
    expect(res.statusCode).toBe(500);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body).message).toBe('Internal server error occurred.');
  });

  const circularReferenceData = {};
});

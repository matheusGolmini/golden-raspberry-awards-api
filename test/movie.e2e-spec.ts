import request from 'supertest';
import { Express } from 'express';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponseAwardIntervalDto } from 'src/movie/dto/award-interval.dto';

describe('Award Intervals (e2e)', () => {
  let app: INestApplication<Express>;

  const getAwardIntervals = async () => {
    const httpServer = app.getHttpServer();
    const response = await request(httpServer)
      .get('/api/v1/awards/producers/intervals')
      .expect(200);

    return response.body as ResponseAwardIntervalDto;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Application should be defined', () => {
    expect(app).toBeDefined();
  });

  it('Should always return valid intervals', async () => {
    const body = await getAwardIntervals();

    body.min.forEach((item) => {
      expect(item.interval).toBe(item.followingWin - item.previousWin);
    });

    body.max.forEach((item) => {
      expect(item.interval).toBe(item.followingWin - item.previousWin);
    });
  });

  it('Should ensure the minimum interval is never greater than the maximum interval', async () => {
    const body = await getAwardIntervals();

    if (body.min.length && body.max.length) {
      expect(body.min[0].interval).toBeLessThanOrEqual(body.max[0].interval);
    }
  });

  it('Should ensure previousWin is less than or equal to followingWin', async () => {
    const body = await getAwardIntervals();

    body.min.forEach((item) => {
      expect(item.previousWin).toBeLessThanOrEqual(item.followingWin);
    });

    body.max.forEach((item) => {
      expect(item.previousWin).toBeLessThanOrEqual(item.followingWin);
    });
  });

  it('Should return a non-empty producer name', async () => {
    const body = await getAwardIntervals();

    [...body.min, ...body.max].forEach((item) => {
      expect(typeof item.producer).toBe('string');
      expect(item.producer.trim().length).toBeGreaterThan(0);
    });
  });
});

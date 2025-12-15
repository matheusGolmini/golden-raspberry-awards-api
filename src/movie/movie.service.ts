import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import {
  AwardIntervalDto,
  ResponseAwardIntervalDto,
} from './dto/award-interval.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getAwardIntervals(): Promise<ResponseAwardIntervalDto> {
    const winners = await this.movieRepository.find({
      where: { winner: true },
    });

    const produceWins = new Map<string, number[]>();

    for (const movie of winners) {
      const producers = movie.producers.split(/,| and /).map((p) => p.trim());

      for (const producer of producers) {
        if (!produceWins.has(producer)) {
          produceWins.set(producer, []);
        }
        produceWins.get(producer)!.push(movie.year);
      }
    }

    const intervals: AwardIntervalDto[] = [];

    for (const [producer, years] of produceWins.entries()) {
      if (years.length < 2) continue;

      years.sort((a, b) => a - b);

      for (let i = 1; i < years.length; i++) {
        intervals.push({
          producer: producer,
          interval: years[i] - years[i - 1],
          previousWin: years[i - 1],
          followingWin: years[i],
        });
      }
    }

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
}

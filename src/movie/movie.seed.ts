import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MovieSeed implements OnModuleInit {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async onModuleInit() {
    const count = await this.movieRepository.count();

    if (count > 0) {
      return;
    }

    await this.loadCsv();
  }

  private async loadCsv() {
    const filePath = path.join(__dirname, '../../data/movies.csv');
    const content = fs.readFileSync(filePath, 'utf-8');

    const lines = content.split('\n').slice(1);

    const movies = lines
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const [year, title, studios, producers, winner] = line.split(';');

        return this.movieRepository.create({
          year: Number(year),
          title,
          studios,
          producers,
          winner: winner?.trim().toLowerCase() === 'yes',
        });
      });

    await this.movieRepository.save(movies);
  }
}

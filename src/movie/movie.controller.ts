import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAwardIntervalDto } from './dto/award-interval.dto';

@ApiTags('Awards')
@Controller('api/v1/awards')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('producers/intervals')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Returns producers with min and max award intervals',
    type: ResponseAwardIntervalDto,
  })
  async getAwardIntervals(): Promise<ResponseAwardIntervalDto> {
    return this.movieService.getAwardIntervals();
  }
}

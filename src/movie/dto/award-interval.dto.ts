import { ApiProperty } from '@nestjs/swagger';

export class AwardIntervalDto {
  @ApiProperty({ example: 'Producer Name' })
  producer: string;

  @ApiProperty({ example: 1 })
  interval: number;

  @ApiProperty({ example: 2008 })
  previousWin: number;

  @ApiProperty({ example: 2009 })
  followingWin: number;
}

export class ResponseAwardIntervalDto {
  @ApiProperty({ type: [AwardIntervalDto] })
  min: AwardIntervalDto[];

  @ApiProperty({ type: [AwardIntervalDto] })
  max: AwardIntervalDto[];
}

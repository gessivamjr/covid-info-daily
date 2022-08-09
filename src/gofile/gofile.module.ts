import { Module } from '@nestjs/common';
import { GofileService } from './gofile.service';

@Module({
  providers: [GofileService],
})
export class GofileModule {}

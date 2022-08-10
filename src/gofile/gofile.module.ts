import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GofileService } from './gofile.service';

@Module({
  imports: [HttpModule],
  providers: [GofileService],
})
export class GofileModule {}

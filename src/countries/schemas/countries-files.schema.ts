import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountriesDocument = CountriesFiles & Document;

@Schema({ timestamps: true })
export class CountriesFiles {
  @Prop({ required: true })
  westernFilename: string;

  @Prop({ required: true })
  easternFilename: string;
}

export const CountriesSchema = SchemaFactory.createForClass(CountriesFiles);

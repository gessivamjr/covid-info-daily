import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountriesDocument = Countries & Document;

@Schema({ timestamps: true })
export class Countries {
  @Prop({ required: true, type: [String] })
  filename: string[];
}

export const CountriesSchema = SchemaFactory.createForClass(Countries);

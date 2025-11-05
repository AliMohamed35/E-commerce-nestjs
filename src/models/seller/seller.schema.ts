import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class Seller {
  userName: string;
  email: string;
  password: string;

  @Prop({ type: String, required: true })
  whatAppLink: string;
}

export const userSchema = SchemaFactory.createForClass(Seller); // convert class to schema

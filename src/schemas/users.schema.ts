import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import * as mongoose from "mongoose";

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({
  autoCreate: true,
  _id: true
})
export class User {
  @Prop({
    required: true,
    name: "first_name"
  })
  firstName: string

  @Prop({
    required: true,
    name: "last_name"
  })
  lastName: string

  @Prop()
  nickname: string

  @Prop({
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    required: true,
    unique: true,
  })
  rg: number

  @Prop({
    required: true,
    unique: true,
  })
  cpf: number

  @Prop({
    required: true,
    min: 3,
  })
  categories: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
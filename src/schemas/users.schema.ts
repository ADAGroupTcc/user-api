import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  description: string

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
  cpf: number

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    min: 3,
  })
  categories: string[]

  @Prop({
    default: new Date()
  })
  createdAt: Date

  @Prop({
    default: new Date()
  })
  updatedAt: Date

  @Prop({
    default: false
  })
  isDenunciated: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
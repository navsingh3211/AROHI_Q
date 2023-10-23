import { Schema, model } from 'mongoose';

const _schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      index: true
    },
    optionalMob:{
      type: String
    },
    name:{
      type: String,
      required: true,
      index: true
    },
    school:{
      type: String,
      required: true,
      index: true
    },
    userType:{
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'STUDENT'],
      required: true,
      index: true,
      default: 'STUDENT'
    },
    status: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);
_schema.index({ id: 1, status: 1 });
export default model('User', _schema);

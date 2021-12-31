import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
    trim: true,
  },
  email_address: {
    unique: true,
    type: String,
    required: true,
    min: 3,
    max: 100,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  home_address: {
    city: {
      type: String,
      min: 2,
      max: 85,
      trim: true,
    },
    zip_code: {
      type: String,
      min: 5,
      max: 10,
      trim: true,
    },
    address_1: {
      type: String,
      min: 4,
      max: 50,
      trim: true,
    },
    address_2: {
      type: String,
      min: 4,
      max: 50,
      trim: true,
    },
  },
  date_of_employment: {
    type: Date,
    default: Date.now,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  softDeleted: {
    type: Boolean,
    default: false,
  },
});

export interface Employee extends mongoose.Document {
  name: string;
  email_address: string;
  phone_number: string;
  home_address: {
    city: string;
    zip_code: string;
    address_1: string;
    address_2: string;
  };
  date_of_employment: Date;
  date_of_birth: Date;
}

import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email_address: {
    type: String,
    required: true,
    min: 3,
    max: 100,
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
      required: true,
      min: 2,
      max: 85,
    },
    zip_code: {
      type: String,
      required: true,
      min: 5,
      max: 10,
    },
    address_1: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    address_2: {
      type: String,
      min: 4,
      max: 50,
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
  date_of_emloyment: Date;
  date_of_birth: Date;
}

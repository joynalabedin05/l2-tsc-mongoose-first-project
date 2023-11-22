import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    validate: {
      validator: function(value: string){
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
    
      // console.log(value);
      },
      message: '{VALUE} is not capitalised',
    },
    required: [true, "firstname is required"],
    maxlength: [20, 'firstname cannot be more than 20 characters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
    validate: {
      validator: (value:string)=>
      validator.isAlpha(value),
      message: "{VALUE} is nit valid",
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender:{
    type: String,
    enum: {
      values:  ['male', 'female', 'other'],
      // message: "gender must be male, female or other",
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true,
  validate: {
    validator: (value:string)=>
    validator.isEmail(value),
    message: "{VALUE} is not valid email",
  },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A', 'B', 'AB', 'O', 'A+', 'B+', 'AB+', 'O+'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active",
  },
});

export const StudentModel = model<Student>('Student', studentSchema);

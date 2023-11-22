import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema joi validation

    // const joiValidationSchema = Joi.object({
    //   id: Joi.string(),
    //   name: {
    //     firstName: Joi.string().max(20).required(),
    //     middleName: Joi.string().max(20),
    //     lastName: Joi.string().max(20).required(),
    //   },
    //   gender: Joi.string().required().valid(['male', 'female', 'other']),
    // })

    const { student: studentData } = req.body;

    // const {error, value}=joiValidationSchema.validate(studentData);
    // console.log(error, value);

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
}
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'single student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}

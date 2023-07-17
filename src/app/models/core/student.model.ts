import {UserModel} from '@models/auth';
import {InformationStudentModel} from '@models/core';

export interface StudentModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isVisible: boolean;

  informationStudent: InformationStudentModel[];
  user: UserModel [];
}

export interface CreateStudentDto extends Omit<StudentModel, 'id'> {
}

export interface UpdateStudentDto extends Partial<Omit<StudentModel, 'id'>> {
}

export interface SelectStudentDto extends Partial<StudentModel> {
}

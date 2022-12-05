import FakeAuthProvider from './providers/authProviders/fakeAuthProvider'
import IAuthProvider from './providers/authProviders/iAuthProvider'
import FakeCodeRunner from './providers/codeRunner/fakeCodeRunner'
import { ICodeRunner } from './providers/codeRunner/iCodeRunner'
import Judge0 from './providers/codeRunner/judge0'
import ICourseRepository from './repositories/iCourseRepository'
import CourseRepositoryInMemory from './repositories/in-memory/courseRepositoryInMemory'
import UserAnswerStatisticRepositoryInMemory from './repositories/in-memory/userAnswerStatisticRepositoryInMemory'
import UserRepositoryInMemory from './repositories/in-memory/userRepositoryInMemory'
import IUserAnswerStatisticRepository from './repositories/iUserAnswerStatisticRepository'
import IUserRepository from './repositories/iUserRepository'
import CourseRepositoryJSON from './repositories/json/courseRepositoryJSON'
import UserAnswerStatisticRepositoryJSON from './repositories/json/userAnswerStatisticRepositoryJSON'
import UserRepositoryJSON from './repositories/json/userRepositoryJSON'
import CourseRepositoryMongoDB from './repositories/mongodb/courseRepositoryMongoDB'
import UserAnswerStatisticRepositoryMongoDB from './repositories/mongodb/userAnswerStatisticRepositoryMongoDB'
import UserRepositoryMongoDB from './repositories/mongodb/userRepositoryMongoDB'

interface Container {
  courseRepository: ICourseRepository
  codeRunner: ICodeRunner
  userAnswerStatisticRepository: IUserAnswerStatisticRepository
  userRepository: IUserRepository
  authProviders: Record<string, IAuthProvider>
}

const dev: Container = {
  courseRepository: new CourseRepositoryJSON(),
  codeRunner: new Judge0(),
  userAnswerStatisticRepository: new UserAnswerStatisticRepositoryJSON(),
  userRepository: new UserRepositoryJSON(),
  authProviders: {
    'fake-auth-provider': new FakeAuthProvider(),
  },
}

const test: Container = {
  courseRepository: new CourseRepositoryInMemory(),
  codeRunner: new FakeCodeRunner(),
  userAnswerStatisticRepository: new UserAnswerStatisticRepositoryInMemory(),
  userRepository: new UserRepositoryInMemory(),
  authProviders: {
    'fake-auth-provider': new FakeAuthProvider(),
  },
}

const prod: Container = {
  courseRepository: new CourseRepositoryMongoDB(),
  codeRunner: new Judge0(),
  userAnswerStatisticRepository: new UserAnswerStatisticRepositoryMongoDB(),
  userRepository: new UserRepositoryMongoDB(),
  authProviders: {
    'fake-auth-provider': new FakeAuthProvider(),
  },
}

export function container(): Container {
  const mode = process.env.MODE || 'dev'

  switch (mode) {
    case 'dev':
      return dev
    case 'test':
      return test
    case 'prod':
      return prod
    default:
      throw new Error('Invalid mode')
  }
}

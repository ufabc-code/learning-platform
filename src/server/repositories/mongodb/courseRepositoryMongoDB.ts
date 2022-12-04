import Course from 'server/entities/course'
import ICourseRepository from '../iCourseRepository'
import { configs } from './configs'
import clientPromise from './configs/mongodb'

class CourseRepositoryMongoDB implements ICourseRepository {
  private namespace = configs.namespace
  private collectionName = configs.collections.courses.name

  async save(course: Course): Promise<void> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    await db.collection(this.collectionName).updateOne(
      {
        id: course.id,
      },
      {
        $set: course,
      },
      {
        upsert: true,
      },
    )
  }

  async getAll(): Promise<Course[]> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const coursesData = await db
      .collection<Course>(this.collectionName)
      .find()
      .toArray()
    return coursesData.map((courseData) => new Course({ ...courseData }))
  }

  async delete(id: string): Promise<void> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    await db.collection(this.collectionName).deleteOne({ id })
  }

  async findById(id: string): Promise<Course | null> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const courseData = await db
      .collection<Course>(this.collectionName)
      .findOne({ id })
    if (!courseData) return null
    return new Course({ ...courseData })
  }
}

export default CourseRepositoryMongoDB

import { trpc } from 'utils/trpc'

function Student() {
  const coursesQuery = trpc.useQuery(['courses.getAll'])

  console.log({ data: coursesQuery.data })

  return (
    <div>
      <h1>Student</h1>
      {coursesQuery.data?.map((course) => (
        <a href={`/student/courses/${course.id}`} key={course.id}>
          {JSON.stringify(course.id, null, 2)}
        </a>
      ))}
    </div>
  )
}

export default Student

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { client, trpc } from "utils/trpc"

interface Course {
    id: string,
    title: string,
    description: string
    slug: string
    modules: any[]
}

function Courses() {
    const router = useRouter()
    const { id } = router.query

    const courseQuery = trpc.useQuery(['courses.get', { id: id as string }])
    const [course, setCourse] = useState<Course|null>(null)


    useEffect(() => {
        if(courseQuery.data){
            setCourse(courseQuery.data)
        }
    }, [courseQuery.data])

    if(!course) return null

    return (
        <div>
            {JSON.stringify(course, null, 2)}

            <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Titulo</label>
                <input 
                value={course.title}
                onChange={(e) => {
                    const newTitle = e.target.value
                    course.title = newTitle
                    setCourse({ ...course })
                }}
                type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Titulo" required/>
            </div>
        </div>
    )
}

export default Courses
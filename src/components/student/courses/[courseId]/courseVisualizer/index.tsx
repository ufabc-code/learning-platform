import Container from "components/container";
import { Accordion } from "flowbite-react";
import { useRouter } from "next/router";
import Course from "server/entities/course";
import Module from "server/entities/module";
import User from "server/entities/user";
import UserAnswerStatistic from "server/entities/userAnswerStatistic";
import IUserAnswerStatisticRepository from "server/repositories/iUserAnswerStatisticRepository";

interface CourseVisualizerProps {
    course: Course,
    user?: User,
    userAnswerStatistic?: UserAnswerStatistic[],
}

export default function CourseVisualizer({
    course, user, userAnswerStatistic }: CourseVisualizerProps
) {
    const router = useRouter()

    function isModuleCompleted(module: Module) {
        if(userAnswerStatistic == undefined)
            return false
        //verificar se o modulo está entre os que o usuario ja respondeu
        const userAnswerStatisticFiltered = userAnswerStatistic.filter((el) => el.moduleId == module.id && el.attempts > 0)

        return userAnswerStatisticFiltered.length > 0
    }

    function isModuleCompletedIcon(module: Module): JSX.Element {
        if (user == undefined || course == undefined)
            return (<svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>)

        if (isModuleCompleted(module))
            return (<svg className="w-6 h-6" fill="white" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>)

        return (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>)

    }

    return (
        <Container >
            <div className='my-auto flex text-3xl font-semibold dark:text-white'>{course.title}</div>
            <div className='my-auto flex text-base font-normal dark:text-white'>{course.description}</div>
            <div className='my-auto flex text-2xl font-semibold leading-loose dark:text-white'>Módulos</div>
            <Accordion alwaysOpen={true}>
                {course.modules.map((module) => (
                    <Accordion.Panel key={module.id}>
                        <Accordion.Title>
                            <span className='flex items-center'>
                                <>
                                    {isModuleCompletedIcon(module)} {module.title}
                                </>
                            </span>
                        </Accordion.Title>
                        <Accordion.Content>
                            <span className='flex text-base text-gray-900 dark:text-white justify-between'>
                                {module.description}
                                <button
                                    className="flex rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    type="button"
                                    onClick={() => router.push(`/student/courses/${course.id}/modules/${module.id}`)}
                                >
                                    Ir para este módulo
                                    <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </Container>
    )
}
/**
 * @jest-environment jest-environment-jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import Course from 'server/entities/course'
import Module from 'server/entities/module'
import CourseVisualizer from '.'


describe('<CourseVisualizer />', () => {
    //create modules
    const module1: Module = new Module({
        id: "1",
        title: "First New Module",
        description: "First New Module Description",
        lessons: []
    })
    const module2: Module = new Module({
        id: "2",
        title: "Second New Module",
        description: "Second New Module Description",
        lessons: []
    })
    // create course
    const course = new Course({
        id: '1',
        title: 'New Course',
        description: 'New Course Description',
        slug: 'new-course',
        modules: [module1, module2]
    })

    it('should render the course title and description', () => {
        render(<CourseVisualizer course={course} />)
        expect(screen.getByText('New Course')).toBeInTheDocument()
        expect(screen.getByText('New Course Description')).toBeInTheDocument()
    })

    it('should render the names of all the modules', () => {
        render(<CourseVisualizer course={course} />)
        expect(screen.getByText('First New Module')).toBeInTheDocument()
        expect(screen.getByText('Second New Module')).toBeInTheDocument()
    })

    it('should render the description of the clicked module, and hide when clicked again', () => {
        render(<CourseVisualizer course={course} />)
        expect(screen.getByText('First New Module Description')).toBeInTheDocument()
        expect(screen.queryByText('Second New Module Description')).toHaveProperty('hidden')
        fireEvent.click(screen.getByText('First New Module'))
        fireEvent.click(screen.getByText('Second New Module'))
        expect(screen.queryByText('First New Module Description')).toHaveProperty('hidden')
        expect(screen.getByText('Second New Module Description')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Second New Module'))
        expect(screen.getByText('Second New Module Description')).toBeInTheDocument()
    })
})
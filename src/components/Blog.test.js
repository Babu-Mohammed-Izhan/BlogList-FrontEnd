import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

test('renders content', () => {
    const blog = {
        "likes": 4,
        "title": "asiuhdo",
        "author": "akjsk",
        "url": "kajsfnck",
        "id": "60c777d1f07419033c7a24e3",
        "user": { "username": "izhan", "name": "izhan", "id": "60c45c8b14452a0c5068fe6a" }
    }

    const component = render(
        <Blog blog={blog} />
    )

    const title = component.container.querySelector('.title')
    expect(title).toHaveTextContent(
        'asiuhdo'
    )
    const author = component.container.querySelector('.author')
    expect(author).toHaveTextContent(
        "akjsk"
    )
})

test('clicking button twice, calls event handler twice', () => {
    const blog = {
        "likes": 4,
        "title": "asiuhdo",
        "author": "akjsk",
        "url": "kajsfnck",
        "id": "60c777d1f07419033c7a24e3",
        "user": { "username": "izhan", "name": "izhan", "id": "60c45c8b14452a0c5068fe6a" }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

describe("<Togglable />", () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="view">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('at start url and no. of likes are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, url and no. of likes are displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })
})

describe("BlogForm", () => {
    test("<BlogForm /> updates parent state and calls onSubmit", () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )


        const title = component.container.querySelector("#title")
        const author = component.container.querySelector("#author")
        const url = component.container.querySelector("#url")
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: "asiuhdo" }
        })
        fireEvent.change(author, {
            target: { value: "akjsk" }
        })
        fireEvent.change(url, {
            target: { value: "kajsfnck" }
        })
        fireEvent.submit(form)
        expect(createBlog.mock.calls[0][0]).toBe('akjsk')
        expect(createBlog.mock.calls[0][1]).toBe('asiuhdo')
        expect(createBlog.mock.calls[0][2]).toBe('kajsfnck')
    })
})
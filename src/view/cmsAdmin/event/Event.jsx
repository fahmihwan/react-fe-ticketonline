import { useEffect, useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Event = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        let response = [
            {
                id: 1,
                event_title: "dsdsds",
                img: "dsdsds",
                schedule: "18 november 2024",
                description: "loremipsum",
                categoryTickets: [
                    {
                        id: 1,
                        category_name: "earlybid",
                        price: 50000,
                        stock: 0
                    }

                ]
            },
            {
                id: 1,
                event_title: "dsdsds",
                img: "dsdsds",
                schedule: "18 november 2024",
                description: "loremipsum",
                categoryTickets: [
                    {
                        id: 1,
                        category_name: "earlybid",
                        price: 50000,
                        stock: 0
                    }

                ]
            },
            {
                id: 1,
                event_title: "dsdsds",
                img: "dsdsds",
                schedule: "18 november 2024",
                description: "loremipsum",
                categoryTickets: [
                    {
                        id: 1,
                        category_name: "earlybid",
                        price: 50000,
                        stock: 0
                    }

                ]
            },
        ]
        setData(response)
    }, [])

    return (
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5'>
                    <p className='text-3xl font-bold '>Event</p>
                    <Link to="/admin/event/create">
                        <Button color="blue">Add new event</Button>
                    </Link>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>No</th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Schedule
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                List Ticket
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length != 0 && data.map((d, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th>
                                    {i + 1}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    Apple MacBook Pro 17
                                </th>
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4">
                                    <Link
                                        to=""
                                        className="font-medium mr-5 text-yellow-400  hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                4
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                5
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </LayoutAdmin>
    )
}

export default Event
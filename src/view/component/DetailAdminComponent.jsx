import React from 'react'

const DetailAdminComponent = () => {
    return (
        <>
            <div className='flex items-center  justify-between px-5 '>
                <p className='text-3xl font-bold '>Detail</p>
            </div>
            <div className='w-full flex mb-5'>
                <div
                    className=" w-full flex mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <div className='border w-3/12 flex items-center p-2'>
                        <img src="http://127.0.0.1:8080/uploaded-images/image_20250102203640.png" alt="" />
                    </div>
                    <div className='w-9/12'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <tbody>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Event
                                        </th>
                                        <td className="px-2 py-4 w-52"> KECIL KECILAN SUKA CITA TEH DESA</td>
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Description
                                        </th>
                                        <td className="px-2   " rowSpan={3}>
                                            <div className=' h-[200px]'>
                                                KECIL KECILAN SUKA CITA TEH DESA Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ipsum tenetur quis doloremque natus dolorum excepturi veritatis optio provident molestias non, voluptatum sequi voluptate dolorem quasi itaque culpa eius nulla?
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate debitis commodi animi placeat aperiam iusto maiores, error quia laborum nemo quod odit magni autem corporis modi ad reprehenderit, fugit odio!

                                            </div>


                                        </td>
                                    </tr>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Schedule
                                        </th>
                                        <td className="px-2 py-4">KECIL KECILAN SUKA CITA TEH DESA</td>
                                    </tr>
                                    <tr className=" border-gray-200 ">
                                        <th
                                            scope="row"
                                            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                                        >
                                            Venue
                                        </th>
                                        <td className="px-2 py-4">KECIL KECILAN SUKA CITA TEH DESA</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <table >
                <tbody>
                    <tr>
                        <td>Event </td>
                        <td className='w-96'>:</td>

                        <td className='pl-20 block'>Description </td>
                        <td className='border pl-20 '>: KECIL KECILAN SUKA CITA TEH DESA Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ipsa quaerat fugiat eos at? Ut, molestias! Numquam molestias hic quos architecto, et quae a itaque necessitatibus ab accusantium eum velit!</td>
                    </tr>
                    <tr >
                        <td>Schedule </td>
                        <td>: KECIL KECILAN SUKA CITA TEH DESA</td>
                    </tr>
                    <tr>
                        <td>Venue </td>
                        <td>: KECIL KECILAN SUKA CITA TEH DESA</td>
                    </tr>
                </tbody>
            </table> */}


                </div>
            </div>
        </>

    )
}

export default DetailAdminComponent
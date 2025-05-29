import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { RadioEl, SelectEl, TextInputEl } from '../../component/InputEl'

import { IconTrashEl } from '../../component/IconSvg'
import DetailAdminComponent from '../../component/DetailAdminComponent'
import { useDispatch, useSelector } from 'react-redux'
import { createLineUp, getAllLineUpBySlug, removeLineUp } from '../../../redux/feature/lineUpSlice'
import { findBySlugWithCategoryTickets } from '../../../redux/feature/eventSlice'
import { formatBirthDateToBeInputUtil } from '../../../utils/utils'
import { getListChecker, registerChecker, removeChecker } from '../../../redux/feature/userSlice'
// import { getListChecker, registerChecker } f rom '../../../redux/feature/userSlice'




const CreateChecker = () => {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.detailEvent)
    const listChecker = useSelector((state) => state.user.listChecker)



    useEffect(() => {
        dispatch(findBySlugWithCategoryTickets({ slug: slug }))
        dispatch(getListChecker({ slug: slug }))

    }, [slug, dispatch])


    useEffect(() => {
        // listChecker
        // dispatch(getListChecker())
    }, [])

    const [formData, setFormData] = useState({
        gender: 'L',
        fullName: 'checker',
        email: 'checker@gmail.com',
        password: "",
        d_birth_date: '11',
        m_birth_date: 'July',
        y_birth_date: '1999',
        phone_number: '0823343',
        address: 'madin'
    });

    const handleSubmit = async () => {

        let payload = {
            fullName: formData?.fullName,
            email: formData?.email,
            gender: formData?.gender,
            birthDate: formatBirthDateToBeInputUtil(formData?.d_birth_date, formData?.m_birth_date, formData?.y_birth_date),
            phoneNumber: formData?.phone_number,
            address: formData?.address
        }

        dispatch(registerChecker({ payload: payload, slug: slug })).then((res) => {
            console.log(res);
            dispatch(getListChecker({ slug: slug }))
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name.includes('gender')) {
            name = 'gender'
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleDelete = async (id) => {
        const isDelete = confirm("Apakah anda ingin menghapus data?");
        if (isDelete) {
            await dispatch(removeChecker({ checkerId: id })).then((res) => {
                dispatch(getListChecker({ slug: slug }))
            })
        }
    }

    return (
        <>
            {/* <DetailAdminComponent /> */}
            <DetailAdminComponent
                image={events?.image} title={events?.event_title} schedule={events?.schedule} venue={events?.venue} description={events?.description} />
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-0'>
                    <p className='text-3xl font-bold '>Buat Akun  Checker</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block w-1/3 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >

                    <TextInputEl placeholder="Full name" handleChange={(e) => handleChange(e)} name="fullName" value={formData.fullName} />
                    <div className='w-full flex'>
                        <div className='w-full mr-5'>
                            <TextInputEl

                                placeholder="Email" handleChange={(e) => handleChange(e)} name="email" value={formData.email} />
                        </div>

                    </div>


                    <div className="w-full flex mb-5">
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formData.d_birth_date}
                                name="d_birth_date"
                                handleChange={(e) => handleChange(e)}
                                key={"day"} id={"day"} placeholder={"Birth Date"} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formData.m_birth_date}
                                key={"month"} id={"month"} placeholder="&nbsp;" name="m_birth_date"
                                handleChange={(e) => handleChange(e)} />
                        </div>
                        <div className="w-1/2 mr-2">
                            <SelectEl
                                selectedValue={formData.y_birth_date}
                                key={"year"} id={"year"} placeholder="&nbsp;" name="y_birth_date"
                                handleChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <TextInputEl placeholder="Phone number" handleChange={(e) => handleChange(e)} name="phone_number" value={formData.phone_number} />

                    <div>
                        <div className="mb-5">
                            <label
                                htmlFor="error"
                                className="block mb-2 text-sm font-medium "
                            >
                                Jenis Kelamin
                            </label>
                            <div className="flex w-full ">
                                <div className="w-1/2 mr-2">
                                    <RadioEl
                                        optionValue="L"
                                        selectedValue={formData.gender}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder={"Laki - laki"} name={"gender"} id={"L"} index={"L"} />
                                </div>
                                <div className="w-1/2">
                                    <RadioEl
                                        optionValue="P"
                                        selectedValue={formData.gender}
                                        handleChange={(e) => handleChange(e)}
                                        placeholder={"Perempuan"} name={"gender"} id={"P"} index={"P"} />
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='my-5 flex justify-end'>
                        <Link to="/admin/checker" className='mr-3'>
                            <Button >Back</Button>
                        </Link>
                        <Button color="blue" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>

                <div className='w-2/3 overflow-y-scroll  '>
                    <div className='py-5'>
                        <b>Account Checker</b>
                    </div>
                    <div className='h-full '>
                        <div className='h-[100px] '>
                            {/* {status == 'loading' ? 'wkwkw loading' : (
                                lineUp?.length != 0 && lineUp?.map((d, i) => (<TicketListCompt
                                    key={i}
                                    id={d?.id}
                                    talentName={d?.talentName}
                                    handleDelete={() => handleDelete(d?.id)}
                                />))
                            )} */}

                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Full Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Birth Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Gender
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Checker
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listChecker.map((d, i) => (
                                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                {/* <td className="px-6 py-4">{d.userId.fullName}</td>
                                                <td className="px-6 py-4">{d.userId.email}</td>
                                                <td className="px-6 py-4">{d.userId.birthDate}</td>
                                                <td className="px-6 py-4">{d.userId.gender}</td>
                                                <td className="px-6 py-4">{d.userId.phoneNumber}</td>
                                                <td className="px-6 py-4">{d.totalChecker}</td> */}
                                                <td className="px-6 py-4">
                                                    <Button
                                                        color='failure'
                                                        className='flex items-center justify-center align-middle'
                                                        onClick={(e) => handleDelete(d.id)}
                                                    >
                                                        <IconTrashEl color={"text-white"} /></Button>
                                                </td>
                                            </tr>

                                        ))}


                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div >
        </>



    )
}

export default CreateChecker

// const TicketListCompt = ({ id, talentName, handleDelete }) => {
//     return (
//         <div className='border p-5 w-full flex justify-between items-center'>
//             <div>
//                 <h1 className='font-bold'>{talentName}</h1>
//             </div>
//             <div>
//                 <Button
//                     color='failure'
//                     className='flex items-center justify-center align-middle'
//                     onClick={(e) => handleDelete(e)}
//                 >
//                     <IconTrashEl color={"text-white"} /></Button>
//             </div>
//         </div>

//     )
// }
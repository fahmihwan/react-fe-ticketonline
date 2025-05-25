import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { RadioEl, SelectEl, TextInputEl } from '../../component/InputEl'
import { useDispatch } from 'react-redux'
import { findUserById, updateUser } from '../../../redux/feature/userSlice'
import { formatBirthDateToBeInputUtil, formatBirthDateToFeInputUtil } from '../../../utils/utils'




const Profile = () => {
    const isAuth = JSON.parse(localStorage.getItem('auth'))
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        gender: '',
        fullName: '',
        email: '',
        password: "",
        d_birth_date: '',
        m_birth_date: '',
        y_birth_date: '',
        phone_number: '',
        address: ''
    });


    useEffect(() => {
        dispatch(findUserById({ userId: isAuth.userId })).then((res) => {
            const data = res.payload.data


            let birthdate = formatBirthDateToFeInputUtil(data?.birthDate)

            setFormData({
                gender: data?.gender,
                fullName: data?.fullName,
                email: data?.email,
                d_birth_date: parseInt(birthdate[0]),
                m_birth_date: birthdate[1],
                y_birth_date: birthdate[2],
                phone_number: data?.phoneNumber,
                address: data?.address
            })
        }).catch((err) => {

        });
    }, [])


    const handleSubmit = () => {
        let payload = {
            fullName: formData?.fullName,
            email: formData?.email,
            gender: formData?.gender,
            birthDate: formatBirthDateToBeInputUtil(formData?.d_birth_date, formData?.m_birth_date, formData?.y_birth_date),
            phoneNumber: formData?.phone_number,
            address: formData?.address
        }

        console.log(formData);
        dispatch(updateUser({ userId: isAuth.userId, payload: payload })).then((res) => {
            console.log(res);
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


    return (

        <>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold'>Profile</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block w-full lg:w-1/2 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                    <TextInputEl placeholder="Full name" handleChange={(e) => handleChange(e)} name="fullName" value={formData.fullName} />
                    <div className='w-full flex'>
                        <div className='w-full mr-5'>
                            <TextInputEl
                                readOnly={true}
                                placeholder="Email" handleChange={(e) => handleChange(e)} name="email" value={formData.email} />
                        </div>

                    </div>

                    {/* <InputDateEl placeholder={"Birth date"} /> */}
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
                        <Link to="/admin/event" className='mr-3'>
                            <Button  >cancel</Button>
                        </Link>
                        <Button color="blue" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>


            </div >
        </>



    )
}

export default Profile

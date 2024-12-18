import { useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { RadioEl, SelectEl, TextInputEl } from '../../component/InputEl'




const Profile = () => {


    const [formData, setFormData] = useState({
        increment_id: 0,
        gender: '',
        full_name: '',
        email: '',
        password: "",
        d_birth_date: '',
        m_birth_date: '',
        y_birth_date: '',
        phone_number: '',
        address: ''
    });


    const handleSubmit = () => {
        console.log(formData);
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
        <LayoutAdmin>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold'>Profile</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block w-full lg:w-1/2 mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                    <TextInputEl placeholder="Full name" handleChange={(e) => handleChange(e)} name="full_name" value={formData.full_name} />
                    <div className='w-full flex'>
                        <div className='w-1/2 mr-5'>
                            <TextInputEl placeholder="Email" handleChange={(e) => handleChange(e)} name="email" value={formData.email} />
                        </div>
                        <div className='w-1/2'>
                            <TextInputEl type='password' placeholder="Password" handleChange={(e) => handleChange(e)} name="password" value={formData.password} />
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

        </LayoutAdmin >
    )
}

export default Profile

import { useEffect, useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextareaEl, TextInputEl, UploadFileEl } from '../../component/InputEl'
import { createEvent, findEventBySlug, updateEvent } from '../../../api/event'
import slugify from 'slugify'
import { explodeFormatDateTimeToInputElementUtil } from '../../../utils/utils'


const CreateEvent = () => {
    const { slug } = useParams();

    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState('')


    const [formData, setFormData] = useState({
        event_title: "Euforia selatan",
        slug: "euforia-selatan",
        scheduleDate: "2025-05-10",
        scheduleTime: "06:24",
        venue: "dsds",
        image: null,
        description: "<p>dsd</p>",
        admin_id: 1
    });

    const fetch = async (slug) => {
        await findEventBySlug(slug)
            .then((res) => {
                const response = res.data;
                const { dateFormat, timeFormat } = explodeFormatDateTimeToInputElementUtil(response.schedule)
                setPreviewImg(response.image)
                setFormData({
                    event_title: response.eventTitle,
                    slug: response.slug,
                    scheduleDate: dateFormat,
                    scheduleTime: timeFormat,
                    venue: response.venue,
                    image: "",
                    description: response.description,
                    admin_id: 1
                })

            })
            .catch((err) => alert(err))
    }

    useEffect(() => {
        if (slug) {
            fetch(slug)
        }
    }, [])


    const handleChange = (e) => {
        let { name, value } = e.target
        if (name == 'event_title') {
            const generatedSlug = slugify(value, {
                lower: true, // Mengubah huruf menjadi kecil
                strict: true, // Menghapus karakter non-alfanumerik
            });
            setFormData({
                ...formData, event_title: value, slug: generatedSlug
            })
        } else if (name == "image") {
            const file = e.target.files[0]

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result)
            };
            reader.readAsDataURL(file);

            setFormData({
                ...formData, image: file,
            })
        } else {
            setFormData({
                ...formData, [name]: value
            })
        }

    }

    const handleSubmit = async (paramsSlug) => {
        const dateString = `${formData.scheduleDate} ${formData.scheduleTime}`;
        const isoDateString = dateString.replace(" ", "T");
        const dateTime = new Date(isoDateString);
        const isoString = dateTime.toISOString().split('Z')[0]; //convert LocalDateTime
        const isUpdate = paramsSlug;

        if (typeof isUpdate !== 'undefined') {
            await updateEvent({
                event_title: formData?.event_title,
                schedule: isoString,
                slug: formData?.slug,
                venue: formData?.venue,
                image: formData?.image,
                description: formData?.description,
                admin_id: 1,
                paramsSlug: paramsSlug
            }).then((res) => {
                if (res.success) {
                    navigate('/admin/event')
                }
            })

        } else {
            await createEvent({
                event_title: formData?.event_title,
                schedule: isoString,
                slug: formData?.slug,
                venue: formData?.venue,
                image: formData?.image,
                description: formData?.description,
                admin_id: 1
            }).then((res) => {
                if (res.success) {
                    navigate('/admin/event')
                }
            })
        }




    }




    return (
        <LayoutAdmin>

            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold '>{slug ? "Edit Event" : "Create Event"}</p>
                </div>
            </div>
            <div className='w-full flex'>
                <div
                    className="block md:w-full lg:w-1/2   mr-5  p-6 bg-white border border-gray-200 rounded-lg shadow  "
                >
                    <form
                        action=""
                        method="dialog"
                        encType="multipart/form-data"
                        onSubmit={() => handleSubmit(slug)}
                    >


                        <TextInputEl
                            placeholder="Event title"
                            handleChange={(e) => handleChange(e)}
                            name="event_title"
                            value={formData?.event_title}
                        />
                        <TextInputEl
                            placeholder="Slug"
                            handleChange={(e) => handleChange(e)}
                            readOnly={true}

                            name="slug"
                            value={formData?.slug}
                        />
                        <UploadFileEl
                            placeholder="Upload image"
                            // handleChange={(e) => setFormData({ ...formData, "image": e.target.files[0] })}
                            handleChange={(e) => handleChange(e)}
                            name="image"
                        // value={formData?.image}
                        />
                        <TextareaEl placeholder="Venue"
                            handleChange={(e) => handleChange(e)}
                            name="venue"
                            value={formData?.venue}
                        />

                        <div className='w-full flex'>
                            <div className='mr-2 w-9/12'>
                                <InputDateEl
                                    placeholder="Schedule"
                                    handleChange={(date) => {
                                        const year = date.getFullYear()
                                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan leading zero untuk bulan
                                        const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero untuk hari
                                        const formattedDate = `${year}-${month}-${day}`;
                                        console.log(formattedDate);
                                        setFormData({ ...formData, "scheduleDate": formattedDate })
                                    }}
                                    value={formData?.scheduleDate}
                                />
                            </div>
                            <div className='w-3/12'>
                                <InputTimeEl
                                    placeholder="Time"
                                    handleChange={(e) => handleChange(e)}
                                    name="scheduleTime"
                                    value={formData?.scheduleTime}
                                />
                            </div>
                        </div>
                        <div>
                            <InputCKEditorEl
                                value={formData?.description}
                                placeholder="Description"
                                handleChange={(event, editor) => {
                                    setFormData({ ...formData, "description": editor.getData() })
                                }}
                            />
                        </div>
                        <div className='my-5 flex justify-end'>
                            <Link to="/admin/event" className='mr-3'>
                                <Button  >cancel</Button>
                            </Link>
                            <Button color="blue" type='submit'>{slug ? 'Update' : 'Submit'}</Button>
                            {/* <Button color="blue" onClick={() => handleSubmit(slug)}>{slug ? 'Update' : 'Submit'}</Button> */}
                        </div>
                    </form>
                </div>
                <div>
                    <img src={previewImg} className='w-full h-auto max-w-xl rounded-lg' alt="" />

                </div>


            </div>



        </LayoutAdmin>
    )
}

export default CreateEvent
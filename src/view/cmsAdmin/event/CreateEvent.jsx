import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextareaEl, TextInputEl, UploadFileEl } from '../../component/InputEl'
import { createEvent, findEventBySlug } from '../../../api/event'
import slugify from 'slugify'
import { explodeFormatDateTimeToInputElementUtil } from '../../../utils/utils'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventBySlug, updateEvent } from '../../../redux/feature/eventSlice'



const CreateEvent = () => {
    const dispatch = useDispatch()
    const detailEvent = useSelector((state) => state.event.detailEvent || [])


    const { slug } = useParams();

    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState('')
    const [eventTitle, setEventTitle] = useState("");
    const [newSlug, setNewSlug] = useState("");
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [scheduleTime, setScheduleTime] = useState('');
    const [venue, setVenue] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [adminId, setAdminId] = useState(1);



    useEffect(() => {

        if (slug) {
            dispatch(fetchEventBySlug({ slug: slug })).then((res) => {
                let data = res.payload.data
                const { dateFormat, timeFormat } = explodeFormatDateTimeToInputElementUtil(data.schedule)
                setPreviewImg(data.image)
                setEventTitle(data.eventTitle || "");
                setNewSlug(data.slug || "");
                setScheduleDate(dateFormat || "");
                setScheduleTime(timeFormat || "");
                setVenue(data.venue || "");
                setImage(data.image || null);
                setDescription(data.description || "");
                setAdminId(1)
            })
        } else {
            resetForm()
        }
    }, [slug])


    const handleSubmit = async (paramsSlug) => {
        const dateString = `${scheduleDate} ${scheduleTime}`;
        const dateTime = moment(dateString, 'YYYY-MM-DD HH:mm');
        const isoString = dateTime.format('YYYY-MM-DDTHH:mm');

        const isUpdate = paramsSlug;

        if (typeof isUpdate !== 'undefined') {

            let payload = {
                event_title: eventTitle,
                schedule: isoString,
                slug: newSlug,
                venue: venue,
                image: image,
                description: description,
                admin_id: 1,
            }

            const result = await dispatch(updateEvent({ payload: payload, slug: paramsSlug }))
            if (result?.payload?.success) {
                resetForm()
                navigate('/admin/event')
            }
        } else {
            let payload = {
                event_title: eventTitle,
                schedule: isoString,
                slug: newSlug,
                venue: venue,
                image: image,
                description: description,
                admin_id: 1,
            }
            const result = await dispatch(createEvent({ payload: payload }))
            if (result?.payload?.success) {
                resetForm()
                navigate('/admin/event')
            }
        }
    }



    const resetForm = () => {
        setPreviewImg('');
        setEventTitle('');
        setNewSlug('');
        setScheduleDate(new Date());
        setScheduleTime('');
        setVenue('');
        setImage(null);
        setDescription('');
    };


    return (
        <>
            <div className='w-full'>
                <div className='flex items-center  justify-between px-5 mb-5'>
                    <p className='text-3xl font-bold '>{slug ? "Edit Event" : "Create Event"}</p>
                </div>
            </div>
            <div className='w-full xl:flex'>
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
                            handleChange={(e) => {

                                let value = e.target.value
                                const generatedSlug = slugify(value, {
                                    lower: true, // Mengubah huruf menjadi kecil
                                    strict: true, // Menghapus karakter non-alfanumerik
                                });
                                setEventTitle(value)
                                setNewSlug(generatedSlug)
                            }}
                            name="event_title"
                            value={eventTitle}
                        />
                        <TextInputEl
                            placeholder="Slug"
                            handleChange={(e) => setNewSlug(e.target.value)}
                            readOnly={true}
                            name="slug"
                            value={newSlug}
                        />
                        <UploadFileEl
                            placeholder="Upload image"
                            handleChange={(e) => {
                                const file = e.target.files[0]

                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setPreviewImg(reader.result)
                                };
                                reader.readAsDataURL(file);

                                setImage(file)
                            }}
                            name="image"


                        />
                        <TextareaEl placeholder="Venue"
                            handleChange={(e) => setVenue(e.target.value)}
                            name="venue"
                            value={venue}
                        />

                        <div className='w-full flex'>
                            <div className='mr-2 w-9/12'>
                                <InputDateEl
                                    placeholder="Schedule"
                                    handleChange={(date) => {
                                        console.log(date);
                                        const formattedDate = moment(date).format('YYYY-MM-DD');
                                        setScheduleDate(formattedDate)
                                    }}
                                    value={scheduleDate}
                                />
                            </div>
                            <div className='w-3/12'>
                                <InputTimeEl
                                    placeholder="Time"
                                    handleChange={(e) => {
                                        console.log(e.target.value);

                                        // const formattedTime = moment(e.target.value).format('HH:mm');
                                        // const dateTime = moment(e.target.value, 'HH:mm');
                                        // const isoString = dateTime.toISOString().split('Z')[0];  // Menghilangkan 'Z' dari hasil ISO string

                                        // console.log(dateTime);
                                        setScheduleTime(e.target.value)
                                    }}
                                    name="scheduleTime"
                                    value={scheduleTime}
                                />
                            </div>
                        </div>
                        <div>
                            <InputCKEditorEl
                                value={description}
                                placeholder="Description"
                                handleChange={(event, editor) => {
                                    setDescription(editor.getData())
                                }}
                            />
                        </div>
                        <div className='my-5 flex justify-end'>
                            <Link to="/admin/event" className='mr-3'>
                                <Button  >cancel</Button>
                            </Link>
                            <Button color="blue" type='submit'>{slug ? 'Update' : 'Submit'}</Button>
                        </div>
                    </form>
                </div>
                <div>
                    <img src={previewImg} className='w-full h-auto max-w-xl rounded-lg' alt="" />

                </div>
            </div >
        </>
    )
}

export default CreateEvent
import { useEffect, useState } from 'react'
import LayoutAdmin from '../../layouts/LayoutAdmin'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Datepicker } from 'flowbite-react'
import { InputCKEditorEl, InputDateEl, InputTimeEl, TextareaEl, TextInputEl, UploadFileEl } from '../../component/InputEl'
import { createEvent, findEventBySlug, updateEvent } from '../../../api/event'
import slugify from 'slugify'
import { explodeFormatDateTimeToInputElementUtil } from '../../../utils/utils'
import moment from 'moment'
import { Bold, Essentials, ClassicEditor, Italic, Mention, Paragraph, Undo } from 'ckeditor5'
import { CKEditor } from '@ckeditor/ckeditor5-react'



const CreateEvent = () => {
    const { slug } = useParams();

    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState('')


    // const [formData, setFormData] = useState({
    //     event_title: null,
    //     slug: null,
    //     scheduleDate: new Date(),
    //     scheduleTime: null,
    //     venue: null,
    //     image: null,
    //     description: null,
    //     admin_id: 1
    // });
    const [eventTitle, setEventTitle] = useState("");
    const [newSlug, setNewSlug] = useState("");
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [scheduleTime, setScheduleTime] = useState(new Date());

    const [venue, setVenue] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [adminId, setAdminId] = useState(1);


    const fetch = async (slug) => {
        await findEventBySlug(slug)
            .then((res) => {
                const response = res.data;
                const { dateFormat, timeFormat } = explodeFormatDateTimeToInputElementUtil(response.schedule)

                setPreviewImg(response.image)
                setEventTitle(response.eventTitle || "");
                setNewSlug(response.slug || "");
                setScheduleDate(dateFormat || "");
                setScheduleTime(timeFormat || "");
                setVenue(response.venue || "");
                setImage(response.image || null);  // Default image adalah null
                setDescription(response.description || "");
                setAdminId(1)

            })
            .catch((err) => alert(err))
    }

    useEffect(() => {
        if (slug) {
            fetch(slug)
        }
    }, [slug])



    const handleSubmit = async (paramsSlug) => {
        const dateString = `${scheduleDate} ${scheduleTime}`;
        const isoDateString = dateString.replace(" ", "T");
        const dateTime = new Date(isoDateString);
        const isoString = dateTime.toISOString().split('Z')[0];
        //convert LocalDateTime
        const isUpdate = paramsSlug;

        if (typeof isUpdate !== 'undefined') {
            await updateEvent({
                event_title: eventTitle,
                schedule: isoString,
                slug: newSlug,
                venue: venue,
                image: image,
                description: description,
                admin_id: 1,
                paramsSlug: paramsSlug
            }).then((res) => {
                if (res.success) {
                    navigate('/admin/event')
                }
            })

        } else {
            await createEvent({
                event_title: eventTitle,
                schedule: isoString,
                slug: newSlug,
                venue: venue,
                image: image,
                description: description,
                admin_id: 1,
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
                                        const formattedDate = moment(date).format('YYYY-MM-DD');
                                        setScheduleDate(formattedDate)
                                    }}
                                    value={scheduleDate}
                                />
                            </div>
                            <div className='w-3/12'>
                                <InputTimeEl
                                    placeholder="Time"
                                    handleChange={(e) => setScheduleTime(e)}
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



        </LayoutAdmin >
    )
}

export default CreateEvent
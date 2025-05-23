
import { Datepicker } from 'flowbite-react';
import dateJson from '../../data/date.json';
import paymentJson from '../../data/paymentType.json';
import { IconGederMenEl, IconGenderWomenEl, IconTimeEl } from './IconSvg';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';


export const TextInputEl = ({ type = 'text', positionDiv, name, id, required, placeholder, handleChange, value, readOnly = false, className, isError, messageInfo = "" }) => {
    return (
        <div className={`mb-5 ${positionDiv} `}>
            <label
                htmlFor="error"
                className="block mb-2 text-sm font-medium "
            >
                {placeholder}
            </label>
            <input
                type={type}
                required={required}
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                readOnly={readOnly}
                name={name}
                className={`${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : "border-gray-300"}
               text-sm rounded-lg border h-12  block w-full p-2.5  ${readOnly && "bg-gray-200"}`}
                placeholder={placeholder}
            />
            {messageInfo && (<p className="text-sm mt-1 ml-1 text-gray-500 ">
                {messageInfo}
            </p>)}
            {isError && (<b className="mt-2 text-sm text-red-600 dark:text-red-500">
                Wajib diisi
            </b>)}
        </div>
    )
}



export const TextareaEl = ({ name, id, required, placeholder, handleChange, value, readOnly = false, className, isError = "" }) => {
    return (

        <div className="mb-5">
            <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {placeholder}
            </label>
            <textarea
                rows={4}
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                name={name}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your thoughts here..."

            />
        </div>
    )
}



export const TextInputSearchEl = (type = 'search', name, id, placeholder, handleChange, value, readOnly = false, className, isError = "") => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                type={type}
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                name={name}
                className="block w-full p-4 h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Cari nama event"
            />
        </div>
    )
}

export const UploadFileEl = ({ name, id, required, placeholder, handleChange, value, readOnly = false, className, isError = "" }) => {
    return (
        <div className='mb-5'>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                {placeholder}
            </label>

            <input
                type="file"
                id={id}
                onChange={(e) => handleChange(e)}
                value={value}
                name={name}
                className="block w-full  mb-8 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
            />
        </div>

    )
}


export const RadioEl = ({ name, id, required, placeholder, handleChange, selectedValue, optionValue, index, readOnly, messageInfo, isError, whichMessageError }) => {

    let mergeError = id
    let svg = ""
    if (id == "L") {
        svg = <IconGederMenEl />

    } else if (id == "P") {
        svg = <IconGenderWomenEl />
    }
    name += index;
    id += index


    // console.log();
    return (
        <>
            <input
                type="radio"
                id={id}
                name={name}
                disabled={readOnly}
                checked={optionValue == selectedValue}
                value={optionValue}
                className="hidden peer bg-gray-500"
                onChange={(e) => handleChange(e)}
            />
            <label
                htmlFor={id}
                // className={` ${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : "border-gray-300"}
                // text-sm rounded-lg border h-12  block w-full p-2.5  ${readOnly && "bg-gray-200"}`}

                className={`
                ${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : `${readOnly ? "bg-gray-200" : "bg-white"}  border-gray-200`}
                inline-flex border
                h-12 items-center justify-between w-full p-5 text-gray-500  rounded-lg cursor-pointer ${optionValue == selectedValue && "peer-checked:border-blue-600 peer-checked:text-blue-600"} hover:text-gray-600 hover:bg-gray-100 `}

            // className={`inline-flex h-12 items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer ${optionValue == selectedValue && "peer-checked:border-blue-600 peer-checked:text-blue-600"} hover:text-gray-600 hover:bg-gray-100 `}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="w-full">{placeholder}</div>
                    {svg}
                </div>
            </label>
            {messageInfo && (<p className="text-sm mt-1 ml-1 text-gray-500 ">
                {messageInfo}
            </p>)}
            {isError && whichMessageError == 1 && (<b className="mt-2 text-sm text-red-600 dark:text-red-500">
                Wajib diisi
            </b>)}
        </>)
}






export const PaymentRadioBtnEl = ({ name, id, required, placeholder, handleChange, selectedValue, optionValue, readOnly = false, className, messageInfo, isError = "", index, img }) => {

    return (
        <>
            <input
                type="radio"
                id={id}
                name={name}
                checked={optionValue == selectedValue}
                value={optionValue}
                className="hidden peer"
                onChange={(e) => handleChange(e)}
            />
            <label
                htmlFor={id}
                className={`inline-flex h-[60px] items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer ${optionValue == selectedValue && "peer-checked:border-blue-600 peer-checked:text-blue-600"} hover:text-gray-600 hover:bg-gray-100 `}
            >
                <div className="flex justify-between items-center w-full ">
                    <div className="w-full">{placeholder}</div>
                    <div className=''>
                        <img src={img} alt="" width={100} />
                    </div>
                </div>
            </label>
        </>)
}

export const SelectEl = ({ type = 'text', name, id, required, placeholder, selectedValue, handleChange, value, readOnly = false, className, isError, messageInfo, whichMessageError }) => {

    let data = [];
    if (name == 'd_birth_date') {
        data = dateJson.day
    } else if (name == 'm_birth_date') {
        data = dateJson.month
    } else if (name == 'y_birth_date') {
        data = dateJson.year
    } else if (name == "transaction_status") {
        data = paymentJson.data_payment_status
    }

    if (data[0] != "select") {
        data.unshift("select")
    }

    return (
        <>
            {
                placeholder && (<label
                    htmlFor={id}
                    className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                    {placeholder}
                </label>)
            }
            <select
                id={id}
                disabled={readOnly}
                name={name}
                value={selectedValue}
                onChange={(e) => handleChange(e)}
                // 

                // className={`${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : "bg-white border-gray-200"}`}
                className={`
                    border h-12 text-sm rounded-lg
                    ${isError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700  focus:ring-red-500  focus:border-red-500" : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 "} block w-full p-2.5
                    ${readOnly && "bg-gray-200"}`}

            // className=" border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
                {
                    (() => {
                        if (name === 'transaction_status') {
                            return data?.map((d, i) => (
                                <option key={i} value={d.statusName}>
                                    {d.title}
                                </option>
                            ));
                        } else {
                            return data?.map((d, i) => (
                                <option key={i} value={d}>
                                    {d}
                                </option>
                            ))
                        }
                    })()
                }
            </select>
            {messageInfo && (<p className="text-sm mt-1 ml-1 text-gray-500 ">
                {messageInfo}
            </p>)}
            {isError && whichMessageError == 1 && (<b className="mt-2 text-sm text-red-600 dark:text-red-500">
                Wajib diisi
            </b>)}
        </>
    )
}



export const InputTimeEl = ({ placeholder, name, handleChange, value, className }) => {
    return (<>
        <label
            htmlFor="time"
            className={`block mb-2 text-sm font-medium  ${className}`}
        >
            {placeholder}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <IconTimeEl />
            </div>
            <input
                name={name}
                type="time"
                onChange={(e) => handleChange(e)}
                value={value}
                id="time"
                className="bg-gray-50 h-12 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

            />
        </div>
    </>
    )
}


export const InputDateTimePickerEl = ({ placeholder, name, handleChange, value, className }) => {

    return (
        <>

            <label
                htmlFor="time"
                className="block mb-1  ext-sm font-medium text-gray-900 dark:text-white"
            >
                {placeholder}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <DateTimePicker onChange={(e) => handleChange(e)}
                        // onChange={handleDateChange}
                        value={value}
                        className="border !w-full mb-5" // Menghilangkan border


                        // className={"border-0"}
                        clearIcon={null} // Untuk menghilangkan ikon clear
                        disableClock={true}
                    />
                </div>

            </div>
        </>

    )


}


export const InputDateEl = ({ placeholder, handleChange, value, className }) => {

    return (<div className='mb-5 '>
        <label
            className="block mb-1  ext-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
        >
            {placeholder}
        </label>
        {/* <Datepicker
            placeholder="Select date"
            onChange={(e) => handleChange(e)}
            style={{ height: "48px" }}
            value={new Date(value)}
        // {...(!isNaN(new Date(value).getTime()) ? { value: new Date(value) } : {})}

        /> */}
        <Datepicker
            placeholder="Select date"
            dateFormat="dd/MM/yyyy"
            onChange={(e) => handleChange(e)}
            style={{ height: "48px" }}
            value={value}
        />
    </div>)
}

export const InputCKEditorEl = ({ handleChange, value, placeholder }) => {
    return (
        <div>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                {placeholder}
            </label>
            <CKEditor
                editor={ClassicEditor}
                // style={{ height: "400px" }}
                data={value || ''}
                config={{
                    toolbar: {
                        items: ['undo', 'redo', '|', 'bold', 'italic'],
                    },
                    plugins: [
                        Bold, Essentials, Italic, Mention, Paragraph, Undo, Paragraph
                    ],
                    // licenseKey: '<YOUR_LICENSE_KEY>',
                    mention: {
                        // Mention configuration
                    },
                    initialData: value,
                }}
                onChange={(event, editor) => handleChange(event, editor)}
            />
        </div>

    )
}
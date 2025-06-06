import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react'
import { TextInputEl } from '../../component/InputEl';
import { useDispatch } from 'react-redux';
import { scanTicket } from '../../../redux/feature/ checkerSlice';

const ScanTicket = () => {

    const auth = JSON.parse(localStorage.getItem('auth'))

    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null)
    const [qrOn, setQrOn] = useState(true);
    const dispatch = useDispatch()

    const [isSuccessCheck, setIsSuccessCheck] = useState(null)
    // 

    const [isSacnned, setIsScanned] = useState(false)
    const [isInputCode, setIsInputCode] = useState(false)

    const [inputCode, setInputCode] = useState('QR250531002820TK1')


    // Result
    const [scannedResult, setScannedResult] = useState("");

    // Success
    const onScanSuccess = (result) => {
        // 🖨 Print the "result" to browser console.
        // console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);
    };

    // useEffect(() => {
    //     console.log(scannedResult, 'wkwkw');
    // }, [scannedResult])

    // Fail
    const onScanFail = (err) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect(() => {

        if (isSacnned) {
            // if (videoEl?.current && !scanner.current) {
            // 👉 Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
                highlightCodeOutline: true,
                // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
            });

            // 🚀 Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // 🧹 Clean up on unmount.
        // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            scanner?.current?.stop();
        };

    }, [isSacnned]);

    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);


    const handleSubmitCode = () => {

        let payload = {
            ticket_code: inputCode,
            userId: auth.userId
        }
        dispatch(scanTicket({ payload: payload })).then((res) => {
            console.log(res)
        })


        setIsInputCode(false)
    }

    // console.log(!isSacnned || !isInputCode);

    return (
        <div className='w-full block lg:flex'>
            <div className='w-full lg:w-1/2 border'>
                <div className='flex justify-center  items-center w-full h-[600px]'>


                    {
                        !isSacnned && !isInputCode ? (
                            <>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setIsScanned(true)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Click untuk Scan !
                                    </button>
                                    <button
                                        type="button"

                                        onClick={() => setIsInputCode(true)}
                                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Input Kode Manual
                                    </button>

                                </div>


                            </>


                        ) : ''
                    }

                    {
                        isInputCode && (
                            <>
                                <div className="w-full mx-20">
                                    <label
                                        htmlFor="default-search"
                                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                    >
                                        Search
                                    </label>
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
                                            type="search"
                                            onChange={(e) => setInputCode(e.target.value)}
                                            value={inputCode}
                                            id="default-search"
                                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Input kode manual"
                                            required=""
                                        />
                                        <button
                                            type="submit"
                                            onClick={() => handleSubmitCode()}
                                            className="text-white w-[100px] absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Scan
                                        </button>
                                    </div>
                                </div>

                            </>
                        )
                    }



                    {isSacnned && (

                        <div className='flex  flex-col'>


                            <div className="qr-reader" >
                                <video ref={videoEl}></video>
                                <div ref={qrBoxEl} className="qr-box">
                                    {!videoEl?.current && (
                                        <img
                                            src="/static/images/icons/scan_qr1.svg"
                                            alt="Qr Frame"
                                            width={256}
                                            height={256}
                                            className="qr-frame"
                                        />
                                    )}
                                </div>
                                {scannedResult}
                                {scannedResult && (
                                    <p
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            zIndex: 99999,
                                            color: "white",
                                        }}>
                                        Scanned Result: {scannedResult}
                                    </p>
                                )}
                            </div >

                            <button
                                onClick={() => setIsScanned(false)}
                                type="button"
                                className="focus:outline-none mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Stop Scan
                            </button>

                        </div>
                    )}






                </div>
            </div>
            <div className='w-1/2  flex border-r border-b border-t justify-center items-center'>
                <div>
                    <p className='text-2xl mb-2 text-center'>STATUS TIKET</p>

                    <p className='text-5xl text-green-500 text-center'>SUCCESS</p>

                    {/* <p className='text-5xl text-red-500 text-center'>TIDAK DITEMUKAN</p> */}
                </div>

                {/* , SUDAH DIGUNAKAN, TIDAK DITEMUKAN */}
            </div>
        </div>
    );
}

export default ScanTicket


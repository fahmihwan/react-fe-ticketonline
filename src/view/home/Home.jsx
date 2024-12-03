import LayoutCustomer from "../layouts/LayoutCustomer";

export default function Home() {
    return (
        <LayoutCustomer>
            <div className=" mx-[200px] my-5">
                <div className="flex mb-5">
                    <div className="mr-5">
                        <img src="/assets/dummy/slider-2.png" alt="" />
                    </div>
                    <div>
                        <img src="/assets/dummy/slider-1.png" alt="" />
                    </div>
                </div>

                <div>
                    <b className="text-2xl inline-block mb-5">Event</b>

                    <section>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <CardEventEL />
                            <CardEventEL />
                            <CardEventEL />
                            <CardEventEL />
                            <CardEventEL />
                            <CardEventEL />
                        </div>

                        <div className="my-5 flex justify-center">
                            <button className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                <div className="flex items-center">
                                    Tampilkan Lebih Banyak Lagi
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 19l-7-7h14l-7 7z" />
                                    </svg>
                                </div>

                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </LayoutCustomer>

    )
}

const CardEventEL = () => {
    return (
        <div className="border rounded-md m-2">
            <img src="/assets/dummy/event-1.png" alt="" />
            <div className="p-2">
                <b className="">ALPEN ATLANTIC</b>
                <p className="text-[13px]">25 November 2024</p>
                <p className="text-gray-500  text-[13px] truncate ...">SMPI AL AZHAR 2 PEJATEN | SMP Islam Al Azhar 2 Pejaten, Jalan Siaga Raya, RT.7/RW.5, West Pejaten, South Jakarta City Jakarta, Indonesia</p>
            </div>
            <div className="border border-t-2 flex justify-between p-2">
                <p className="text-[13px] text-gray-500">Mulai Dari</p>
                <b>Rp 15.000</b>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDateUtil, formatRupiahUtil, formatTimeUtil } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventBySlug } from "../../redux/feature/eventSlice";

export default function DetailEvent() {
    const [showFullText, setShowFullText] = useState(false);
    const { slug } = useParams();

    const dispatch = useDispatch()
    const data = useSelector((state) => state.event.detailEvent)

    useEffect(() => {
        dispatch(fetchEventBySlug({ slug: slug }))
    }, [])


    return (
        <>
            <div className="mx-[20px] xl:mx-[300px]  my-5">
                <div className="w-full md:flex">
                    <div className="w-full mb-[30px] md:mb-0 md:w-7/12 mr-5">
                        <img src={`${data?.image}`} alt="" />
                        <p className="font-extrabold text-xl py-5">Deskripsi</p>
                        <div className={`${!showFullText && 'h-32'} overflow-hidden`}>
                            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                            {/* 🎵 Alpen Atlantic 🎵
                            ALPEN CUP 2024 ATLANTIC merupakan acara kompetisi antar sekolah dan pentas seni yang diselenggarakan oleh SMPI Al Azhar 2 Pejaten.

                            Pentas Seni ALPEN CUP 2024 ATLANTIC  ini akan dimeriahkan :

                            RAN

                            AZHARDI (INDONESIAN IDOL)

                            VOCAL JAM bersama INSTRUKTUR SENANG x ATHAR

                            LIXIE BAND

                            Dan akan diselenggarakan pada :

                            📍 Sabtu, 30 November 2024

                            🕐 Pukul : 08:00 - 17:00 WIB

                            🚧  Close Gate : 13.30 WIB

                            👖👕 Dress Code : Bebas dan Sopan

                            Penukaran tiket :

                            🎬 Kamis & Jumat, 28 dan 29 November 2024

                            🕙 Pukul : 10.00 - 15.00 WIB*

                            *Don't forget bring your Umbrella ☂️ and Rain Coat

                            Cara Pembelian Tiket:

                            1. Pilih tipe yang tersedia dari jumlah tiket

                            2. Isi website dengan data yang dibutuhkan (harap mengisi data yang lengkap dan email yang aktif)

                            3. Pilih metode pembayaran

                            4. Submit dan segera lakukan pembayaran (bukti pembayaran dan e-tiket dapat dicek via email)

                            5. Simpan e-tiket agar bisa ditukar dengan wristband

                            Syarat dan Ketentuan :

                            1. E-tiket yang valid adalah yang dibeli melalui Yesplis.com

                            2. ⁠Harga tiket dapat terkena biaya Administrasi sesuai dengan metode pembayarannya. Harga tersebut diluar pajak dan internet fee.

                            3. ⁠Diharapkan untuk menyertakan email yang aktif saat membeli tiket agar proses untuk mendapatkan E-tiket minim kendala.

                            4. ⁠Setelah membeli tiket harap segera membayar karena ketika sudah memesan tiket tapi belum membayar akan hangus 1 jam setelah pemesanan.

                            5. ⁠Anak anak usia 7 tahun kebawah dikenakan tiket masuk dan harus didampingi oleh orang tua atau orang dewasa.

                            6. ⁠Untuk penukaran E-tiket wajib dilakukan guna mendapatkan wristband.

                            7. ⁠Diharapkan untuk memperhatikan Instagram @alpencup.24  untuk info keterangan lebih lanjut.

                            8. ⁠Panitia tidak memiliki hak apabila wristband yang sudah diberikan rusak, hilang, atau dicuri karena itu sudah menjadi tanggungjawab pemilik tiket, meskipun memiliki bukti pembelian tiket.

                            9. ⁠Tiket yang sudah dibeli tidak dapat dikembalikan dalam situasi dan kondisi apapun.

                            10. ⁠Peserta penyelenggara serta pengisi acara tidak bertanggungjawab atas pembelian tiket acara melalui calo/platform yang bukan dari mitra resmi penjualan tiket Alpen Atlantic

                            11. ⁠Apabila terjadi bencana alam, kerusuhan, perang, wabah, dan semua keadaan darurat yang diumumkan resmi olah pemerintah, penyelenggara dan panitia berhak untuk membatalkan dan merubah waktu acara dan tata letak tempat tanpa pemberitahuan sebelumnya.

                            12. ⁠Penyelenggara berhak untuk :

                            a.  Melarang penonton masuk jika wristband telah digunakan oleh orang lain, rusak, hilang, ataupun wristband tertinggal

                            b. Memproses atau mengajukan hukuman, baik secara perdata ataupun pidana kepada pengunjung yang mendapat Entry Pass secara tidak sah termasuk memalsukan dan menggadaikan Entry pass yang sah atau memperoleh Entry pass dengan cara yang tidak sesuai dengan prosedur

                            c. Mengeluarkan penonton apabila penonton tersebut melakukan provokasi sehingga mengakibatkan ketidakkondusifan acara

                            13. Mematuhi semua aturan yang sudah ditentukan oleh panitia. Panitia berhak mengeluarkan penonton dari venue jika tidak mematuhi aturan yang sudah diterapkan.

                            14. Penonton diharapkan mematuhi semua aturan yang sudah diterapkan oleh panitia dan apabila penonton membuat kericuhan atau tidak menaati peraturan panitia berhak mengeluarkan penonton tersebut dari venue.

                            Sampai Bertenuuuu di ALPEN ATLANTIC!! */}
                        </div>
                        <p className="text-blue-700 font-bold cursor-pointer" onClick={() => setShowFullText(!showFullText)}>Tampilkan Lebih Banyak</p>
                    </div>
                    <div className="w-full md:w-4/12 flex flex-col">
                        <div className="border bg-white p-5 mb-5">
                            <p className="font-extrabold">{data?.eventTitle}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{formatDateUtil(data?.schedule)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{formatTimeUtil(data?.schedule)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{data?.venue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="border bg-white p-5 mb-5">
                            <div className="flex justify-between">
                                <p>Mulai Dari : </p>
                                <b>{formatRupiahUtil(data?.startFromPrice)}</b>
                            </div>
                            <Link to={`/event/${slug}/tickets`} type="button" className="text-white block text-center mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb">
                                Beli Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
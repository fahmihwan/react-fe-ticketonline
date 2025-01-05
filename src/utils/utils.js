import { DateTime } from 'luxon';
export const formatRupiahUtil = (number) => {
    let format = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
    return `Rp ${format}`

};

export const formatDateUtil = (inputDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('id-ID', options); // Format Indonesia
}

export const formatTimeUtil = (datetimeString) => {
    // Membuat objek DateTime dengan zona waktu WIB
    const date = DateTime.fromISO(datetimeString, { zone: 'Asia/Jakarta' });
    // Mengambil jam dan menit dalam format dua digit
    const formattedHours = date.toFormat('HH');
    const formattedMinutes = date.toFormat('mm');
    // Mengembalikan hasil dengan WIB
    return `${formattedHours}:${formattedMinutes} WIB`;
}

export const formatDateTimeUtil = (inputDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);

    // Format tanggal menggunakan toLocaleDateString
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // Format waktu (jam dan menit)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    // Gabungkan tanggal dan waktu
    return `${formattedDate}  - ${formattedTime} WIB`;
};


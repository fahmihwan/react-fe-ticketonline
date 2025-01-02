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

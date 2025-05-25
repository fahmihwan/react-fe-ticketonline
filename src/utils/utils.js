import { DateTime } from 'luxon';
import moment from 'moment';
import 'moment/locale/id';
export const formatRupiahUtil = (number) => {
    let format = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
    return `Rp ${format}`

};
export const formatBirthDateToBeInputUtil = (d_birth_date, m_birth_date, y_birth_date) => {
    let dateString = `${d_birth_date}-${m_birth_date}-${y_birth_date}`
    const momentDate = moment(dateString, "DD-MMMM-YYYY");
    const formattedDate = momentDate.format("YYYY-MM-DD");
    return formattedDate
}

export const formatBirthDateToFeInputUtil = (birthDate) => {
    moment.locale('id');
    let date = moment(birthDate).format("DD-MMMM-YYYY").split('-');


    // const monthTranslations = {
    //     January: "January",
    //     February: "Februari",
    //     March: "Maret",
    //     April: "April",
    //     May: "Mei",
    //     June: "Juni",
    //     July: "Juli",
    //     August: "Agustus",
    //     September: "September",
    //     October: "Oktober",
    //     November: "November",
    //     December: "Desember"
    // };

    // function translateMonth(englishMonth) {
    //     return monthTranslations[englishMonth] || "Bulan tidak dikenal";
    // }


    // date[1] = translateMonth(date[1])

    return date
    // console.log(date);
}

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


export const explodeFormatDateTimeToInputElementUtil = (inputDateTime) => {
    // Menggunakan moment untuk parsing inputDateTime
    const date = moment(inputDateTime);

    // Format tanggal dan waktu dengan moment
    const dateFormat = date.format('YYYY-MM-DD');  // Format tanggal: YYYY-MM-DD
    const timeFormat = date.format('HH:mm');      // Format waktu: HH:mm

    return { dateFormat, timeFormat };
}

export const getPaymentMethodName = (param) => {
    const paymentFee = [
        { paymentMethod: "FT", paymentName: "RETAIL" },
        { paymentMethod: "VC", paymentName: "CREDIT CARD" },
        { paymentMethod: "BT", paymentName: "PERMATA VA" },
        { paymentMethod: "B1", paymentName: "CIMB NIAGA VA" },
        { paymentMethod: "A1", paymentName: "ATM BERSAMA VA" },
        { paymentMethod: "I1", paymentName: "BNI VA" },
        { paymentMethod: "OV", paymentName: "OVO" },
        { paymentMethod: "M2", paymentName: "MANDIRI VA H2H" },
        { paymentMethod: "SP", paymentName: "SHOPEEPAY QRIS" },
        { paymentMethod: "LA", paymentName: "LINKAJA APP PCT" },
        { paymentMethod: "SA", paymentName: "SHOPEEPAY APP" },
        { paymentMethod: "LQ", paymentName: "LINKAJA QRIS" },
        { paymentMethod: "DA", paymentName: "DANA" },
        { paymentMethod: "BC", paymentName: "BCA VA" },
        { paymentMethod: "IR", paymentName: "INDOMARET" },
        { paymentMethod: "SL", paymentName: "SHOPEEPAY LINK" },
        { paymentMethod: "BR", paymentName: "BRI VA" },
        { paymentMethod: "OL", paymentName: "OVO LINK" },
        { paymentMethod: "BV", paymentName: "BSI VA" },
        { paymentMethod: "IQ", paymentName: "BNI QRIS" }
    ];

    function getPaymentNameByMethod(method) {
        const result = paymentFee.find(item => item.paymentMethod === method);
        return result ? result.paymentName : null;
    }
    return getPaymentNameByMethod(param)
}



export const statusTransactionUtil = (text) => {

    let css = ''
    if (text == 'CANCELLED') {
        css += 'text-red-500 '
    } else if (text == 'EXPIRED') {
        css += 'text-red-500 '
    } else if (text == 'PENDING') {
        css += 'text-yellow-500 '
    } else if (text == 'SUCCESS') {
        css += 'text-green-500 '
    }
    return css
}

export const fGeneratePaginationNumberUtil = (paginatePage, paginateTotalPage, paginateLimit) => {
    const pageNumbers = [];
    const maxPagesToShow = paginateLimit;
    let startPage = Math.max(1, paginatePage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(paginateTotalPage, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers
}


export const fCalculatePaginateIterationUtil = (paginatePage, maxPagesToShow) => {
    return (paginatePage - 1) * maxPagesToShow + 1;
}
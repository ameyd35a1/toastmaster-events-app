export const paddingLeft = (str, paddingValue): string => {
    return String(paddingValue + str).slice(-paddingValue.length);
};

export const getTitleDate = (date: Date): string => {
    return (paddingLeft(date.getDate().toString(), "00") + (paddingLeft((date.getMonth() + 1).toString(), "00")) + date.getFullYear())
}

export const getDisplayDate = (date: Date) => {

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let compDate = new Date(year, month - 1, day); // month - 1 because January == 0
    let diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
    if (compDate.getTime() == today.getTime()) {
        return "Today";
    } else if (diff <= (24 * 60 * 60 * 1000)) {
        return "Yesterday";
    } else {
        return compDate.toDateString(); // or format it what ever way you want
    }
}

export const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getFormattedDateTime = (date:Date):string => getDisplayDate(date) +' at '+ formatAMPM(date)
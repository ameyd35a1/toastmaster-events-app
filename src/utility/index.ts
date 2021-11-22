export const paddingLeft = (str, paddingValue): string => {
    return String(paddingValue + str).slice(-paddingValue.length);
};

export const getTitleDate = (date: Date): string => {
    return (paddingLeft(date.getDate().toString(), "00") + (paddingLeft((date.getMonth() + 1).toString(), "00")) + date.getFullYear())
}
export const paddingLeft = (str, paddingValue) => {
    return String(paddingValue + str).slice(-paddingValue.length);
};
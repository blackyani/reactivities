export const getYearMonthDay = (date: string): string => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const sleep  = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
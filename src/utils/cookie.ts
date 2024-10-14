// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setCookie = (name: string, value: any, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

// Get a cookie by name
const getCookie = (name: string) => {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(";");
    for (let cookie of cookiesArray) {
        while (cookie.startsWith(" ")) cookie = cookie.substring(1);
        if (cookie.startsWith(nameEQ)) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
};

export { getCookie, setCookie }
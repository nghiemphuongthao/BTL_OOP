
export const setItem = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
export const getItem = (key) => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    return null;
}
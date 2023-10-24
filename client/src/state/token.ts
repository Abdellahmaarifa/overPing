let token: string | null = null;

export const getToken = () => token;
export const setToken = (val: string | null) => (token = val);

export const TOKEN_KEY = "token";
export const ASM_TOKEN_KEY = "asm-token";
export const ASM_USER_EMAIL = "asm-user-email";
export const ORDER_ID = "order-id";
export const LOCATION_ID = "location-id";

/**
 * Get user token from localStore
 * @returns {string} user token
 */
export const getToken = () => {
    return typeof window !== 'undefined' && localStorage.getItem(TOKEN_KEY);
}

/**
 * Set user token in localStore
 * @param {string} token
 */
export const setToken = (token) => {
    return typeof window !== 'undefined' && localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove user token in localStore
 */
export const removeToken = () => {
    return typeof window !== 'undefined' && localStorage.removeItem(TOKEN_KEY);
}

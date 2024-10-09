const REDIRECT_URL_KEY = "sign_in_redirect_path";

/**
 * Set redirect url
 * @param {string} redirectUrl
 */
export const setRedirectUrl = (redirectUrl = "") => {
    window.sessionStorage.setItem(REDIRECT_URL_KEY, redirectUrl);
}

/**
 * Get redirect url
 * @returns {string} redirect url
 */
export const getRedirectUrl = () => {
    return window.sessionStorage.getItem(REDIRECT_URL_KEY) || "/";
}

/**
 * Clear redirect url
 * @returns {string} redirect url
 */
export  const clearRedirectUrl = () => {
    window.sessionStorage.removeItem(REDIRECT_URL_KEY);
}

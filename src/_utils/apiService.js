/* eslint-disable react-hooks/rules-of-hooks */
import { store } from '@/_store';
import axios from "axios";
import { createAlert } from '@/_store/alert.slice';
import { logoutUser } from '@/_store/auth.slice';
import { TOKEN_KEY } from "./userToken";
import { getCookie, setCookie } from 'cookies-next';
import { getApiUrl } from '.';

export const initialRequestParams = {
    secure: true,
    showSuccessMessage: false,
    showErrorMessage: true
};

/**
 * Get API service with handled response and security
 * @param {object} initialRequestParams 
 * @returns 
 */
const apiService = ({
    secure,
    showSuccessMessage,
    showErrorMessage
} = initialRequestParams) => {
    const headers = {
        "Content-Type": "application/json"
    };

    //Using static token for now, will replace this token after API integration for get domain
    // const result = getAuthToken().catch(() => {
    //   });
    const token = getCookie(TOKEN_KEY);

    if (secure && token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const axiosInstance = axios.create({ headers });

    /**
     * Enhance response
     * Set error on store
     */
    axiosInstance.interceptors.response.use((response) => {
        return new Promise((resolve) => {
            if (showSuccessMessage) {
                if (response?.data?.success) {
                    if (response.config.method != 'get') {
                        store.dispatch(createAlert({ alertType: "success", msg: error, timeout: 5000 }));
                    }
                } else {
                    const message = response?.data?.message;
                    if (message) {
                        store.dispatch(createAlert({ alertType: "error", msg: message, timeout: 5000 }));
                    }
                }
            }
            resolve(response.data); // Return direct data from request
        });
    }, (errorResponse) => {
        // Auto logout if 401 Unauthorized or 403 Forbidden errorResponse returned from api
        if ([401, 403].includes(errorResponse?.response?.status) || [401, 403].includes(errorResponse?.status)) {
            (async () => {
                const domain = localStorage?.getItem('domain')
                const res = await fetch(
                    getApiUrl(`/customer/get-token?where={"site_url":"${domain}"}`)
                  );
                  const response = await res.json()
                  setCookie(TOKEN_KEY, response?.token)
                //   window.location.replace('/')
            })()
        }

        // if (showErrorMessage) {
        //     const error = (errorResponse && errorResponse?.response && errorResponse?.response?.data?.error?.message) || errorResponse?.message || errorResponse?.statusText;
        //     store.dispatch(createAlert({ alertType: "error", msg: error, timeout: 5000 }));
        // }

        return Promise.reject(errorResponse);
    });

    return axiosInstance;
};

export default apiService;

import { getApiUrl } from "@/_utils";
import apiService from "@/_utils/apiService";
import { TOKEN_KEY, ORDER_ID, LOCATION_ID } from "@/_utils/userToken";
import { setCookie, getCookie } from 'cookies-next';

const API_KEY = '3nc4hnVPJUKi4b1kzEmdMw12208';

const useAuthHelper = () => {
    const loginUser = async (body) => {
        const url = getApiUrl("/customer/login");
        const result = await apiService().post(url, body);
        if (result && result.token) {
            setCookie(TOKEN_KEY, result?.token)
        }
        return result;
    }

    const getUserAccountDetail = async () => {
        const url = getApiUrl(`/customer/account/get`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const updateUserDetails = async (body) => {
        const url = getApiUrl(`/customer/update`);
        const result = await apiService().post(url, body);
        if (result && result.accessToken) {
            setCookie(TOKEN_KEY, result.accessToken)
        }
        return result;
    }

    const updatePassword = async (body, id) => {
        try {
            const url = getApiUrl(`/customer/update/${id}`);
            const result = await apiService().post(url, body);
            return result;
        } catch (error) {
            return error
        }
    }

    const registrationUser = async (body) => {
        const url = getApiUrl("/customer/add");
        return await apiService().post(url, body);
    }

    const getUserDetails = async () => {
        const url = getApiUrl('/customer/get');
        try {
            return await apiService().get(url);
        } catch ({ }) { }
    }

    const getAuthToken = async (domain) => {
        const url = getApiUrl(`/customer/get-token?where={"site_url":"${domain}"}`)
        return await apiService().get(url);
    }

    const getUserAllAddress = async () => {
        const url = getApiUrl(`/customer/address/getAll`);
        const result = await apiService().get(url);
        return result;
    }

    const deleteUserAddressById = async (id, customerId) => {
        const url = getApiUrl(`/customer/${customerId}/address/delete/${id}`);
        return await apiService().post(url, {});
    }

    const addUserAddress = async (body) => {
        const url = getApiUrl(`/customer/${body?.customerId}/address/add?isCustomerAddress=true`);
        return await apiService().post(url, body);
    }

    const updateUserAddress = async (body, customerId) => {
        const url = getApiUrl(`/customer/${customerId}/address/update/${body?.id}`);
        return await apiService().post(url, body);
    }

    const getAllCountry = async () => {
        const url = getApiUrl(`/country/getAll`);
        return await apiService().get(url);
    }

    const getPaymentMethods = async (body) => {
        const url = getApiUrl(`/order/checkout/getPaymentMethods`);
        try {
            return await apiService().post(url, body);
        } catch { }
        return result
    }

    const getPaymentDetails = async (orderId) => {
        const url = getApiUrl(`/order/${orderId}/payment/getAll`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getAllShippingMethod = async (orderId) => {
        const url = getApiUrl(`/store/${orderId}/shipping-method/getAll`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getAllShippingAddress = async (orderId) => {
        const url = getApiUrl(`/order/${orderId}/shipping/getAll`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getStoresForPickup = async (objectId) => {
        const url = getApiUrl(`/store/${objectId}/instore-pickup/getAll`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getCartData = async (translateId, orderId = "") => {
        const orderIdCookie = getCookie(ORDER_ID)
        const queryParam = orderId || orderIdCookie ? `?orderId=${orderId || orderIdCookie}` : ""
        const url = getApiUrl(`/order/viewCart/${translateId}${queryParam}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const addProductToCart = async (body) => {
        const url = getApiUrl(`/order/item/add`);
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const removeProductFromCart = async (body) => {
        const url = getApiUrl(`/order/item/delete`);
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const getAddressSuggestion = async (searchText) => {
        try {
            return await apiService().post(`https://api.getaddress.io/autocomplete/${searchText}?api-key=${API_KEY}`, {
                all: true
            });
        } catch { }
    }

    const getAddress = async (id) => {
        try {
            return await apiService().get(`https://api.getaddress.io/get/${id}?api-key=${API_KEY}`, {
                all: true
            });
        } catch { }
    }

    const getDeliveryDetails = async (objectId) => {
        const url = getApiUrl(`/order/${objectId}/delivery/details/get`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const addDeliveryDetails = async (body, objectId) => {
        const url = getApiUrl(`/order/${objectId}/delivery/details/add`);
        return await apiService().post(url, body);
    }

    const deleteAccount = async (id) => {
        const url = getApiUrl(`/customer/delete/${id}?deleted=true`);
        return await apiService().post(url, { id: id });
    }

    const getOrderStatus = async (orderId, translateId) => {
        const url = getApiUrl(`/order/${orderId}/checkout/submit/${translateId}`);
        try {
            return await apiService().post(url, {});
        } catch (err) {
            return err?.response?.data
        }
    }

    const submitOrder = async (payload) => {
        // check auth token
        const url = getApiUrl(`/order/checkout/submitPayment`);
        try {
            return await apiService().post(url, payload);
        } catch { }
    }

    const getOrderSummary = async (objectId) => {
        const url = getApiUrl(`/order/${objectId}/summary/get`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getRetailerFinanceProducts = async (storeId, payload) => {
        const url = getApiUrl(`/store/${storeId}/v12Finance/getRetailerFinanceProducts`);
        return await apiService().post(url, payload);
    }

    const submitV12FinancePayment = async (body) => {
        const url = getApiUrl("/payments/v12Finance/submitPayment");
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const getCartService = async (storeObjectId, orderLineItemId, translateId) => {
        const url = getApiUrl(`/store/${storeObjectId}/order/orderLineItem/${orderLineItemId}/getAllServiceProducts/${translateId}`);
        try {
            return await apiService().post(url);
        } catch { }
    }

    const getCartAddons = async (storeObjectId, translateId) => {
        const url = getApiUrl(`/addon/getAllAddonByTypeAndStore?translateId=${translateId}&storeId=${storeObjectId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const applyCoupon = async (objectId, code) => {
        const locationId = getCookie(LOCATION_ID)
        const url = getApiUrl(`/order/${objectId}/coupon/${code}/apply?locationId=${locationId}`);
        try {
            return await apiService().post(url);
        } catch (error) {
            return error
        }
    }

    const removeCoupon = async (objectId, code) => {
        const url = getApiUrl(`/order/${objectId}/coupon/${code}/remove`);
        try {
            return await apiService().post(url);
        } catch { }
    }

    const getAllOrdersSummary = async (translateId) => {
        const url = getApiUrl(`/customer/order/getAll/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getAvailableCoupons = async () => {
        const locationId = getCookie(LOCATION_ID)
        const url = getApiUrl(`/usercoupon/getCouponsByLocation?locationId=${locationId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getDeliveryData = async (storeId, collectionId, translateId, navigationHierarchyId, page, pageSize) => {
        // const url = getApiUrl(`/store/${storeId}/collection/${collectionId}/instock-product/${translateId}?navigationHierarchyId=4cbe3b96-74b7-4da0-ab2f-326ef8c84b18&pageSize=${pageSize}&pageIndex=${page - 1}`);
        const url = getApiUrl(`/store/${storeId}/collection/${collectionId}/instock-product/${translateId}?navigationHierarchyId=${navigationHierarchyId}&pageSize=${pageSize}&pageIndex=${page - 1}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getAppointmentModes = async (translateId) => {
        const url = getApiUrl(`/appointment-mode/book/getAll/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getStoreLocations = async (id) => {
        const url = getApiUrl(`/store/${id}/location/getALL`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getUserLocation = async (id) => {
        const url = getApiUrl(`/user-location-maps/getAll?searchKey[relations][][userId]=${id}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getServices = async (locationId, appointmentModeId, translateId) => {
        const url = getApiUrl(`/location/${locationId}/appointment-mode/${appointmentModeId}/appointment-type/getAll/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getVirtualAppointmentServices = async (appointmentModeId, translateId) => {
        const url = getApiUrl(`/appointment-mode/${appointmentModeId}/appointment-type/getAll/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const addAppointment = async (body) => {
        const url = getApiUrl('/appointments/add?pushRecord=true');
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const gifting = async (body) => {
        const url = getApiUrl("/gift-vouchers/add");
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const getMediaFile = async (fileName) => {
        const url = getApiUrl(`/media-file-download${fileName[0] === '/' ? fileName : `/${fileName}`}/get`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const giftingProductAddons = async (translateId) => {
        const url = getApiUrl(`/gift-vouchers/getAllProduct/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const addGiftingOtherAmountAddon = async (body) => {
        const url = getApiUrl("/addon/type/gift-voucher/add");
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const needAssistant = async (body) => {
        const url = getApiUrl("/customer-enquiries/add?pushRecord=true");
        try {
            return await apiService().post(url, body);
        } catch { }
    }

    const getByLocationName = async (name) => {
        const url = getApiUrl(`/location/getAll?pageCount=3&pageIndex=0&pageSize=10&searchKey%5Brelations%5D%5B%5D%5Bname%5D=${name}`);
        try {
            return await apiService().get(url);
        } catch { }
    }
    const getLocationList = async () => {
        const url = getApiUrl(`/location/getAll?pageCount=3&pageIndex=0&pageSize=10&searchKey%5Brelations%5D%5B%5D%5Bname%5D`);
        try {
            return await apiService().get(url);
        } catch { }
    }
    const forgotPassword = async (body) => {
        try {
            const url = getApiUrl('/customer/forgot-password');
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }

    const getQuestionnaires = async (id, translateId) => {
        const url = getApiUrl(`/store/${id}/bespokeQuestionnaire/getAll/${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const addBespokeEnquiries = async (body) => {
        try {
            const url = getApiUrl('/bespoke-enquiries/add');
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }

    const getAllCustomer = async (selectedOption, searchText) => {
        const url = getApiUrl(`/customer/getAll?pageIndex=0&pageSize=10&searchKey[relations][][${selectedOption}]=${searchText}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getASMNavigationByStore = async (storeId) => {
        const url = getApiUrl(`/navigation-hierarchy/getASMNavigationByStore?storeId=${storeId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const impersonateUser = async (id, body) => {
        try {
            const url = getApiUrl(`/user/impersonate/${id}`);
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }

    const createInternalOrder = async (body) => {
        try {
            const url = getApiUrl('/order/add');
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }

    const getWishList = async (storeId) => {
        const url = getApiUrl(`/store/${storeId}/customer/wish-list/getAll`);
        try {
            const pdpPlpdata = await apiService().get(url);

            const plpListingData =
                pdpPlpdata?.expandedData &&
                Object?.entries(pdpPlpdata?.expandedData)?.map(([code, details]) => {
                    return details?.docs.map((doc) => {
                        return {
                            ...(!!doc.id && { id: doc.id }),
                            ...(!!doc.bandwidth && { bandwidth: doc.bandwidth }),
                            ...(!!doc.ringsize && { ringsize: doc.ringsize }),
                            ...(!!doc.stonetype && { stonetype: doc.stonetype }),
                            ...(!!doc.settingtype && { settingtype: doc.settingtype }),
                            ...(!!doc.carat && { carat: doc.carat }),
                            ...(!!doc.color && { color: doc.color }),
                            ...(!!doc.stoneshape && { stoneshape: doc.stoneshape }),
                            ...(!!doc.code && { code: doc.code }),
                            ...(!!doc.name && { name: doc.name }),
                            ...(!!doc.variantoptionname && {
                                variantoptionname: doc.variantoptionname,
                            }),
                            ...(!!doc.navigationhierarchyid && {
                                navigationhierarchy: doc.navigationhierarchyid,
                            }),
                            ...(!!doc.tags && { tags: doc.tags }),
                            ...(!!doc.transcode && { transcode: doc.transcode }),
                            price: Array.isArray(doc.price)
                                ? doc.price[0] || {}
                                : doc.price || {},
                            fromprice: Array.isArray(doc.fromprice)
                                ? doc.fromprice[0] || {}
                                : doc.fromprice || {},
                            collectionid: Array.isArray(doc.collectionid)
                                ? doc.collectionid[0] || {}
                                : doc.collectionid || {},
                            ...(!!doc.metal && { metal: doc.metal }),
                            ...(!!doc.image && { image: doc.image }),
                            selected: false,
                        };
                    });
                });

            const mergeData = (expendedData, collapseData) => {
                const mergedData = [];
                collapseData?.forEach((collapseItem) => {
                    const matchingExpended =
                        expendedData.find((expendedArray) => {
                            return expendedArray.some(
                                (expendedItem) => expendedItem.code === collapseItem.code
                            );
                        }) ?? [];
                    if (matchingExpended) {
                        const mergedItem = {
                            code: collapseItem?.code,
                            prodcuctData: [
                                { ...collapseItem, selected: true },
                                ...matchingExpended,
                            ],
                        };

                        const includedMetal = [];
                        // added that only unique variants are rendered
                        const filterData = mergedItem.prodcuctData.filter(
                            ({ metal }, i, ar) => {
                                if (!includedMetal.includes(metal)) {
                                    const ob = ar.some((item) => item.metal === metal);
                                    if (!ob) {
                                        return;
                                    }
                                    includedMetal.push(metal);
                                    return ob;
                                }
                                return;
                            }
                        );
                        mergedData.push({
                            code: mergedItem.code,
                            // add upto 4 variants
                            prodcuctData: filterData.slice(0, 4),
                        });
                    }
                });

                return mergedData;
            };

            return mergeData(plpListingData, pdpPlpdata?.collapsedData)
        } catch (err) {
            return err
        }
    }

    const addWishList = async (body) => {
        try {
            const url = getApiUrl('/wish-list/add');
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }
    const removeWishList = async (id) => {
        try {
            const url = getApiUrl(`/wish-list/remove/${id}`);
            const result = await apiService().post(url);
            return result;
        } catch (err) {
            return err
        }
    }
    const getStoreTranslations = async ({storeId, cookieToken}) => {
        const url = getApiUrl(`/store/${storeId}/getStoreTranslations`);
        const headersData = cookieToken
            ? { headers: { Authorization: `Bearer ${cookieToken}` } }
            : {};
        const fetchData = await fetch(url, headersData);
        try {
            return await fetchData.json();
        } catch { }
    }

    const getNavigationHierarchy = async (navigationId, translateId) => {
        const url = getApiUrl(`/navigation-hierarchy/get-translate-url?navigationId=${navigationId}&translateId=${translateId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getTimeSlots = async (storeLocationId, appointmentDate, appointmentTypeId, appointmentModeId) => {
        const url = getApiUrl(`/user-calendar/${storeLocationId}/available-slots/${appointmentDate}/${appointmentTypeId}/${appointmentModeId}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getPosition = async () => {
        const url = getApiUrl(`/position/getAll?pageCount=1&pageIndex=0&pageSize=100&searchKey%5Brelations%5D%5B%5D%5Bname%5D=Center&searchKey%5Brelations%5D%5B%5D%5BisMain%5D=true`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getDiamondsList = async (storeId, variantOptionId, positionId, translateId, param) => {
        // const url = getApiUrl(`/store/${storeId}/variant-option/${variantOptionId}/choose-specific-diamond/position/${positionId}/${translateId}?pageIndex=0&pageSize=100${param}`);
        const url = getApiUrl(`/store/${storeId}/variant-option/e95743af-ef9b-4f12-8a7b-3cd9286d031d/choose-specific-diamond/position/${positionId}/${translateId}?pageIndex=0&pageSize=100${param}`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const shareWishlist = async (body) => {
        try {
            const url = getApiUrl('/customer/wish-list/share');
            const result = await apiService().post(url, body);
            return result;
        } catch (err) {
            return err
        }
    }

    const getAdditionalCountry = async (storeId) => {
        const url = getApiUrl(`/store/${storeId}/additionalCountry/getAll`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    const getProducts = async (id, code) => {
        // const url = getApiUrl(`/solr/navigation/filter/search?navigationhierarchyid=88d0107f-2241-44ef-ab20-3fe628102a52&transcode=en-gb&rows=4&start=2`);
        const url = getApiUrl(`/solr/navigation/filter/search?navigationhierarchyid=${id}&transcode=${code}&rows=4&start=2`);
        try {
            return await apiService().get(url);
        } catch { }
    }

    return {
        loginUser,
        getUserAccountDetail,
        updateUserDetails,
        getUserAllAddress,
        addUserAddress,
        updateUserAddress,
        deleteUserAddressById,
        registrationUser,
        getAuthToken,
        getAllCountry,
        getPaymentMethods,
        getPaymentDetails,
        getAllShippingMethod,
        getAllShippingAddress,
        getStoresForPickup,
        getAddressSuggestion,
        getAddress,
        getUserDetails,
        getCartData,
        addProductToCart,
        removeProductFromCart,
        getDeliveryDetails,
        addDeliveryDetails,
        deleteAccount,
        getOrderStatus,
        submitOrder,
        getOrderSummary,
        getRetailerFinanceProducts,
        submitV12FinancePayment,
        getCartService,
        getCartAddons,
        applyCoupon,
        removeCoupon,
        getAllOrdersSummary,
        getAvailableCoupons,
        getDeliveryData,
        getAppointmentModes,
        getStoreLocations,
        getUserLocation,
        getServices,
        getVirtualAppointmentServices,
        addAppointment,
        gifting,
        getMediaFile,
        giftingProductAddons,
        addGiftingOtherAmountAddon,
        needAssistant,
        getByLocationName,
        forgotPassword,
        updatePassword,
        getQuestionnaires,
        addBespokeEnquiries,
        getAllCustomer,
        impersonateUser,
        createInternalOrder,
        getASMNavigationByStore,
        getWishList,
        addWishList,
        removeWishList,
        getLocationList,
        getStoreTranslations,
        getNavigationHierarchy,
        getTimeSlots,
        getPosition,
        getDiamondsList,
        shareWishlist,
        getAdditionalCountry,
        getProducts
    }
}

export default useAuthHelper;

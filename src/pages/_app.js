import { Provider } from "react-redux";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"), {
  ssr: false,
});
import { IntlProvider } from "react-intl";
import { store } from "./../_store";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import ProtectedPage from "@/protectedPage";
import Layout from "../layout/index";
import { useRouter } from "next/router";
import messages from "@/_langs";
import {
  domainSelection,
  getApiUrl,
  getAuthToken,
  getDataForPageUrlService,
  getLayoutData,
  getPageDetailsService,
  getStoreID,
  parseFooterData,
  parseHeaderData,
} from "@/_utils";
import { LoginContext } from "@/_utils/loginCotext";
const SelectAppointmentModal = dynamic(
  () => import("@/_components/staticLayout/select-appointment-modal"),
  { ssr: false }
);
const VirtualAppointmentModal = dynamic(
  () => import("@/_components/staticLayout/virtual-appointment-modal"),
  { ssr: false }
);
const BookAppointmentModalWrapper = dynamic(
  () => import("@/_components/staticLayout/booking-appointment-modal-wrapper"),
  { ssr: false }
);

const themeOptions = createTheme({
  palette: {
    type: "light",
    default: {
      main: "#ffffff",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#0e61ff",
    },
    success: {
      main: "#558b2f",
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});

export default function App({
  Component,
  pageProps,
  domain,
  storeId,
  phoneNumber,
}) {
  const router = useRouter();
  const { getFooterData, getHeaderData } = { ...pageProps };
  const translateId = pageProps?.translateId;
  const locale = router.locale;
  const pageProp = {
    ...pageProps,
    getFooterData,
    getHeaderData,
    domain,
    phoneNumber,
  };
  const [progress, setProgress] = useState(0);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [translationData, setTranslationData] = useState("");
  const [callbackDetails, setCallbackDetails] = useState({
    callback: null,
    args: [],
  });
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isAppointmentModalOpen, setisAppointmentModalOpen] = useState(false);
  const [isvirtualModalOpen, setIsvirtualModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  const openLoginModal = (
    callback,
    args = [],
    options = { redirect: false, redirectPath: "/my-account" }
  ) => {
    if (options.redirect) {
      Router.push(options.redirectPath);
    } else {
      setIsOpenLoginModal(true);
      setCallbackDetails({ callback, args });
      setRedirectPath(options.redirectPath);
    }
  };

  const closeLoginModal = (isLoggedIn = false) => {
    setIsOpenLoginModal(false);
    if (isLoggedIn && callbackDetails.callback) {
      callbackDetails.callback(...callbackDetails.args);
      setCallbackDetails({ callback: null, args: [] });
    }
  };

  Router.events.on("routeChangeStart", () => {
    setProgress(40);
    const id = setTimeout(() => {
      setProgress(60);
      clearTimeout(id);
    }, 80);
    const secId = setTimeout(() => {
      setProgress(80);
      clearTimeout(secId);
    }, 130);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(100);
  });
  Router.events.on("routeChangeError", () => {
    setProgress(100);
  });
  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress === 100]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const translationValue = sessionStorage.getItem("translationValue");
      const translatedData = translationValue?.trim().toLowerCase();
      setTranslationData(translatedData);
    }
  }, []);

  useEffect(() => {
    router.beforePopState(() => {
      setTranslationData("");
      return true;
    });
  }, [router]);

  // Global Modal Conditions
  const handleSelectCloseButtonClick = () => {
    setIsSelectModalOpen(false);
  };
  const handleAppointmentCloseButtonClick = () => {
    setisAppointmentModalOpen(false);
  };
  const handlevirtualCloseButtonClick = () => {
    setIsvirtualModalOpen(false);
  };
  // Select Appointment
  useEffect(() => {
    const handleDOMContentLoaded = () => {
      setIsDomLoaded(true);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      handleDOMContentLoaded();
    } else {
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  useEffect(() => {
    if (!isDomLoaded) return;
    const handleAppointmentButtonClick = (event) => {
      event.preventDefault();
      setIsSelectModalOpen(true);
    };
    const attachEventListeners = () => {
      document
        .querySelectorAll('a[href*="#select-appointment"]')
        .forEach((button) => {
          button.addEventListener("click", handleAppointmentButtonClick);
        });
    };
    attachEventListeners();
    const observer = new MutationObserver(() => attachEventListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      document
        .querySelectorAll('a[href*="#select-appointment"]')
        .forEach((button) => {
          button.removeEventListener("click", handleAppointmentButtonClick);
        });
      observer.disconnect();
    };
  }, [isDomLoaded]);
  // Chat Box
  useEffect(() => {
    const handleChatButtonClick = (event) => {
      event.preventDefault();
      if (
        window.$zoho &&
        window.$zoho.salesiq &&
        window.$zoho.salesiq.floatwindow
      ) {
        window.$zoho.salesiq.floatwindow.visible("show");
      } else {
        console.error("Zoho SalesIQ is not loaded or not available.");
      }
    };
    const chatButtonHandler = document.querySelectorAll(
      'a[href*="#live-chat"]'
    );
    if (chatButtonHandler) {
      chatButtonHandler.forEach((button) => {
        button.addEventListener("click", handleChatButtonClick);
      });
    }

    return () => {
      if (chatButtonHandler) {
        chatButtonHandler.forEach((button) => {
          button.removeEventListener("click", handleChatButtonClick);
        });
      }
    };
  }, []);
  // Book Appointment
  useEffect(() => {
    const handleBookAppointmentClick = (event) => {
      event.preventDefault();
      setisAppointmentModalOpen(true);
    };
    const bookappointmentButtons = document.querySelectorAll(
      'a[href*="#book-appointment"]'
    );
    if (bookappointmentButtons) {
      bookappointmentButtons.forEach((button) => {
        button.addEventListener("click", handleBookAppointmentClick);
      });
    }
    return () => {
      if (bookappointmentButtons) {
        bookappointmentButtons.forEach((button) => {
          button.removeEventListener("click", handleBookAppointmentClick);
        });
      }
    };
  }, [isAppointmentModalOpen]);
  // Virtual Appointment
  useEffect(() => {
    const handleVirtualClick = (event) => {
      event.preventDefault();
      setIsvirtualModalOpen(true);
    };
    const virtualAppointmentButtons = document.querySelectorAll(
      'a[href*="#virtual-appointment"]'
    );
    if (virtualAppointmentButtons) {
      virtualAppointmentButtons.forEach((button) => {
        button.addEventListener("click", handleVirtualClick);
      });
    }
    return () => {
      if (virtualAppointmentButtons) {
        virtualAppointmentButtons.forEach((button) => {
          button.removeEventListener("click", handleVirtualClick);
        });
      }
    };
  }, [isvirtualModalOpen]);
  return (
    <IntlProvider
      locale={messages[translationData] || router.locale}
      messages={
        translationData && translationData
          ? messages[translationData]
          : messages[locale]
      }
      defaultLocale={messages[translationData] || router.defaultLocale}
    >
      <ThemeProvider theme={themeOptions}>
        <LoginContext.Provider
          value={{
            isOpenLoginModal,
            setIsOpenLoginModal,
            openLoginModal,
            closeLoginModal,
            redirectPath,
          }}
        >
          <Provider store={store}>
            <Layout>
              {!!progress && (
                <LinearProgress
                  variant="determinate"
                  sx={{
                    zIndex: 10000,
                    position: "fixed",
                    width: "100%",
                    top: 0,
                    right: 0,
                  }}
                  value={progress}
                  color="primary"
                />
              )}
              <CssBaseline />
              {
                // Component.isProtectedPage ?
                <ProtectedPage>
                  <Component {...pageProp} />
                </ProtectedPage>
                // : <Component {...pageProp} />
              }

              {/*Global Modals */}
              {isSelectModalOpen && (
                <SelectAppointmentModal
                  openButtonModal={isSelectModalOpen}
                  closeButtonModal={handleSelectCloseButtonClick}
                  storeId={storeId}
                  translateId={translateId}
                  domain={domain}
                />
              )}
              {isAppointmentModalOpen && (
                <BookAppointmentModalWrapper
                  storeId={storeId}
                  openButtonModal={isAppointmentModalOpen}
                  closeButtonModal={handleAppointmentCloseButtonClick}
                  translateId={translateId}
                />
              )}
              {isvirtualModalOpen && (
                <VirtualAppointmentModal
                  storeId={storeId}
                  openButtonModal={isvirtualModalOpen}
                  closeButtonModal={handlevirtualCloseButtonClick}
                  translateId={translateId}
                />
              )}
            </Layout>
          </Provider>
        </LoginContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
}

App.getInitialProps = async ({ ctx }) => {
  const { req, locale } = ctx;
  const hostname = req?.headers.host; // This gives you the hostname
  const domain = domainSelection[hostname];
  const { storeId, translateCode, phoneNumber } = await getStoreID(domain);
  const pagePath = req?.url;
  let cookieToken = req?.cookies?.["token"];
  cookieToken = !cookieToken ? await getAuthToken(domain) : cookieToken;
  let pageLocal =
    locale !== "en-default" && locale !== translateCode ? locale : null;
  let parsedHeaderData = {};
  let parsedFooterData = {};
  const { isPageExist } = getPageDetailsService(
    storeId,
    pagePath,
    pageLocal,
    cookieToken
  );
  let pageData = await getDataForPageUrlService(
    storeId,
    "404",
    null,
    pageLocal,
    cookieToken
  );
  if (pagePath === "/404" || !isPageExist) {
    const [getHeaderData, getFooterData] = await Promise.all([
      getLayoutData(pageData?.siteComponentHeaderId, cookieToken),
      getLayoutData(pageData?.siteComponentFooterId, cookieToken),
    ]);
    parsedHeaderData = parseHeaderData(getHeaderData, pageLocal);
    parsedFooterData = parseFooterData(getFooterData, pageLocal);
  }
  try {
    // this api is just for script injection, and above code is availing storeId and domain
    const result = await fetch(
      getApiUrl(
        `/content-injection/lists?storeId=${storeId}&pageSize=10&pageIndex=0`
      ),
      { next: { revalidate: 1200 } }
    );
    const scriptInject = (await result.json())?.data;
    const contentWithPosition = scriptInject?.map((item) => ({
      content: item?.content,
      position: item?.position,
    }));
    return {
      domain,
      contentWithPosition,
      pageProps: {
        getHeaderData: parsedHeaderData,
        getFooterData: parsedFooterData,
      },
      pagePath,
      pageLocal,
      storeId,
      translateId: pageData?.translateId,
      phoneNumber,
    };
  } catch {
    return {
      domain,
      pagePath,
      pageLocal,
      storeId,
      translateId: pageData?.translateId,
      phoneNumber,
    };
  }
};

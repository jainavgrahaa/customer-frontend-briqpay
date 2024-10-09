/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en"; // locale-data for en
import { checkArrayIteration, decodeString, getStoreType } from "@/_utils";
import parseReactHTML from "html-react-parser";

const isHTML = (str) => {
  // Use regular expression to check for HTML tags
  var htmlTags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  return htmlTags.test(str);
};

const getInjectionsData = (str) => {
  // if content contains html tags then output it as it is
  if (isHTML(str)) {
    return <>{parseReactHTML(str)}</>;
  }
  // else if its js code then wrap it in script tag
  else {
    return (
      <script
        key={str}
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: decodeString(str),
        }}
      ></script>
    );
  }
};

const Document = ({
  __NEXT_DATA__: {
    props: { domain, contentWithPosition, pagePath, pageLocal },
  },
}) => {
  const [headScript, bodyTopScript, bodyBottomScript] = [
    contentWithPosition?.filter(({ position }) => position === "header"),
    contentWithPosition?.filter(({ position }) => position === "body_top"),
    contentWithPosition?.filter(({ position }) => position === "body_bottom"),
  ];

  const fullpagepath = `${domain}${
    pageLocal ? "/" + pageLocal + pagePath : pagePath
  }`;

  const getCssLinks = () => {
    const store = getStoreType(domain);
    switch (store) {
      case "ab":
        return "https://fonts.googleapis.com/icon?family=Material+Icons";
        break;
      case "df":
        return "https://fonts.googleapis.com/icon?family=Material+Icon";
        break;
      default:
        return "https://fonts.googleapis.com/icon?family=Material+Icons";
    }
  };

  return (
    <Html dir="ltr" lang={pageLocal ? pageLocal : "en"}>
      <Head>
        <link rel="canonical" href={fullpagepath} />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /> */}

        {/* <link rel="preload" href="https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2" as="font" type="font/woff2" crossOrigin="true"/> */}
        <link href={getCssLinks()} rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href={`/assets/css/bootstrap.min.css`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Prata&display=swap&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        {/* TrustBox script */}
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
        {/* End TrustBox script */}

        <link
          rel="icon"
          href={
            getStoreType(domain) === "df"
              ? "/assets/icons/df-favicon-icon.png"
              : "/assets/icons/favicon-icon.png"
          }
        />
        <link
          rel="stylesheet"
          href={`/assets/css/global.css?${Math.floor(Date.now() / 1000)}`}
        />
        <link rel="stylesheet" href="/assets/css/megamenu.css" />
        <link rel="stylesheet" href="/assets/css/account-login.css" />
        <link
          rel="stylesheet"
          href={
            getStoreType(domain) === "df"
              ? "/assets/css/df-product.css"
              : "/assets/css/product.css"
          }
        />
        {/* <link rel="stylesheet" href="/assets/css/product.css" />
        <link rel="stylesheet" href="/assets/css/df-product.css" /> */}
        <link rel="stylesheet" href="/assets/css/appointment-forms.css" />
        <link rel="stylesheet" href="/assets/css/jewellery-page.css" />
        {/* <link rel="stylesheet" href="/assets/css/blogmainpage.css" /> */}
        <link
          rel="stylesheet"
          href="/assets/css/search-functionality-page.css"
        />
        <link rel="stylesheet" href="/assets/css/blog-article.css" />
        {/* <link rel="stylesheet" href="/assets/css/about-page.css" /> */}
        <link rel="stylesheet" href="/assets/css/book-apointment.css" />
        <link rel="stylesheet" href="/assets/css/myAccount.css" />

        {checkArrayIteration(headScript) &&
          headScript?.map(({ content }) => getInjectionsData(content))}
      </Head>
      {/* getStoreType(domain) */}
      <body data-theme={getStoreType(domain)}>
        {checkArrayIteration(bodyTopScript) &&
          bodyTopScript?.map(({ content }) => getInjectionsData(content))}
        <Main />
        <NextScript />
        {checkArrayIteration(bodyBottomScript) &&
          bodyBottomScript?.map(({ content }) => getInjectionsData(content))}
      </body>
    </Html>
  );
};

export default Document;

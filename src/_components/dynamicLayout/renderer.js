import React from "react";
import WhyUsBlock from "../common/WhyUsBlock";
import AppointmentBlock from "../common/AppointmentBlock";
import NewsLetter from "../common/NewsLetter";
import Section from "./section";
import ContactUsBlockFAQ from "../common/ContactUsBlockFAQ";
import ContactUsBlock from "../common/ContactUsBlock";
import ExpertAdvice from "../common/ExpertAdvice";
import NeedAssistanceBlock from "../common/NeedAssistanceBlock";
import OurStoresBlock from "../common/OurStoresBlock";
import searchInputEducation from "../common/searchInputEducation";
import SignUpForm from "../common/account/SignUpForm";
import LoginForm from "../common/account/LoginForm";
import AccountLogin from "../staticLayout/account";
import CheckoutPage from "../staticLayout/checkout-page";
import SearchFunctionality from "../staticLayout/search-functionality-page";
import WishList from "../staticLayout/my-account";
import Cart from "../staticLayout/cart/cart";
import ProductListingWithApi from "./product-listing-with-api";
import FindStore from "../findStore";
import ChooseDiamondComponent from "../staticLayout/create-design/create-your-diamond";
import CreateYourSettingComponent from "../staticLayout/create-design/create-your-setting";
import CreateYourDesignComponent from "../staticLayout/create-design/create-your-design";
import ShopBycategori from "../common/jewellery-page/ShopBycategori";
import ThankyouPage from "../staticLayout/thankyou-page";
import NeckLaceListing from "../staticLayout/necklace-listing";
import NaturalDiamondListing from "../staticLayout/natural-diamond-listing";
import GiftingListing from "../staticLayout/gifting-listing";
import DFEngagementRingListingDynamic from "../staticLayout/df-engagement-listing-dynamic";
import DiamondRingListing from "../staticLayout/diamond-listing";
import EarRingListing from "../staticLayout/ear-ring-listing";
import WeddingRingListing from "../staticLayout/wedding-ring";
import BraceletsListing from "../staticLayout/bracelets-listing";
import { SearchInputEducation } from "../staticLayout/search-input";
import ContactUsBlockJewelleryFAQ from "../common/ContactUsBlockJewelleryFAQ";
import DfProductDetail from "../staticLayout/df-pdp";
import ProductWithApi from "./product-with-api";
import DfCheckoutPage from "../staticLayout/df-checkout-page";

import DFVisitShowRoom from "../common/DFVisitShowRoom";
import DfGift from "../common/DfGift";
import DFCart from "../common/DFCart";
import OfferTable from "../common/OfferTable";
import DFMyAccount from "../common/dfMyAccount";
import DfPlpItem from "../common/dfPlpItem";
import DfEmailUs from "../common/DfEmailUs";
import DfFaqs from "../common/DfFaqs";
import DfContact from "../common/DfContact-Us";
import DfCustomerFeedback from "../common/DfCustomerFeedback";
import ABBlog from "../common/ABBlog";
import DFBlog from "../common/DFBlog";
import AsmAdmin from "../common/asm-admin";
import HowItWork from "../common/howitwork";
import ResetPassword from "../staticLayout/account/reset-password";
import FaqTabs from "../common/FaqTabs";
import FollowUsBlock from "../common/FollowUsBlock";
import EngagmentRingCalculator from "../common/engagement-ring-calculator";
import OrderRingSizer from "../common/orderRingSizer";
import DFBespoke from "../common/DFBespoke";
import HappyCustomersTrustPilot from "../common/trust-pilot/HappyCustomersTrustPilot";
import ReviewsSectionTrustPilot from "../common/trust-pilot/ReviewsSectionTrustPilot";
import TrustpilotServiceBanner from "../common/trust-pilot/TrustpilotServiceBanner";
import DFLogin from "@/_components/common/dfMyAccount/login"
import SelectAppointmentPage from "../staticLayout/SelectAppointmentPage";


const componentMap = {
  whyUsBlock: WhyUsBlock,
  newsLetterForm: NewsLetter,
  findStore: FindStore,
  appointment: AppointmentBlock,
  expertAdvice: ExpertAdvice,
  needAssistance: NeedAssistanceBlock,
  OurStoresBlock: OurStoresBlock,
  searchInputEducation: searchInputEducation,
  contactusblock: ContactUsBlockFAQ,
  contactusblockjewellery: ContactUsBlockJewelleryFAQ,
  contactusblockBottom: ContactUsBlock,
  SignUpForm: SignUpForm,
  LoginForm: LoginForm,
  ResetPassword: ResetPassword,
  product: ProductWithApi,
  dfProductDetails: DfProductDetail,
  account: AccountLogin,
  checkout: CheckoutPage,
  searchFunctionality: SearchFunctionality,
  FollowUsBlock: FollowUsBlock,
  myAccount: WishList,
  categoryCollage: ShopBycategori,
  cart: Cart,
  chooseYourSetting: CreateYourSettingComponent,
  chooseDiamond: ChooseDiamondComponent,
  createYourDesign: CreateYourDesignComponent,
  productListing: ProductListingWithApi,
  thankYou: ThankyouPage,
  naturalDiamondListing: NaturalDiamondListing,
  giftingProductListing: GiftingListing,
  engagementRingListing: ProductListingWithApi,
  dfProductListing: DFEngagementRingListingDynamic,
  diamondRingListing: DiamondRingListing,
  earRingListing: EarRingListing,
  weddingRingListing: WeddingRingListing,
  neckLaceListing: NeckLaceListing,
  braceletsListing: BraceletsListing,
  searchInputData: SearchInputEducation,
  DFVisitShowRoom: DFVisitShowRoom,
  dfCheckout: DfCheckoutPage,
  DfGift: DfGift,
  DFCart: DFCart,
  OfferTable: OfferTable,
  DFMyAccount: DFMyAccount,
  DfPlpItem: DfPlpItem,
  DfEmailUs: DfEmailUs,
  DfFaqs: DfFaqs,
  DfContact: DfContact,
  DfCustomerFeedback: DfCustomerFeedback,
  DFBlog: DFBlog,
  ABBlog: ABBlog,
  asmAdmin: AsmAdmin,
  HowItWork: HowItWork,
  FaqTabs: FaqTabs,
  EngagmentRingCalculator: EngagmentRingCalculator,
  OrderRingSizer: OrderRingSizer,
  DFBespoke: DFBespoke,
  HappyCustomersTrustPilot: HappyCustomersTrustPilot,
  ReviewsSectionTrustPilot: ReviewsSectionTrustPilot,
  TrustpilotServiceBanner: TrustpilotServiceBanner,
  BookAppointmentPage: SelectAppointmentPage,
  DFLogin: DFLogin,
};

const Renderer = ({
  data,
  isSingleSection,
  storeId,
  storeName,
  storeObjectId,
  domain,
  pdpPlpdata,
  plpData,
  mergedInjectionData,
  features,
  pageId,
  lang,
  navigationMedias,
  breadcrumbData,
  pdpPayloadData,
  deviceTypeServer,
  currency,
  educationDefaultList,
  faqDefaultList,
  blogData,
  defaultFeatureOptions,
  translateId,
  pageNavigation,
  blockData,
  featureOptionsPrice,
  cookieToken,
  navigationHierarchyId,
  email,
  phoneNumber
}) => {
  switch (data?.section?.type) {
    case "CMS":
      return (
        <Section
          data={data}
          isSingleSection={isSingleSection}
          deviceTypeServer={deviceTypeServer}
          domain={domain}
          currency={currency}
          blockData={blockData}
        />
      );

    case "data":
      const configType = domain.includes("diamondsfactory") && data?.section?.configType === 'cart' ? "DFCart" : data?.section?.configType
      const StaticComponent = componentMap[configType];
      return (
        <StaticComponent
          deviceTypeServer={deviceTypeServer}
          storeId={storeId}
          storeName={storeName}
          storeObjectId={storeObjectId}
          domain={domain}
          pdpPlpdata={pdpPlpdata}
          plpData={plpData}
          mergedInjectionData={mergedInjectionData}
          fetures={features}
          pageId={pageId}
          lang={lang}
          navigationMedias={navigationMedias}
          breadcrumbData={breadcrumbData}
          pdpPayloadData={pdpPayloadData}
          currency={currency}
          educationDefaultList={educationDefaultList}
          faqDefaultList={faqDefaultList}
          blogData={blogData}
          defaultFeatureOptions={defaultFeatureOptions}
          translateId={translateId}
          pageNavigation={pageNavigation}
          featureOptionsPrice={featureOptionsPrice}
          cookieToken={cookieToken}
          navigationHierarchyId={navigationHierarchyId}
          email={email}
          phoneNumber={phoneNumber}
        />
      );

    default:
      return null;
  }
};
export default Renderer;

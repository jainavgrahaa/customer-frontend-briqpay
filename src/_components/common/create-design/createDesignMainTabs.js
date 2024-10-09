import CustomTabsData from "../CustomTabsData";

const CreateDesignMainTabs = () => {
  const mainTabs = [
    {
      label: "Select your setting",
      route: "choose-your-setting",
      tabNumber: "1",
      tabLogo: "/assets/images/create-your-design/select-your-setting.svg",
    },
    {
      label: "Choose your diamond",
      route: "choose-your-diamands",
      tabNumber: "2",
      tabLogo: "/assets/images/create-your-design/choose-your-dimond.svg",
    },
    {
      label: "Your unique ring",
      tabNumber: "3",
      route: "complete-review",
      tabLogo: "/assets/images/create-your-design/unique-ring.svg",
    },
  ];

  return (
    <>
      <CustomTabsData
        tabs={mainTabs}
        extraClass={"main-tabs tab-1"}
        containerClass={"container"}
      />
    </>
  );
};

export default CreateDesignMainTabs;

import { stepCheck } from "@/_utils";
import { useState } from "react";

const HeadTab = () => {
  const [toggleComponent, setToggleComponent] = useState(1);
  const switchComponent = (index) => {
    setToggleComponent(index);
  };

  return (
    <ul className="heading_menu bloc-tabs-heading">
      <li
        className={stepCheck(toggleComponent, 1) ? "tabs active-tabs" : "tabs"}
        onClick={() => switchComponent(1)}
      >
        Home
      </li>
      /
      <li
        className={stepCheck(toggleComponent, 2) ? "tabs active-tabs" : "tabs"}
        onClick={() => switchComponent(2)}
      >
        Account
      </li>
    </ul>
  );
};

export default HeadTab;

import React, { useEffect, useState } from "react";
import BlogmenuItems from "./BlogmenuItems";
import { Button } from "@mui/material";
import TextTitle from '@/_components/atoms/TextTitle';
 
const DFBlog = () => {
 
  const BlogCardData = [
    {
      id: 1,
      img: "/assets/images/diamond-factory/blogs/image-1.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Black diamond engagement ring meaning",
      buttonText: "READ",
    },
    {
      id: 2,
      img: "/assets/images/diamond-factory/blogs/image-2.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "What is a Halo Ring?",
      buttonText: "READ",
    },
    {
      id: 3,
      img: "/assets/images/diamond-factory/blogs/image-3.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Emerald Engagement Ring Meaning",
      buttonText: "READ",
    },
    {
      id: 4,
      img: "/assets/images/diamond-factory/blogs/image-4.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Megan Fox’s Engagement Ring",
      buttonText: "READ",
    },
    {
      id: 5,
      img: "/assets/images/diamond-factory/blogs/image-5.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "8 Of The Best Proposal Ideas That’ll Help Get You A Yes",
      buttonText: "READ",
    },
    {
      id: 6,
      img: "/assets/images/diamond-factory/blogs/image-6.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Coloured Engagement Ring Gemstone Trends",
      buttonText: "READ",
    },
    {
      id: 7,
      img: "/assets/images/diamond-factory/blogs/image-7.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Engagement Ring Trends For 2023",
      buttonText: "READ",
    },
  ];
  const GuidesData = [
    {
      id: 1,
      img: "/assets/images/diamond-factory/blogs/image-1.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "Black diamond engagement ring meaning",
      buttonText: "READ",
    },
    {
      id: 2,
      img: "/assets/images/diamond-factory/blogs/image-2.png",
      cardDate: "MAY 28, 2020 | by Semrah",
      cardTitle: "What is a Halo Ring?",
      buttonText: "READ",
    },
  ];
  const [activeTab,SetactiveTab] = useState(0);
  const tabSelection = (index)=> {
    SetactiveTab(index);
  }
  const cardData = [
    BlogCardData,
    GuidesData   
  ];
  return (
    <>

      <div className="blog-cards-container">
        {cardData[activeTab]?.map((data) => (
          // eslint-disable-next-line react/jsx-key
          <div className="blog-card">
            <img className="blog-card-image" src={data.img} alt=" "/>
            <div className="blog-card-descriptions">
              <div className="blog-content">
                <TextTitle name={data.cardDate} className={"blog-card-date"} variant={"p"}/>
                <TextTitle name={data.cardTitle} className={"blog-card-title"} variant={"h2"}/>
                <Button className="blog-card-button">{data.buttonText}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cardData[activeTab] === undefined && 
      <TextTitle name={"No Data Found"} className={"text-center mt-5 mb-5"} variant={"p"}/>
      }
    </>
  );
};

export default DFBlog;

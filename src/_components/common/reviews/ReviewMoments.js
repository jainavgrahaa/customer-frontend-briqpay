/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { reviewMomentsData } from "@/_utils/customApiData";

const reviewsPerPage = 12;
let arrayForHoldingReviews = [];

const ReviewMoments = () => {
  
  const [ReviewsToShow, setReviewsToShow] = useState([]);
  const [next, setNext] = useState(12);
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [showLess, setShowLess] = useState(false)

  const loopWithSliceMore = (start, end) => {
    const slicedReviews = reviewMomentsData.slice(start, end);
    arrayForHoldingReviews = [...arrayForHoldingReviews, ...slicedReviews];
    setReviewsToShow(arrayForHoldingReviews);
  };

  useEffect(() => {
    loopWithSliceLess(0, reviewsPerPage);
  }, []);

  const loopWithSliceLess = (start, end) => {
    const slicedReviews = reviewMomentsData.slice(start, end);
    arrayForHoldingReviews = [...slicedReviews];
    setReviewsToShow(arrayForHoldingReviews);
  }

  const handleShowMoreReviews = () => {
    loopWithSliceMore(next, next + reviewsPerPage);
    setNext(next + reviewsPerPage);
    setShowLoadMore(false)
    setShowLess(true)
  };
  const handleShowLessReviews = () => {
    loopWithSliceLess(0 , 12);
    setNext(next - reviewsPerPage);
    setShowLoadMore(true)
    setShowLess(false)
  };

  return (
    <section className="review-moments-sec">
      <div className="container">
        <div className="heading-sec">
          <h2 className="heading">Lovely Moments</h2>
        </div>
        <ul className="image-list row">
          {ReviewsToShow.map((review, index) => (
            <li key={index} className="col-3">
              <Link href="">
                <img src={review.image} alt="" />
                <span className="link-on-hover">{review.hoverLink}</span>
              </Link>
            </li>
          ))}
        </ul>
        {showLoadMore && (<button onClick={handleShowMoreReviews} className="load-more btn-link-primary">Load more</button>)}
        {showLess && (<button onClick={handleShowLessReviews} className="show-less btn-link-primary">Show Less</button>)}
      </div>
    </section>
  );
};

export default ReviewMoments;

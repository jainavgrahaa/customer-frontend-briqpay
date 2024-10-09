/* eslint-disable @next/next/no-img-element */
import React from "react";
const ChainNecklace = () => {
    return (
        <div className="row">
            <div className="col-sm-12 col-12 mb-4">
                <div className="light-gray-bg-4-bg">
                    <p><strong>Curb chains:</strong> Curb chains are best known for their classic style and great durability. Unlike other chains with more intricate shapes, curb chains are characterized by interlocking links that lie flat against the skin, creating a smooth and sleek appearance.</p>
                    <p><strong>Cable chains:</strong> Cable chains, also called ‘link chains’, have a distinctive link structure made up of oval or round links that are connected in a uniform pattern. Thanks to their sturdy construction, cable chains are durable and able to withstand everyday wear. They are less prone to kinking or tangling compared to more delicate chain styles.</p>
                    <p><strong>Cable chains with extensions:</strong> Cable with extensions allow you to adjust the length of your initial pendant necklace to grace your neckline perfectly. With three extensions available in 16", 17", and 18" you can choose one that best suits your style.</p>
                    <div className="row mt-5">
                        <div className="col-xl-4 col-lg-6 col-sm-6 col-6">
                            <div className="text-center">
                                <img src="/assets/images/austen-and-blake/modal-img/chain/curb.png" alt="Curb" className="mb-3" />
                                <p>Curb</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-sm-6 col-6">
                            <div className="text-center">
                                <img src="/assets/images/austen-and-blake/modal-img/chain/cable.png" alt="cable" className="mb-3" />
                                <p>Cable</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-sm-6 col-6">
                            <div className="text-center">
                                <img src="/assets/images/austen-and-blake/modal-img/chain/cable-extention.png" alt="Cable with extension" className="mb-3" />
                                <p>Cable with extension</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChainNecklace;

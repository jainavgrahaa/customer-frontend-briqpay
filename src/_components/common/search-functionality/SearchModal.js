/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from "@mui/material";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import Search from "./Search";
import SearchInputField from "@/_components/atoms/InputField/searchInputField";

const SearchModal = ({
	toggleComponent,
	setLoading,
	suggestions,
	isSearchValue,
	loader,
	setSearchTitle,
	searchTitle,
	setserachModal,
	hideProdPageSearch,
	setIsSearchValue,
	setSearchSuggestions,
	searchSuggestions,
	cookieToken,
	pageData,
	setLoader
}) => {
	const { deviceType } = useDeviceHelper();
	return (
		<section className={`search-modal ${deviceType === "mobile" ? "mobile-search-modal" : ""}`}>
			<div className="container">
				{
					!hideProdPageSearch && deviceType !== "mobile" && (
						<div className={"mb-35"}>
							<SearchInputField
								setserachModal={setserachModal}
								searchTitle={searchTitle}
								setSearchTitle={setSearchTitle}
								setIsSearchValue={setIsSearchValue}
								isSearchValue={isSearchValue}
								setSearchSuggestions={setSearchSuggestions}
								searchSuggestions={searchSuggestions}
								cookieToken={cookieToken}
								pageData={pageData}
								setLoader={setLoader}
								loader={loader}
								setLoading={setLoading}
								hideProdPageSearch={hideProdPageSearch}
								toggleComponent={toggleComponent}
							/>
						</div>
					)}
				<button class="mobileMenuToggle" onClick={() => setserachModal(false)}><span class="material-icons-outlined">close</span></button>
				{deviceType === "mobile" &&
					<div className="mb-4">
						{
							<SearchInputField
								setserachModal={setserachModal}
								searchTitle={searchTitle}
								setSearchTitle={setSearchTitle}
								setIsSearchValue={setIsSearchValue}
								isSearchValue={isSearchValue}
								setSearchSuggestions={setSearchSuggestions}
								searchSuggestions={searchSuggestions}
								cookieToken={cookieToken}
								pageData={pageData}
								setLoader={setLoader}
								loader={loader}
								setLoading={setLoading}
								hideProdPageSearch={hideProdPageSearch}
								toggleComponent={toggleComponent}
							/>
						}
					</div>
				}
				<div className="row">
					<div className="col-xl-8 col-lg-6 col-sm-12">
						{
							isSearchValue ?
								<>
									<TextTitle variant="h5" name={"common.suggestionSearch"} />
									{
										loader ? <h4>Loading...</h4> :
											<ul className="list-unstyled">
												{
													suggestions?.length > 0 ? suggestions?.map((data) => <li key={data} className="mb-2"><Link href={`/search/text=${data.label}`} onClick={() => setserachModal(false)}>{data.label}</Link></li>) : <p>There is no product that matches the search criteria.</p>
												}
											</ul>
									}
								</> :
								<>
									{
										!loader &&
										<>
											<TextTitle variant="h5" name={"common.trandingSearch"} />
											<ul className="list-unstyled">
												<li><Link href="/choose-engagement-rings" onClick={() => setserachModal(false)}><FormattedMessage id={"common.Engagementring"} /></Link></li>
												<li><Link href="/wedding-rings" onClick={() => setserachModal(false)}><FormattedMessage id={"common.weddingRings"} /></Link></li>
												<li><Link href="/engagement-rings/solitaire" onClick={() => setserachModal(false)}><FormattedMessage id={"common.Solitare"} /></Link></li>
												<li><Link href="engagement-rings/gemstone" onClick={() => setserachModal(false)}><FormattedMessage id={"common.Gemstone"} /></Link></li>
											</ul>
										</>
									}
								</>
						}
					</div>
					{deviceType === "mobile" &&
						<>
							<div className="col-sm-12">
								<div className="modal-search-productlist mt-4 mb-4">
									<TextTitle variant="h5" name={"Products"} />
								</div>
								<div className="modal-search-contentList mb-4">
									<TextTitle variant="h5" name={"Content"} />
								</div>
							</div>
						</>
					}
					<div className="col-xl-2 col-lg-3 col-sm-6 col-4">
						<TextTitle variant="h5" name={"common.DiscoverText"} />
						<ul className="list-unstyled">
							<li><Link href="/wedding-rings" onClick={() => setserachModal(false)}><FormattedMessage id={"common.weddingRings"} /></Link></li>
							<li><Link href="/gemstone-jewellery" onClick={() => setserachModal(false)}><FormattedMessage id={"common.JewelleryText"} /></Link></li>
							<li><Link href="/education/diamond-guide" onClick={() => setserachModal(false)}><FormattedMessage id={"common.GuidesText"} /></Link></li>
						</ul>
					</div>
					<div className="col-xl-2 col-lg-3 col-sm-6 col-8">
						<TextTitle variant="h5" name={"common.questionHelp"} />
						<ul className="list-unstyled">
							<li><Link href="mailto:service@austenblake.com" className="underline">service@austenblake.com</Link></li>
							<li><Link href="tel:020 7660 1529">020 7660 1529</Link></li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SearchModal;

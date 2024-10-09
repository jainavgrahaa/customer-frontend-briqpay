import SearchInputEducationBlock from "../common/searchInputEducation";

export const SearchInputEducation = ({ storeId, educationDefaultList, faqDefaultList }) => {
  return (
    <>
      <SearchInputEducationBlock storeId={storeId} educationDefaultList={educationDefaultList} faqDefaultList={faqDefaultList} />
    </>
  );
};

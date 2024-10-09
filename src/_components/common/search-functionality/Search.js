import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchModal from '@/_components/common/search-functionality/SearchModal';

const Search = ({
  toggleComponent,
  setToggleComponent,
  setContentData,
  loading,
  setLoading,
  serachModal,
  setserachModal,
  searchData,
  hideProdPageSearch,
  isSearchValue,
  setIsSearchValue,
  cookieToken,
  pageData,
  setLoader,
  loader,
  searchSuggestions,
  setSearchSuggestions
}) => {
  const [searchTitle, setSearchTitle] = useState(searchData ?? '');
  
  return (
    <>
      {serachModal &&
        <SearchModal
          toggleComponent={toggleComponent}
          setToggleComponent={setToggleComponent}
          setContentData={setContentData}
          loading={loading}
          setLoading={setLoading}
          suggestions={searchSuggestions}
          isSearchValue={isSearchValue}
          loader={loader}
          setSearchTitle={setSearchTitle}
          searchTitle={searchTitle}
          setserachModal={setserachModal}
          hideProdPageSearch={hideProdPageSearch}
          SearchModal={SearchModal}
          setIsSearchValue={setIsSearchValue}
          setSearchSuggestions={setSearchSuggestions}
          searchSuggestions={searchSuggestions}
          cookieToken={cookieToken}
          pageData={pageData}
          setLoader={setLoader}
        />}
    </>
  );
};

export default Search;

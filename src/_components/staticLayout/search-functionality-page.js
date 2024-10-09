/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import Product from '@/_components/common/search-functionality/Product'

const SearchFunctionality = ({...props}) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/blogmainpage.css" />
      </Head>
      <Product {...props}/>    
    </>
  )
}

export default SearchFunctionality

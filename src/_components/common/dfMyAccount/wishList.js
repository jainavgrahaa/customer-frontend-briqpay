
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ProductListBox from "@/_components/common/ProductListBox"
import {
  wishListData,
} from "@/_utils/customApiData";
import { TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from 'cookies-next';
import { useRouter } from "next/router";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { storeTypes } from "@/_utils";
import { FormattedMessage } from "react-intl";

const Wishlist = ({ domain, translateId, storeId }) => {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const userToken = getCookie(TOKEN_KEY);
  const { getWishList } = useAuthHelper()

  const fetchWishList = async () => {
    if (storeId) {
      const data = await getWishList(storeId)
      setProducts(data)
    }
  }

  useEffect(() => {
    if (!userToken) {
      router.push('/account-login');
    } else {
      fetchWishList()
    }
  }, [userToken])

  return (
    <>
      <div className="wishlist-container">
        <h2><FormattedMessage id="common.yourwishlist" /></h2>
        <p>
          <FormattedMessage id="df.wishlistDescription" />
        </p>
        {products && Array.isArray(products) && products?.length > 0 ?
          <ProductListBox
            products={products}
            layout={"col-lg-6 col-md-6 col-sm-6 col-12"}
            type={"wishlist"}
            viewMore={true}
            storeTypes={storeTypes}
            domain={domain}
          /> :
          <>
            <p><FormattedMessage id="wishlistemty.message" /></p>
          </>
        }
      </div>
    </>
  );
};

export default Wishlist;

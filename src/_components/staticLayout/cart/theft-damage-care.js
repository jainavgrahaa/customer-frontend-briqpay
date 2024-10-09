import Modal from "@/_components/modal";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export const TheftAndCareModal = ({
  handleCloseModal,
  isInsuranceInfoModal,
  onActionAddClick,
  productPlan,
  currency,
  setAccept,
}) => {
  return (
    <Modal
      onClose={() => {
        handleCloseModal();
        setAccept && setAccept(false);
      }}
      onOk={() => {
        handleCloseModal();
        setAccept && setAccept(false);
      }}
      isOpen={isInsuranceInfoModal}
      title="Theft, damage & loss insurance from T. H. March"
      cancelText="Back to Products"
      okText="Accept"
      onSubmit={() => {
        setAccept(true);
        onActionAddClick();
      }}
    >
      <div className="content-details product-details">
        <div>
          <div className="modal-img img-lg">
            <img alt={<FormattedMessage id="alt.thumb" />} src="/assets/images/cart-thumb-img-01.png" />
          </div>
          <div className="content-right-details">
            <div className="product-desc">
              <h4 className="thumb-clear">{productPlan?.product?.name}</h4>
              <div className="thumb-price">
                <span className="old-price">
                  {currency}
                  {productPlan?.orderLineItemPrice?.discount}
                </span>
                <span className="discounted-price">
                  {currency}
                  {productPlan?.orderLineItemPrice?.price}
                </span>
              </div>
            </div>
            <div className="insurance-desc">
              <div className="modal-img img-sm">
                <img alt={<FormattedMessage id="alt.march" />} src="/assets/images/austen-and-blake/cart/march.png" />
              </div>
              <p className="insurance-desc-paras-desktop">
                1 year cover for £12.94 inclusive of IPT
                <br />3 year cover for £33.96 inclusive of IPT
              </p>
            </div>
          </div>
        </div>

        <p className="insurance-desc-paras-mobile">
          1 year cover for £12.94 inclusive of IPT
          <br />3 year cover for £33.96 inclusive of IPT
        </p>
      </div>
      <div className="content-details">
        <p>
          Our UK customers can insure their purchase with MarchGuard cover from
          T H March, providers of specialist jewellery and watch insurance since
          1887.
        </p>
        <p>
          <strong>Main Policy Benefits</strong>
        </p>
        <ul>
          <li>No excess on claims.</li>
          <li> Simple and easy to arrange.</li>
          <li>Accidental loss*.</li>
          <li>Theft cover*.</li>
          <li>Worldwide cover (up to 30 consecutive days abroad).</li>
          <li>
            All claims are processed through First Class Watches (repair or
            replacement).
          </li>
          <li>
            For 3 year policies, protection is included against price inflation
            on replacement items (see certificate terms for details).
          </li>
          <li>* Subject to terms and conditions of the policy.</li>
        </ul>
        <Link href="#">
          Click here to download the full policy wording document (PDF)
        </Link>
        <p>
          <strong>Please Be Aware</strong>
        </p>
        <ul>
          <li>UK residents only.</li>
          <li>No cover for wear and tear.</li>

          <li>
            No cover for items left in unattended baggage or unattended
            vehicles.
          </li>
          <li>No cover for free gifts or accessories.</li>
          <li>
            There is a 14-day cooling off period. For goods returned under our
            30-day return policy, only a pro-rated refund can be made for months
            remaining after this period.
          </li>
          <li>This insurance is NOT renewable after the initial term.</li>
          <li>Replacement backs on earrings, once per 12 months.</li>
          <li>See policy wording for full details of cover and exclusions.</li>
        </ul>
        <p>
          <strong>Important notice:</strong> Whilst many home insurance policies
          may cover certain pieces of jewellery or watches we would advise all
          customers to check their policies closely. Certain household policies
          have restrictions on watch and jewellery cover, and may include
          limitations such as, no accidental damage cover, no cover outside of
          the home or cover for holidays abroad. They may also restrict your
          choice of jeweller for repair or replacement. In the event of a
          household insurance claim, you may be expected to pay an policy excess
          and any claims made may affect your future premiums.
        </p>
      </div>
    </Modal>
  );
};

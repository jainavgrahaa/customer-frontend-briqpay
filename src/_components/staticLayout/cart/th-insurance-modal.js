import Modal from "@/_components/modal";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export const THModalInsurance = ({
  isCustomerModal,
  handleCloseModal,
  setIsCustomerModal,
  setIsInsuranceInfoModal,
  setAccept
}) => {
  return (
    <Modal
      isOpen={isCustomerModal}
      onClose={() => {
        handleCloseModal();
        setAccept && setAccept(false);
      }}
      // onOk={handleCloseModal}
      title="Insurance Policy Information"
      cancelText="Back to Products"
      okText="Accept"
      onOk={() => {
        handleCloseModal();
        setIsInsuranceInfoModal(true);
        setIsCustomerModal(false);
        setAccept && setAccept(false);
      }}
      onSubmit={() => {
        handleCloseModal();
        setIsInsuranceInfoModal(true);
        setIsCustomerModal(false);
        setAccept && setAccept(true);
      }}
    >
      <div className="modal-img">
        <img alt={<FormattedMessage id="alt.march" />} src="/assets/images/austen-and-blake/cart/march.png" />
      </div>
      <div className="content-details">
        <p>
          {<FormattedMessage id="cart.insuranceOptionaltext"/>}
        </p>
        <p>
          {<FormattedMessage id="cart.administreredTH"/>}
        </p>
        <p>
         <FormattedMessage id="dfCart.unlikelyEvent"/>
        </p>
        <p>
         <FormattedMessage id="dfCart.certificatedetails"/>
        </p>
        <Link href="#">
         <FormattedMessage id="dfCart.clickHeredownload"/>
        </Link>
      </div>
    </Modal>
  );
};

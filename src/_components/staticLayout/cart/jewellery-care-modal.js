import Modal from "@/_components/modal";
import Link from "next/link";

export const JewelleryCareModal = ({
  handleCloseModal,
  isJewelleryPlanModal,
  onActionAddClick,
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
      isOpen={isJewelleryPlanModal}
      title="Jewellery Care Plan Information"
      cancelText="Back to Products"
      className="jewellery-care-modal"
      okText="Accept"
      onSubmit={() => {
        onActionAddClick();
        setAccept && setAccept(true);
      }}
    >
      <div className="content-details">
        <p>
          {` Protect your most beautiful jewellery with an aftercare package that
        covers all that you'll need! Our Jewellery Care Plan ensures your
        jewellery always looks its best. It covers services and repairs at
        the most convenient price, we have a plan that will perfectly suit
        your needs.`}
        </p>
        <p>
          The Jewellery Care Plan varies in price from £99 for 1 year to £400
          for 5 years and covers the following repairs and services:
        </p>
        <ul>
          <li>Re-tipping of claws once per 12 months.</li>
          <li>Rhodium plating for rings in white gold, once per 12 months.</li>
          <li>Chain/bracelet soldering, once per 12 months.</li>
          <li>
            Resetting/tightening diamonds and gemstones, once per 12 months.
          </li>
          <li>Cleaning, inspection and polishing per 12 months.</li>
          <li>Replacement backs on earrings, once per 12 months.</li>
          <li>Soldering earring posts, once per 12 months.</li>
          <li>Clasp replacement (same as original), once per 12 months.</li>
          <li>
            {` Ring sizings up to 2 sizes, maximum once per policy (does not
          cover re-shanking of rings; certain styles of rings are not
          suitable for resizing and are excluded from the resizing service
          under this Plan).`}
          </li>
        </ul>
        <p>
          For more information visit the Jewellery Care Plan page{" "}
          <Link href="#"> here.</Link>
        </p>
        <p>
          {`It's important that you read the Jewellery Care Plan and terms and
        conditions as this details the terms, conditions and any
        restrictions in cover.`}
          <Link href="#">Click here for more information.</Link>
        </p>
      </div>
    </Modal>
  );
};

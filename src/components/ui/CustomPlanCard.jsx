import { Button2 } from "./Buttons";

const CustomPlanCard = ({ data, sureConfirmation }) => {
  return (
    <>
      <div className="MatrimonyCustomOfferCard ss-card">
        {data?.name ? (
          <div className="popularTag fill">Popular Plan</div>
        ) : (
          <div className="popularTag"> &nbsp;</div>
        )}

        <div className="center">
          <div className="planValues">
            <h6 className="planName">{data?.name}</h6>
            <h6 className="price">${data?.amount}</h6>
          </div>

          <Button2 onClick={() => sureConfirmation(data)} name="Buy Plan" />
        </div>
      </div>
    </>
  );
};

export default CustomPlanCard;

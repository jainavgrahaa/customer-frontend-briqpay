import dayjs from "dayjs";
import React from "react";
import Chip from '@mui/material/Chip';

const CustomButton = ({ title, data, selectStore, value, setValue, msg, activeSlots = undefined }) => {
  const isDisabled = (i) => activeSlots && !activeSlots?.[i];
  return (
    <div>
      <div className={`time-wrapper ${selectStore}`}>
        <h5 className="mb-4 text-center">{title}</h5>
        <div className="time-option">
          {data?.length ? data?.map((ele, i) => {
            return (
              <div className="time-options-blocks position-relative" key={ele}>
                <button
                  key={ele.id}
                  className={`option-selections ${
                    (ele.name && value?.id === ele?.id) ||
                    !ele.name && (dayjs(ele)?.diff(dayjs(value)) === 0)
                      ? "active"
                      : ""
                  }`}
                  disabled={isDisabled(i)}
                  style={{ 
                    fontSize: ele.name ? 14 : 10, 
                    backgroundColor: isDisabled(i) ? '#dadee0' : 'none', 
                    borderColor: isDisabled(i) ? '#dadee0' : 'black'
                  }}
                  onClick={() => setValue(ele)}
                >
                  {ele.name || dayjs(ele).format('LT')}
                </button>
                {ele.appointment === false &&
                <Chip label="Opening soon" className="filled-chip"/>
                }
              </div>
            );
          }):<p className="text-center mt-4 mb-4 w-100">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomButton;

import { useState } from "react";
import { filterValues, filterSelectData } from "@/_utils/customApiData";

const Filter = () => {
  const [intialValues, setintialValues] = useState(filterValues);
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    setintialValues({
      ...intialValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="row filter-component">
        <div className="col-lg-6 col-md-6 left-content">
          <p className="sub-heading">Filter:</p>
          <ul>
            {filterSelectData.map(({ name, options }) => (
              <li key={name}>
                <select
                  className=""
                  name={name}
                  value={intialValues[name]}
                  onChange={(e) => handleChange(e)}
                >
                  {options.map(({ lable, value }) => (
                    <option key={value} value={value}>
                      {lable}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-3 col-md-3"></div>
        <div className="col-lg-3 col-md-3 right-content">
          <p className="">
            Sort:
            <select
              className="sub-heading"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            >
              <option value="price1">Category</option>
              <option value="price2">Style</option>
              <option value="price3">Metal</option>
            </select>
          </p>
        </div>
      </div>
    </>
  );
};

export default Filter;

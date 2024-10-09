import { getApiUrl } from ".";

const styleMapping = {
  bgColor: "backgroundColor",
};
export const commonProperty = ["desktop", "mobile", "tablet"];

/**
 * Get element style object
 * @param {object} style
 * @returns object
 */
export const getElementStyle = (style = {}) => {
  const newStyle = {};

  Object.keys(styleMapping).map((key) => {
    if (style[key]) {
      newStyle[styleMapping[key]] = style[key];
    } else {
      newStyle[key] = style[key];
    }
  });
  return newStyle;
};

export const parseProperties = (properties = []) => {
  const result = properties.reduce((acc, item) => {
    let data = {};
    const dataType = item.pagePropertyValues.propertyType;
    Object.entries(item.pagePropertyValues).map(([key, value]) => {
      if (!commonProperty.includes(key)) {
        return;
      }

      switch (dataType) {
        case "number":
          data[key] = Number(value);
          break;
        default:
          data[key] = value;
      }
    });
    acc[item?.pagePropertyValues?.propertyName] = data;
    return acc;
  }, {});

  return result;
};

export const checkObjectForFormat = (obj) => {
  if (!obj) {
    return obj;
  }
  Object.entries(obj).map(([key, value]) => {
    if (key === "properties" && Array.isArray(value)) {
      obj = {
        ...obj,
        ...parseProperties(value),
      };
    } else if (Array.isArray(value)) {
      obj[key] = getFormtedData(value);
    } else if (typeof value === "object") {
      obj[key] = checkObjectForFormat(value);
    }
  });
  return obj;
};

export const getFormtedData = (data) => {
  const result = data.map((item) => checkObjectForFormat(item));
  return result.sort((a, b) => a?.sequence - b?.sequence);
};

export async function getRoutes() {
  // const pageData = getPageData(params?.urlSlug);
  const routes = await fetch(
    getApiUrl(`/page-configuration/getRoutings`)
  );
  const route = await routes.json();
  const pageRoutes =
    route &&
    route?.map((data) => ({
      // [urlSlug]: id
    }));
}

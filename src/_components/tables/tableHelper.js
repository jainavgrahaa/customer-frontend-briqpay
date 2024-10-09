export const formatColumns = (col) =>
  col
    .sort((a, b) => a.sequence - b.sequence)
    .map((ele) => ({
      name: ele.name,
      label: ele.label,
      id: ele.id,
      sequence: ele.sequence,
      featureTranslates: ele.featureTranslates,
    }));

export const formattedRows = (row) => {
  const sortedArr = row.sort((a, b) => a.featureSequence - b.featureSequence);
  const res = {};
  for (let prop of sortedArr) {
    res[prop.featureSequence] = prop.image || "";
    res.referenceId = prop.referenceId;
  }

  return res;
};

export const extractStoneProperties = (product) => {
  const stoneProperties = product?.variantOption[0]?.stoneproperty ?? [];
  const stoneType = product?.variantOption[0]?.stones[0]?.label ?? "";
  const requiredProperties = ["Clarity", "Colour", "Fluorescence"];
  let response = {
    collectioncode: product?.variantOption?.[0]?.collectioncode ?? "",
    stoneType,
  };

  if (stoneProperties) {
    for (let prop of stoneProperties) {
      if (requiredProperties.includes(prop.property)) {
        response[prop.property] = prop.value;
      }
    }
  }
  
  return response;
};

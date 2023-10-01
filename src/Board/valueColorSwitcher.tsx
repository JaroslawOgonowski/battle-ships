export const valueColorSwitcher = (value: number) => {
  switch (value) {
    case 0:
      return "#000000f8"; //no ship
    case 1:
      return "#36d64ef8"; //single
    case 2:
      return "#36e426f8"; //2
    case 3:
      return "#2ad513f8";
    case 4:
      return "#036408f8";
    case 5:
      return "#05350bf8";
    default:
      return "#1c1919f8";
  }
};

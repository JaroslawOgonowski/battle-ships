export const stateColorSwitcher = (state: number) => {
  switch (state) {
    case 0:
      return "#c7c1c1f8";
    case 1:
      return "#e83c12f8";//hit
    case 2:
      return "#156d06f8";//missed
    case 3:
      return "#b11313f8";//direction hit
    default:
      return "#1c1919f8";
  }
};

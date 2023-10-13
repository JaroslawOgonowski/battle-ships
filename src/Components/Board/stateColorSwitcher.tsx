export const stateColorSwitcher = (state: string) => {
  switch (state) {
    case "Initial":
      return "#100f0ff8";
    case "Hit":
      return "#e83c12f8";
    case "Missed":
      return "#156d06f8";
    case "Direct Hit":
      return "#b11313f8";
    default:
      return "#1c1919f8";
  }
};

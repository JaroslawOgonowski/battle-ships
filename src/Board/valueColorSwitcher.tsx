export const valueColorSwitcher = (value: number, state: string) => {
  switch (value) {
    case 0:
      switch (state) {
        case "initial":
          return "#000000f8";
        case "Missed":
          return "#258153f8";
        default:
          return "#000000f8";
      }
    case 1:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 2:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 3:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 4:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 5:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 6:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 7:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 8:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    case 9:
      switch (state) {
        case "initial":
          return "#36e426f8";
        case "Hit":
          return "#e83c12f8";
        case "Direct Hit":
          return "#b11313f8";
        default:
          return "#36e426f8";
      }
    default:
      return "#1c1919f8";
  }
};

export const colorSwitcher = (cell: number) => {
  switch (cell) {
    case 0:
      return "#1c1919f8";
    case 1:
      return "#e83c12f8";
    case 2:
      return "#bcb6b4f8";
    case 3:
      return "#b11313f8";
    default:
      return "#1c1919f8"; // Domyślny kolor w przypadku braku dopasowania
  }
};

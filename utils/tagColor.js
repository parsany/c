const TAG_PALETTE = [
  "#e44d26",
  "#6c63ff",
  "#2196f3",
  "#9c27b0",
  "#00bcd4",
  "#4caf50",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#3776ab",
  "#e91e63",
  "#00acc1",
  "#336791",
  "#8bc34a",
  "#02c39a",
  "#607d8b",
  "#673ab7",
  "#009688",
  "#f44336",
  "#3f51b5",
];

export function getTagColor(tag) {
  const len = tag.length;
  return TAG_PALETTE[len % TAG_PALETTE.length];
}

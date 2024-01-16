// const sassFunction = `@function responsive($value1, $value2, $width1: 320, $width2: 1920) {
//   $x1: $width1;
//   $x2: $width2;
//   $y1: $value1;
//   $y2: $value2;
//   $a: ($y2 - $y1) / ($x2 - $x1);
//   $b: ($x2 * $y1 - $x1 * $y2) / ($x2 - $x1);
//   @return calc(#{$a * 100svw} + #{$b * 1px});
// }`;

export function responsive(
  value1: number,
  value2: number,
  width1 = 320,
  width2 = 1920
) {
  const x1 = width1,
    x2 = width2,
    y1 = value1,
    y2 = value2;

  const a = (y2 - y1) / (x2 - x1);
  const b = (x2 * y1 - x1 * y2) / (x2 - x1);

  return `calc((${a} * 100svw) + (${b} * 1px))`;
}

export const responsiveH = (
  value1: number,
  value2: number,
  height1 = 320,
  height2 = 1080
) => {
  const x1 = height1,
    x2 = height2,
    y1 = value1,
    y2 = value2;

  const a = (y2 - y1) / (x2 - x1);
  const b = (x2 * y1 - x1 * y2) / (x2 - x1);

  return `calc((${a} * 100svh) + (${b} * 1px))`;
};
export const responsiveX = (
  value1: number,
  value2: number,
  width1 = 320,
  width2 = 1920
) => {
  const x1 = width1,
    x2 = width2,
    y1 = value1,
    y2 = value2;

  const a = (y2 - y1) / (x2 - x1);
  const b = (x2 * y1 - x1 * y2) / (x2 - x1);

  if (typeof window !== "undefined") return a * window.innerWidth + b;
  else return a * width2 + b;
};
export const responsiveY = (
  value1: number,
  value2: number,
  height1 = 320,
  height2 = 1080
) => {
  const x1 = height1,
    x2 = height2,
    y1 = value1,
    y2 = value2;

  const a = (y2 - y1) / (x2 - x1);
  const b = (x2 * y1 - x1 * y2) / (x2 - x1);

  if (typeof window !== "undefined") return a * window.innerHeight + b;
  else return a * height2 + b;
};

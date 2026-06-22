export const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const easeInOutExpo = (t: number) =>
  t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;

export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export const easeInOutCirc = (t: number) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;

export const expoBezier: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const quartBezier: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const circBezier: [number, number, number, number] = [0.85, 0, 0.15, 1];

// Real cut-out flower photos used by FlowerBurst (public/images/flowers/flower-01.png ...).
export const flowerPack = Array.from(
  { length: 17 },
  (_, i) => `/images/flowers/flower-${String(i + 1).padStart(2, '0')}.png`
);

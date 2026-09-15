// The Gift Quest — a small collectible game. Add/remove gifts freely
// (5–7 works best). Codes are case-insensitive on input, stored uppercase.
// Never surface `code` anywhere in the rendered UI — only the validator reads it.
export const giftsConfig = {
  // true = must open gifts in order (recommended, more suspense)
  requireInOrder: true,
};

export const gifts = [
  {
    id: 1,
    title: 'Món quà 01',
    emoji: '🎁',
    code: 'LOVE01',
    flavorText: 'Món đầu tiên trong hành trình hôm nay!\nMở ra xem bên trong có gì nào 👀',
    unlockMessage: 'Yay! Món đầu tiên đã mở 🎉\nCùng đi tiếp thôi!',
  },
  {
    id: 2,
    title: 'Món quà 02',
    emoji: '🧸',
    code: 'LOVE02',
    flavorText: 'Cái này chắc chắn sẽ làm em cười đó 😆',
    unlockMessage: 'Hai rồi nè! Đang ngày càng hay ho đó 💖',
  },
  {
    id: 3,
    title: 'Món quà 03',
    emoji: '🍬',
    code: 'LOVE03',
    flavorText: 'Đã đi được nửa chặng đường rồi đó!',
    unlockMessage: 'Nửa đường rồi! Giỏi ghê 🌟',
  },
  {
    id: 4,
    title: 'Món quà 04',
    emoji: '💌',
    code: 'LOVE04',
    flavorText: 'Món này nhỏ xíu nhưng ý nghĩa lắm nha.',
    unlockMessage: 'Bốn món rồi đó! Sắp xong rồi 🥳',
  },
  {
    id: 5,
    title: 'Món quà 05',
    emoji: '🧁',
    code: 'LOVE05',
    flavorText: 'Còn một chút nữa thôi là xong hết rồi!',
    unlockMessage: 'Wowww chỉ còn một món cuối nữa thôi!',
  },
  {
    id: 6,
    title: 'Món quà 06',
    subtitle: 'MÓN CUỐI CÙNG',
    emoji: '✨',
    code: 'LOVE06',
    flavorText: 'Đây là món cuối cùng rồi đó!\nMở ra để xem điều bất ngờ nha 🎬',
    unlockMessage: 'Hoàn thành tất cả rồi! 🎊',
  },
];

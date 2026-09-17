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
    code: '180901',
    flavorText: 'Món đầu tiên trong hành trình hôm nay!\nMở ra xem bên trong có gì nào 👀',
    unlockMessage: 'Yay! Món đầu tiên đã mở 🎉\nCùng đi tiếp thôi!',
  },
  {
    id: 2,
    title: 'Món quà 02',
    emoji: '🧸',
    code: '180902',
    flavorText: 'Em không nhớ món này là món gì =))))',
    unlockMessage: 'Hai rồi nè! Đang ngày càng hay ho đó 💖',
  },
  {
    id: 3,
    title: 'Món quà 03',
    emoji: '🍬',
    code: '180903',
    flavorText: 'Đã đi được một chặng đường rồi đó!',
    unlockMessage: 'Ba món rồi! Giỏi ghê 🌟',
  },
  {
    id: 4,
    title: 'Món quà 04',
    emoji: '💌',
    code: '180904',
    flavorText: 'Món này nhỏ xíu nhưng ý nghĩa lắm nha.',
    unlockMessage: 'Bốn món rồi đó! Đã đi được nửa chặng đường!',
  },
  {
    id: 5,
    title: 'Món quà 05',
    emoji: '🧁',
    code: '180905',
    flavorText: 'Còn vài món nữa thôi là xong hết rồi!',
    unlockMessage: 'Năm rồi nè! Sắp về đích rồi đó 🥳',
  },
  {
    id: 6,
    title: 'Món quà 06',
    emoji: '✨',
    code: '180906',
    flavorText: 'Sắp xong rồi, ráng thêm chút nữa nha!',
    unlockMessage: 'Sáu món rồi! Chỉ còn hai món nữa thôi 🎊',
  },
  {
    id: 7,
    title: 'Món quà 07',
    emoji: '🎈',
    code: '180907',
    flavorText: 'Chỉ còn một món cuối nữa là xong hết!',
    unlockMessage: 'Bảy món rồi! Còn đúng một món bí mật cuối cùng nữa thôi 👀',
  },
  {
    id: 8,
    title: 'Món quà bí mật',
    subtitle: 'MÓN CUỐI CÙNG',
    emoji: '🤫',
    code: '18092001',
    flavorText: 'Suỵt... đây là món quà bí mật, không ai biết trước được đâu 🤫\nMở ra xem là gì nha!',
    unlockMessage: 'Bất ngờ chưa? Hoàn thành tất cả rồi! 🎊✨',
  },
];

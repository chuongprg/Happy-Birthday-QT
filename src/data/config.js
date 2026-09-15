// Central personalization layer — edit these values to re-personalize the whole site.
export const birthdayConfig = {
  fullName: 'Nguyễn Mai Quế Trân',
  name: 'Quế Trân',

  birthDate: '18.09.2001',
  birthYear: 2001,

  date: '18.09.2026',
  day: '18',
  month: 'SEPTEMBER',
  monthIndex: 8, // 0-indexed (JS Date convention) — 8 = September, for the calendar popup
  year: '2026',
  age: 2026 - 2001,

  // Kept in English on purpose — this line reads as an editorial tagline,
  // not an instruction, so it stays as originally written.
  openingEyebrow: 'A SPECIAL DAY',
  openingHeadline: 'FOR SOMEONE SPECIAL',
  openingInviteCta: 'Open the Invitation',

  messageTitle: 'HÔM NAY LÀ NGÀY CỦA TRÂN 💕',
  messageLines: [
    'Có những ngày rất bình thường.',
    'Nhưng có những ngày\nxứng đáng được nhớ mãi.',
    'Và hôm nay chính là một ngày như thế 🥰',
  ],

  finalMessageTitle: 'CHÚC MỪNG SINH NHẬT 🎂',
  finalMessageLines: ['Và đây...', 'chỉ mới là bắt đầu thôi 💫'],
  finalMessageBody:
    'Cảm ơn chị Quế Trân\nvì đã là một phần\ntrong những kỷ niệm đẹp nhất của em.\n\n25 tuổi — chúc chị Trân\nluôn rực rỡ như hôm nay.\n\nHẹn cùng nhau\ntạo thêm thật nhiều kỷ niệm nữa nhé 🎈',
  finalSignature: '— Yêu thương 💌',

  finalVideo: '/video/final-birthday-video.mp4',

  soundEnabled: false,

  // A one-off plan change: dinner moved earlier than the birthday itself.
  // On this exact day, opening the invitation reveals only this — the rest
  // of the story stays locked until the real birthday (see
  // src/utils/birthdayGate.js and RestaurantReveal.jsx).
  dinnerReveal: {
    day: '16', // same month/year as the birthday above
    date: '16.09.2026',
    time: '20:00',
    restaurantName: 'Pearl - White House',
    address: 'Toà nhà Sunwah, 90 Nguyễn Hữu Cảnh, Thạnh Mỹ Tây, Hồ Chí Minh',
    mapUrl: 'https://maps.app.goo.gl/U15aLobFnhLozBXE8',
  },

  // A light narrative frame over the existing sections — gives the site a
  // clear beginning ("prologue") and end ("HẾT") instead of feeling like a
  // loose stack of features. `chapters` maps 1:1 to the main story sections
  // in scroll order; components just read their own index.
  story: {
    prologue: 'Câu chuyện của Trân\nbắt đầu từ đây...',
    chapters: [
      { number: '01', title: 'LỜI CHÚC' },
      { number: '02', title: 'KÝ ỨC' },
      { number: '03', title: 'HÔM NAY' },
      { number: '04', title: 'CUỘC PHIÊU LƯU' },
      { number: '05', title: 'BẤT NGỜ' },
    ],
    epilogueLabel: 'LỜI KẾT',
    closingLine: 'Và đó là câu chuyện của Trân,\ncho đến tận hôm nay.',
    theEnd: 'HẾT',
  },
};

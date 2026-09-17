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

  messageTitle: 'HÔM NAY LÀ NGÀY CỦA QUẾ TRÂN 💕',
  messageLines: [
    'Có những ngày rất bình thường.',
    'Nhưng có những ngày\nxứng đáng được nhớ mãi.',
    'Và hôm nay chính là một ngày như thế.',
    'Ngày mà thế giới này bỗng xinh đẹp hơn khi có chị Quế Trân 🌷',
  ],

  finalMessageTitle: 'CHÚC MỪNG SINH NHẬT 🎂',
  finalMessageLines: ['Và cũng đến lúc...', 'ngắm nhìn sự xinh đẹp này một lần nữa 💫'],
  finalMessageBody:
    'Cảm ơn chị Quế Trân\nvì đã là một phần\ntrong những kỷ niệm đẹp nhất của em.\n\n25 tuổi — chúc chị Trân\nluôn được yêu thương, vui vẻ và hạnh phúc 💕.\n\nĐến lúc phải nói lời chào rồi\nHãy nghỉ ngơi để viết tiếp tuổi 25 thật rực rỡ nhé ạ 🎈',
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

  // The rest of the story unlocks at midnight on the birthday (see `date`
  // above), but the Gift Quest minigame itself waits a bit longer — it
  // stays visible-but-locked with a countdown until this exact moment (see
  // src/utils/birthdayGate.js's isQuestUnlocked and QuestIntro.jsx).
  questUnlock: {
    date: '18.09.2026',
    time: '18:19:01',
  },

  // A light narrative frame over the existing sections — gives the site a
  // clear beginning ("prologue") and end ("HẾT") instead of feeling like a
  // loose stack of features. `chapters` maps 1:1 to the main story sections
  // in scroll order; components just read their own index.
  story: {
    prologue: 'Cùng khám phá những điều bất ngờ thôi nào\nBắt đầu thôi...',
    chapters: [
      { number: '01', title: 'LỜI CHÚC' },
      { number: '02', title: 'KÝ ỨC' },
      { number: '03', title: 'HÔM NAY' },
      { number: '04', title: 'CUỘC PHIÊU LƯU' },
      { number: '05', title: 'BẤT NGỜ' },
    ],
    epilogueLabel: 'LỜI KẾT',
    closingLine: 'Cảm ơn chị Quế Trân vì đã khiến cho,\nthế giới này xinh đẹp hơn🌷.',
    theEnd: 'HẾT',
  },
};

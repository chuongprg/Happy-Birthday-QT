// Today's event schedule. `status` is computed at runtime relative to the
// current time, but the Gift Quest / Final Surprise rows are tied to the
// interactive quest state instead (see EventTimeline.jsx).
export const timelineEvents = [
  {
    time: '14:00',
    title: 'Gặp nhau',
    description: 'Mọi thứ bắt đầu từ khoảnh khắc gặp nhau nè.',
    icon: 'Users',
  },
  {
    time: '15:00',
    title: 'Chơi board game',
    description: 'Một chút thi đua cho vui thôi mà 😆',
    icon: 'Dices',
  },
  {
    time: '18:00',
    title: 'Ăn tối sinh nhật',
    description: 'Đồ ăn ngon, người đồng hành còn ngon hơn.',
    icon: 'UtensilsCrossed',
  },
  {
    time: '19:30',
    title: 'Ôn lại kỷ niệm',
    description: 'Nhìn lại một chút trước khi tiếp tục nào.',
    icon: 'Camera',
  },
  {
    time: '20:00',
    title: 'Gift Quest',
    description: 'Một vài món quà đang chờ được mở ra.',
    icon: 'Gift',
    key: 'quest',
  },
  {
    time: '21:00',
    title: 'Bất ngờ cuối cùng',
    description: 'Điều duy nhất em chưa mở khoá được.',
    icon: 'Sparkles',
    key: 'finale',
  },
];

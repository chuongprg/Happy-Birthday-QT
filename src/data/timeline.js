// Today's event schedule. `status` is computed at runtime relative to the
// current time, but the Gift Quest / Final Surprise rows are tied to the
// interactive quest state instead (see EventTimeline.jsx).
export const timelineEvents = [
  {
    date: '16/09',
    fullDate: '16.09.2026',
    time: '20:00',
    title: 'Ăn tối',
    description: 'Bữa tối sinh nhật ấm cúng cùng nhau tại Pearl - White House.',
    icon: 'UtensilsCrossed',
  },
  {
    date: '17/09',
    fullDate: '17.09.2026',
    time: '09:00',
    title: 'Nhận quà sinh nhật',
    description: 'Món quà bất ngờ đặc biệt đã được chuẩn bị và gửi tới Quế Trân 🎁.',
    icon: 'Gift',
  },
  {
    date: '18/09',
    fullDate: '18.09.2026',
    time: '00:00',
    title: 'Happy Birthday',
    description: 'Khoảnh khắc chính thức bước sang tuổi mới thật xinh đẹp và rực rỡ 🎂✨.',
    icon: 'Sparkles',
  },
  {
    date: '18/09',
    fullDate: '18.09.2026',
    time: '18:19:01',
    displayTime: '18:19:01',
    title: 'Minigame nhập Giftcode bắt đầu mở',
    description: 'Minigame mở khoá — nhập các mật mã bí mật để mở từng món quà!',
    icon: 'Gift',
    key: 'quest',
  },
];

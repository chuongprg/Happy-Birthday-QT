import Countdown from '../UI/Countdown.jsx';
import { birthdayConfig } from '../../data/config.js';
import { parseDateTime } from '../../utils/parseDateTime.js';

const TARGET_MS = parseDateTime(birthdayConfig.dinnerReveal.date, birthdayConfig.dinnerReveal.time);

export default function DinnerCountdown() {
  return <Countdown targetMs={TARGET_MS} label="ĐẾM NGƯỢC ĐẾN GIỜ HẸN" arrivedLabel="ĐẾN GIỜ HẸN RỒI 🎉" />;
}

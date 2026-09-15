import SectionHeading from '../UI/SectionHeading.jsx';
import GlowBackground from '../UI/GlowBackground.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import MemoryCard from './MemoryCard.jsx';
import { memories } from '../../data/memories.js';
import { stickerPack } from '../../data/stickerPack.js';
import { birthdayConfig } from '../../data/config.js';

export default function MemoryGallery() {
  return (
    <section id="section-memories" className="relative w-full overflow-hidden bg-cream py-24">
      <GlowBackground variant="pastel" />

      <div className="relative z-10 mb-12 px-6 sm:px-12">
        <PhotoSticker
          sticker={stickerPack.giggle}
          className="-top-6 right-6 sm:right-16"
          size={76}
          rotate={-10}
        />
        <SectionHeading
          chapter={birthdayConfig.story.chapters[1]}
          eyebrow="📸 NHỮNG KỶ NIỆM CỦA NĂM QUA"
          title={'Một chút góp nhặt\nnhững khoảnh khắc khó quên.'}
        />
      </div>

      <div className="relative z-10 flex gap-6 overflow-x-auto px-6 pb-6 pt-2 sm:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {memories.map((memory, i) => (
          <MemoryCard key={memory.title} memory={memory} index={i} />
        ))}
        <div className="w-2 flex-shrink-0" />
      </div>
    </section>
  );
}

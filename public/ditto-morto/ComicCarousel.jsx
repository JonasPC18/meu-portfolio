import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ComicCarousel({ pages, onClose, startIndex = 0 }) {
  if (!pages?.length) return null;

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const videoRefs = useRef([]); // guarda refs dos <video>

  const handleSlideChange = swiper => {
    const newIndex = swiper.activeIndex;

    // pausa o vídeo que ficou para trás
    const oldVid = videoRefs.current[activeIndex];
    if (oldVid && !oldVid.paused) {
      oldVid.pause();
      oldVid.currentTime = 0;
    }

    // toca o novo
    const newVid = videoRefs.current[newIndex];
    if (newVid) {
      newVid.currentTime = 0;
      // play pode falhar em browsers que bloqueiam autoplay com áudio,
      // então usamos catch para evitar erro no console
      newVid.play().catch(() => {});
    }

    setActiveIndex(newIndex);
  };

  const renderMedia = (src, idx) => {
    if (/\.(mp4|webm|ogg)$/i.test(src)) {
      return (
        <video
          ref={el => (videoRefs.current[idx] = el)}
          src={src}
          // só coloca autoPlay / som se este é o slide ativo
          autoPlay={idx === activeIndex}
          loop
          playsInline
          controls
          style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
        />
      );
    }

    return (
      <img
        src={src}
        alt={`página ${idx + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
      />
    );
  };

  return (
    <div className="comic-modal-bg" onClick={onClose}>
      <div className="comic-modal" onClick={e => e.stopPropagation()}>
        <button className="comic-close" onClick={onClose}>×</button>

        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          initialSlide={startIndex}
          onSlideChange={handleSlideChange}
          style={{ width: 'min(90vw, 560px)', 
            height: 'clamp(260px, 65vh, 780px)'
          }}
        >
          {pages.map((src, idx) => (
            <SwiperSlide key={idx}>{renderMedia(src, idx)}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

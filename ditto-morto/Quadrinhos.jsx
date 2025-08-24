// src/pages/Quadrinhos.jsx
import { useState } from 'react';
import { comics } from '../data/comics';
import ComicCarousel from '../components/ComicCarousel.jsx';

export default function Quadrinhos() {
  const [openComic, setOpenComic] = useState(null);

  return (
    <>
      <div className="text">
        <h2>Quadrinhos</h2>
      </div>

      <div className="gallery">
        {comics.map((c, i) => (
          <div
            key={c.id}
            style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => setOpenComic(i)}
          >
            <img
              src={c.cover}
              alt={c.title}
              style={{
                width: 280,
                height: 280,
                objectFit: 'contain',
                background: '#111',
                borderRadius: 10,
                boxShadow: '0 2px 8px #0007',
                border: '2px solid #fff'
              }}
            />
          </div>
        ))}
      </div>

      {openComic !== null && (
        <ComicCarousel
          pages={comics[openComic].pages}
          onClose={() => setOpenComic(null)}
        />
      )}
    </>
  );
}

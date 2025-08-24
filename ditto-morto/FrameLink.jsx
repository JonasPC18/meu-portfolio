import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import moldura10 from '../assets/moldura_10.jpg';
import moldura20 from '../assets/moldura_20.jpg';
import moldura30 from '../assets/moldura_30.jpg';

const frames = [moldura10, moldura20, moldura30];

export default function FrameLink({ to, children }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    let frame = 0, interval;

    el.style.backgroundImage = `url('${frames[0]}')`;

    const enter = () =>
      (interval = setInterval(() => {
        el.style.backgroundImage = `url('${frames[frame]}')`;
        frame = (frame + 1) % frames.length;
      }, 100));
    const leave = () => {
      clearInterval(interval);
      frame = 0;
      el.style.backgroundImage = `url('${frames[0]}')`;
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <NavLink
      ref={ref}
      to={to}
      className="moldura"
    >
      {children}
    </NavLink>
  );
}

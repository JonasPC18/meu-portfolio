import { NavLink, Outlet, Link } from 'react-router-dom';
import FrameLink from './FrameLink.jsx';

export default function Layout() {
  return (
    <>
      <header className="titulo">
        <h1 className="logo">
          <Link to="/">Ditto Morto</Link>
        </h1>

        <nav>
          <ul className="menu">
            {['filmes', 'quadrinhos', 'desenhos', 'bio'].map((p) => (
              <li key={p}>
                <FrameLink to={`/${p}`}>{p.toUpperCase()}</FrameLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Outlet />
      <footer className="footer">
      <p>© 2025 Ditto Morto — <a href="https://instagram.com/ditto.morto" target="_blank" rel="noopener noreferrer">@ditto.morto</a></p>
      </footer>
    </>
  );
}

import { Outlet } from "react-router-dom";
import "./Layout.css"; // opcjonalnie
import { NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <ul className="nav-links">
          <li><NavLink to="/email-generator">Email Generator</NavLink></li>
          <li><NavLink to="/email-history">Email History</NavLink></li>
          <li><NavLink to="/auth">Logout</NavLink></li>
        </ul>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
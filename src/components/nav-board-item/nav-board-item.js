import { NavLink } from "react-router-dom";

const NavBoardItem = ({ board }) => {
  const { id, name, color } = board;
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "nav-board-item nav-board-item--active" : "nav-board-item"
      }
      to={`/boards/${id}`}
    >
      <div
        className={`nav-board-item_color nav-board-item_color--${color}`}
      ></div>
      <span>{name}</span>
      <div className="nav-board-item_button">...</div>
      <div className="nav-board-item_button">⭐</div>
    </NavLink>
  );
};

export default NavBoardItem;

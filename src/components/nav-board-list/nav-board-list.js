import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../../api/api";
import NavBoardItem from "../nav-board-item/nav-board-item";
import Popup from "../popup/popup";

const NavBoardList = () => {
  const {
    isLoading,
    isError,
    error,
    data: boards = [],
  } = useQuery(["boards"], getBoards);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section>
      <header className="nav-board-list__header">
        <span className="title">Your boards</span>
        <button className="btn-add">
          <FontAwesomeIcon icon={"plus"} />
        </button>
        <Popup>
          <p>Hello World!</p>
        </Popup>
      </header>

      <div className="nav-board-list_content">
        {boards.map((board) => (
          <NavBoardItem key={board.id} board={board} />
        ))}
      </div>
    </section>
  );
};

export default NavBoardList;

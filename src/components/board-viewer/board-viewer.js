import { useCallback, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoard, getBoardColumns, setColumn } from "../../api/api";
import { useOutletContext, useParams } from "react-router-dom";
import BoardColumn from "../board-column/board-column";
import AddItem from "../add-item/add-item";

const BoardViewer = () => {
  const params = useParams();
  const boardId = Number(params.boardId);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingBoard,
    isError: isErrorBoard,
    error: errorBoard,
    data: board = [],
  } = useQuery(["board", boardId], async () => getBoard(boardId));

  const {
    isLoading: isLoadingColumns,
    isError: isErrorColumns,
    error: errorColumns,
    data: columns = [],
  } = useQuery(["columns", boardId], async () => getBoardColumns(boardId));

  const columnMutation = useMutation(
    ({ boardId, column }) => setColumn(boardId, column),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["columns", boardId]);
      },
    }
  );

  const outletContainerRef = useOutletContext();
  const lastBoardIdRef = useRef(null);

  const lastColumnRef = useCallback(() => {
    if (lastBoardIdRef.current === boardId) {
      outletContainerRef.current.scrollLeft =
        outletContainerRef.current.scrollWidth;
    }

    lastBoardIdRef.current = boardId;
  }, [outletContainerRef, boardId]);

  const handleSubmitColumn = (columnName) => {
    columnMutation.mutate({ boardId, column: { name: columnName } });
  };

  const [columnIdOfNewTask, setColumnIdOfNewTask] = useState(null);
  const [isEditNewColumn, setIsEditNewColumn] = useState(false);

  return (
    <section>
      {isLoadingBoard ? (
        <p>Loading board...</p>
      ) : isErrorBoard ? (
        <p>Error: {errorBoard}</p>
      ) : (
        <h2>{board.name}</h2>
      )}

      {isLoadingColumns ? (
        <p>Loading columns...</p>
      ) : isErrorColumns ? (
        <p>Error: {errorColumns}</p>
      ) : (
        <div className="board-column_container">
          {columns.map((column, index) => (
            <BoardColumn
              key={column.id}
              boardId={board.id}
              column={column}
              toggleAddTaskEdit={() => {
                if (columnIdOfNewTask !== column.id) {
                  setColumnIdOfNewTask(column.id);
                } else {
                  setColumnIdOfNewTask(null);
                }
              }}
              isEditAddTask={columnIdOfNewTask === column.id}
              ref={index === columns.length - 1 ? lastColumnRef : null}
            />
          ))}
          <div className="board-column_add-column-container">
            <AddItem
              itemName="column"
              isEdit={isEditNewColumn}
              toggleEdit={() => {
                setIsEditNewColumn(!isEditNewColumn);
              }}
              onSubmit={handleSubmitColumn}
              textAreaOptions={{
                rows: "1",
                cols: "20",
                placeholder: "Enter column title...",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BoardViewer;

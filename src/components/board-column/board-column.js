import { useState, useEffect, useRef, forwardRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, updateColumnName, setTask } from "../../api/api";
import TaskCard from "../task-card/task-card";
import AddItem from "../add-item/add-item";

const BoardColumn = forwardRef(
  ({ boardId, column, toggleAddTaskEdit, isEditAddTask }, ref) => {
    const queryClient = useQueryClient();

    const {
      isLoading,
      isError,
      error,
      data: tasks = [],
    } = useQuery(["tasks", boardId, column.id], async () =>
      getTasks(boardId, column.id)
    );

    const mutation = useMutation(
      ({ boardId, columnId, name }) => {
        return updateColumnName(boardId, columnId, name);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["columns", boardId], {
            exact: true,
            refetchType: "active",
          });
        },
      }
    );

    const taskMutation = useMutation(
      ({ boardId, columnId, task }) => setTask(boardId, columnId, task),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["tasks", boardId, column.id]);
        },
      }
    );

    const [columnName, setColumnName] = useState(column.name);
    const [editNameActive, setEditNameActive] = useState(false);
    const columnTitleRef = useRef(null);

    useEffect(() => {
      if (editNameActive) {
        columnTitleRef.current.focus();
      }
    });

    const handleSubmitName = (e) => {
      e?.preventDefault();
      mutation.mutate({
        boardId,
        columnId: column.id,
        name: columnName.trim(),
      });

      setEditNameActive(false);
    };

    const handleSubmitTask = (taskTitle) => {
      taskMutation.mutate({
        boardId,
        columnId: column.id,
        task: {
          title: taskTitle.trim(),
          body: "",
          columnId: column.id,
        },
      });
    };

    if (isLoading) {
      return <p>Loading tasks...</p>;
    } else if (isError) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <article className="board-column " ref={ref}>
        {editNameActive ? (
          <form onSubmit={handleSubmitName} method="PATCH">
            <input
              typeof="text"
              className="board-column__name board-column__name--edit"
              name="columnName"
              ref={columnTitleRef}
              value={columnName}
              onChange={(e) => {
                setColumnName(e.target.value);
              }}
              onBlur={() => {
                setEditNameActive(false);
                handleSubmitName();
              }}
            />
          </form>
        ) : (
          <p
            className="board-column__name"
            onClick={() => {
              setEditNameActive(true);
            }}
          >
            {columnName}
          </p>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <AddItem
          itemName="task"
          isEdit={isEditAddTask}
          toggleEdit={toggleAddTaskEdit}
          onSubmit={handleSubmitTask}
          textAreaOptions={{
            rows: "5",
            cols: "20",
            placeholder: "Enter a title for this task...",
          }}
        />
      </article>
    );
  }
);

export default BoardColumn;

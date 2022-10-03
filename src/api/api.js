import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4000" });

export const getBoards = async () => {
  const { data } = await axiosInstance.get("/boards");

  return data;
};

export const getBoard = async (boardId) => {
  const { data } = await axiosInstance.get(`/boards/${boardId}`);

  return data;
};

export const getBoardColumns = async (boardId) => {
  const { data } = await axiosInstance.get(`/boards/${boardId}/columns`);

  return data;
};

export const getTasks = async (boardId, columnId) => {
  const { data } = await axiosInstance.get(
    `/boards/${boardId}/columns/${columnId}/tasks`
  );

  return data;
};

export const setTask = async (boardId, columnId, task) => {
  const { data } = await axiosInstance.post(
    `/boards/${boardId}/columns/${columnId}/tasks`,
    task
  );

  return data;
};

export const setColumn = async (boardId, column) => {
  const { data } = await axiosInstance.post(
    `/boards/${boardId}/columns`,
    column
  );

  return data;
};

export const updateColumnName = async (boardId, columnId, name) => {
  console.log("name= ", name);
  const { data } = await axiosInstance.patch(
    `/boards/${boardId}/columns/${columnId}`,
    { name }
  );

  return data;
};

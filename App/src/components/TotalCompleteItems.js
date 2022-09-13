import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteCompletedToDo,
    deleteCompletedTodoAsync,
} from "../redux/todoSlice";

const TotalCompleteItems = () => {
    const dispatch = useDispatch();

    const completedTodos = useSelector((state) =>
        state.todos.filter((todo) => {
            return todo.completed === true;
        })
    );

    const handleDeleteAll = () => {
        dispatch(deleteCompletedTodoAsync());
        dispatch(deleteCompletedToDo());
    };

    return (
        <div className="footer">
            <h4 className="mt-3">
                Total Completed Task: {completedTodos.length}
            </h4>
            <button
                className="btn btn-danger delete-all-btn"
                onClick={handleDeleteAll}
            >
                Delete
            </button>
        </div>
    );
};

export default TotalCompleteItems;

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    "todos/getTodosAsync",
    async () => {
        const response = await fetch("http://localhost:7000/todos");
        if (response.ok) {
            const todos = await response.json();
            return { todos };
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload) => {
        const response = await fetch("http://localhost:7000/todos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ title: payload.title }),
        });

        if (response.ok) {
            const todo = await response.json();
            return { todo };
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    "todos/completeTodoAsync",
    async (payload) => {
        const response = await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ completed: payload.completed }),
            }
        );
        if (response.ok) {
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (payload) => {
        const response = await fetch(
            `http://localhost:7000/todos/${payload.id}`,
            {
                method: "DELETE",
            }
        );
        if (response.ok) {
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

export const deleteCompletedTodoAsync = createAsyncThunk(
    "todos/deleteCompletedTodoAsync",
    async () => {
        const response = await fetch(`http://localhost:7000/todos/`, {
            method: "PATCH",
        });
        if (response.ok) {
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: [
        { id: 1, title: "todo1", completed: false },
        { id: 2, title: "todo2", completed: false },
        { id: 3, title: "todo3", completed: true },
    ],
    reducers: {
        addToDo: (state, action) => {
            const newToDo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newToDo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => {
                return todo.id === action.payload.id;
            });
            state[index].completed = action.payload.completed;
        },
        deleteToDo: (state, action) => {
            return state.filter((todo) => {
                return todo.id !== action.payload.id;
            });
        },
        deleteCompletedToDo: (state, action) => {
            return state.filter((todo) => {
                return todo.completed === false;
            });
        },
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            console.log(state);
            state.filter((todo) => {
                return todo.id !== action.payload.id;
            });
            console.log(state);
        },
        [deleteCompletedTodoAsync.fulfilled]: (state, action) => {
            state.filter((todo) => {
                return todo.completed === false;
            });
            console.log(state);
        },
    },
});

export const { addToDo, toggleComplete, deleteToDo, deleteCompletedToDo } =
    todoSlice.actions;
export default todoSlice.reducer;

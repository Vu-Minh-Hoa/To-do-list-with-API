import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToDo, addTodoAsync } from "../redux/todoSlice";

const AddTodoForm = () => {
    const ref = useRef();
    const [value, setValue] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addTodoAsync({
                title: value,
            })
        );
        dispatch(
            addToDo({
                title: value,
            })
        );
        setValue("");
        ref.current.focus();
    };

    return (
        <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
            <label className="sr-only">Name</label>
            <input
                ref={ref}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Add todo..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></input>

            <button type="submit" className="btn btn-primary mb-2">
                Submit
            </button>
        </form>
    );
};

export default AddTodoForm;

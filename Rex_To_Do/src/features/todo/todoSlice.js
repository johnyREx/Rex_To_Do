import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            };
            if(todo.text!=""){
                state.todos.push(todo);
                // Save the updated todos array to local storage
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id != action.payload
            );
            // Save the updated todos array to local storage
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        updateTodo: (state, action) => {
			const { id, updatedText } = action.payload;
			state.todos = state.todos.map((todo) =>
				todo.id === id ? { ...todo, text: updatedText } : todo
			);
			// Save the updated todos array to local storage
			localStorage.setItem('todos', JSON.stringify(state.todos));
		},
    },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
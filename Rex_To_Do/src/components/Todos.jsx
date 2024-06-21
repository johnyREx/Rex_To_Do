import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();
	const [editingTodo, setEditingTodo] = useState(null);

	return (
		<>
			<div className="text-3xl m-3 p-3">Todos</div>
			<ul className="list-none">
				{todos.map((todo) => (
					<li
						className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded text-center"
						key={todo.id}>

						{editingTodo?.id === todo.id ? (
							<>
								<input
									type="text"
									value={editingTodo.text}
									onChange={(e) =>
										setEditingTodo({
											...editingTodo,
											text: e.target.value,
										})
									}
									style={{
										background: "transparent",
										border: "1px solid rgba(255, 255, 255, 0.3)",
										flex: 1,
										color: "white",
										marginRight: "10px",
									}}
								/>
								<button
									onClick={() => {
										dispatch(
											updateTodo({
												id: editingTodo.id,
												updatedText: editingTodo.text,
											})
										);
										setEditingTodo(null);
									}}
									className="bg-white p-1 rounded-full mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</button>
							</>

						) : (
							<div className="w-full flex justify-between items-center">
								<div className="text-white ">{todo.text}</div>
								<div>
									<button
										onClick={() => setEditingTodo(todo)}
										className="bg-white p-1 rounded-full mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</button>
									<button
										onClick={() =>
											dispatch(removeTodo(todo.id))
										}
										className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
								</div>
							</div>
						)}
					</li>
				))}
			</ul>
		</>
	);
}

export default Todos;


/* FLOW OF THE ABOVE CODE (HOW DOES IT WORK?) 
1. The user has a list of saved todos, each represented by a todo object with properties like id and text.

2. Each todo item is displayed with its text and two buttons: an "edit" button (with a pencil icon) and a "remove" button (not shown in the excerpt).

3. When the user clicks the "edit" button for a todo, the onClick event handler calls setEditingTodo(todo). This sets the editingTodo state to the todo object of the clicked item. This indicates that this todo item is now being edited.

4. The component re-renders due to the state change. Now, editingTodo?.id === todo.id is true for the todo item being edited. So, the first part of the ternary operator is rendered for this item.

5. This part of the UI contains an input field (not shown in the excerpt) for editing the todo text. The input field's value is likely set to editingTodo.text, so it initially displays the current text of the todo.

6. As the user types in the input field, the onChange event handler (not shown in the excerpt) updates editingTodo.text with the new text. This allows the component to keep track of the user's changes.

7. Once the user is done editing, they can click the "save" button (with a checkmark icon, judging by the SVG path). This button's onClick event handler does two things:

	a) It dispatches an updateTodo action to the Redux store with the id of the editingTodo and the updated text. This action updates the text of the todo item in the Redux store.

	b) It calls setEditingTodo(null), which sets the editingTodo state back to null. This indicates that no todo item is being edited now.

8. The component re-renders again due to the state change. Now, editingTodo?.id === todo.id is false for all todo items, so the second part of the ternary operator is rendered for all items. This part of the UI shows the updated todo text and the "edit" and "remove" buttons.*/
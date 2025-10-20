"use client";

import cls from "./utils/cls";
import { useTodos } from "./hooks/useTodos";
import { dateUtils } from "flxhelpers/client";

export default function Home() {
  const {
    todos,
    inputValue,
    setInputValue,
    isAdding,
    toggleAdding,
    inputRef,
    addTodo,
    toggleComplete,
    deleteTodo,
    handleKeyPress,
    isEditing,
    openEdit
  } = useTodos();

  const formatDate = (date?: string) => {
    if ( date ) {
      return dateUtils.format(date, "MMM. dd, yyyy [E] - hh:mm p")
    }
  }

  return (
    <div className={cls("h-full overflow-hidden", "flex flex-col bg-gray-100")}>
      {/* header */}
      <div className={cls("bg-teal-500 text-white shadow-sm relative z-[1]")}>
        <div className="w-full max-w-md mx-auto h-14 flex items-center justify-center px-4">
          <h3 className="text-xl font-medium text-center">Todo</h3>
        </div>
      </div>

      {/* todo list */}
      <div className="flex-1 overflow-x-hidden">
        <div className="w-full max-w-md mx-auto divide-y divide-gray-200">
          {todos.map((todo) => (
            <div key={todo.id} className={cls(
              "flex items-center justify-between p-4 h-14 cursor-pointer select-none",
              todo.done ? "bg-gray-200" : ""
            )}>
              <div
                onClick={() => toggleComplete(todo)}
                className="flex items-center gap-2 flex-1 cursor-pointer"
              >
                <div>
                  {todo.done ? "✅" : "⬜"}
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className={cls("text-sm font-semibold", todo.done ? "text-gray-500" : "")}>
                    {todo.text}
                  </span>
                  <span className={cls("text-xs opacity-50", todo.done ? "text-gray-500" : "")}>
                    {formatDate(todo.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(todo)}>✏️</button>
                <button onClick={() => deleteTodo(todo)}>❌</button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* fab */}
      <button
        onClick={toggleAdding}
        className={cls(
          "w-14 text-white rounded-[56px] fixed right-4 z-10 overflow-hidden",
          "flex flex-col items-center justify-end shadow-lg outline-none select-none",
          "transition-all duration-200 ease-out bottom-8",
          isAdding || isEditing
            ? "bg-red-500 hover:bg-red-600 h-28"
            : "bg-teal-600 hover:bg-teal-400 h-14"
        )}
      >
        <div className="h-28">
          <div
            onClick={addTodo}
            className={cls(
              "bg-white rounded-full text-sm flex items-center justify-center",
              "size-12 m-1 overflow-hidden transition-all duration-200 ease-out",
              isAdding || isEditing ?"translate-y-0" : "translate-y-14"
            )}
          >
            💾
          </div>
          <div
            onClick={toggleAdding}
            className={cls(
              "rounded-full size-14 flex items-center justify-center relative z-[1]",
              "transition-all duration-200 text-4xl font-medium ",
              isAdding || isEditing ? "bg-red-500 rotate-45" : "rotate-0 bg-teal-600"
            )}
          >
            +
          </div>
        </div>
      </button>

      {/* input panel */}
      <div
        className={cls(
          "fixed z-[5] bottom-0 left-0 right-0 bg-white h-[180px]",
          "transition-all duration-500 shadow-lg",
          isAdding || isEditing ? "bottom-0" : "bottom-[-180px]"
        )}
      >
        <div className="w-full max-w-md mx-auto py-8 pl-8 pr-24 md:pr-8">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="text"
              id="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="text"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              { isEditing ? "Edit todo" : "What to do?"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

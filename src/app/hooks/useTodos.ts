"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Todo, TodoEngine } from "todo-app-engine";

export function useTodos() {
  const engineRef = useRef<TodoEngine>(new TodoEngine());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAdding, setAdding] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      await engineRef.current.init();
      const allTodos = await engineRef.current.listAll();
      setTodos(allTodos);
    };
    init();
  }, []);

  const openAdd = () => {
    setAdding(true);
    setEditing(false);
    setEditingTodo(null);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const openEdit = (todo: Todo) => {
    setEditing(true);
    setAdding(false);
    setEditingTodo(todo);
    setInputValue(todo.text);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const addTodo = async () => {
    if (!inputValue.trim()) return;
    if (isEditing && editingTodo?.id) {
      await engineRef.current.update(editingTodo.id, inputValue.trim());
      setTodos(todos.map((t) => (t.id === editingTodo.id ? { ...t, text: inputValue } : t)));
      setEditingTodo(null);
    } else {
      const newTodo = await engineRef.current.add(inputValue.trim());
      setTodos([...todos, newTodo]);
    }
    setAdding(false);
    setEditing(false);
    setInputValue("");
  };

  const toggleComplete = async (todo: Todo) => {
    if (!todo.id) return;
    await engineRef.current.complete(todo.id, !todo.done);
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = async (todo: Todo) => {
    if (!todo.id) return;
    await engineRef.current.delete(todo.id);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  return {
    todos,
    inputValue,
    setInputValue,
    isAdding,
    toggleAdding: openAdd,
    inputRef,
    addTodo,
    toggleComplete,
    deleteTodo,
    handleKeyPress,
    isEditing,
    editingTodo,
    openEdit,
  };
}

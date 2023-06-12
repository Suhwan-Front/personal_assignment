import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  const fetchTodos = async () => {
    const accessToken = localStorage.getItem('jwt');
    try {
      const responseGet = await axios.get(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(`응답: ${JSON.stringify(responseGet.data)}`);
      setTodos(responseGet.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handelAddTodo = async () => {
    const accessToken = localStorage.getItem('jwt');

    const todoData = {
      todo: newTodo,
    };

    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        todoData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`응답 내용 : ${JSON.stringify(response.data)}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
    setNewTodo('');
  };

  const handleUpdateTodo = async id => {
    const accessToken = localStorage.getItem('jwt');

    const todoUpdate = {
      todo: editTodoText,
      isCompleted: todos.find(todo => todo.id === id).isCompleted,
    };

    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        todoUpdate,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`응답 내용 : ${JSON.stringify(response.data)}`);
      fetchTodos();
      setEditTodoId(null);
      setEditTodoText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleStartEdit = (todoId, todoText) => {
    setEditTodoId(todoId);
    setEditTodoText(todoText);
  };

  const handleDeleteTodo = async id => {
    const accessToken = localStorage.getItem('jwt');

    try {
      const response = await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(`응답 내용 : ${JSON.stringify(response.data)}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    const accessToken = localStorage.getItem('jwt');

    const updatedIsCompleted = !isCompleted; // 현재 값의 반대로 변경

    const todoUpdate = {
      todo: todos.find(todo => todo.id === id).todo,
      isCompleted: updatedIsCompleted,
    };

    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        todoUpdate,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`응답 내용 : ${JSON.stringify(response.data)}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to="/">메인 페이지</Link>
      <div>투두 리스트 페이지</div>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        data-testid="new-todo-input"
      />
      <button onClick={handelAddTodo} data-testid="new-todo-add-button">
        추가
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={e => setEditTodoText(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo.id)}>제출</button>
                <button onClick={handleCancelEdit}>취소</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() =>
                    handleToggleComplete(todo.id, todo.isCompleted)
                  }
                />
                <span>{todo.todo}</span>
                <button onClick={() => handleStartEdit(todo.id, todo.todo)}>
                  수정
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </>
            )}
            <label></label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;

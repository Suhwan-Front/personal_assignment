/* eslint-disable no-undef */
/* eslint-disable no-console */
import axios from 'axios';
import {useEffect, useState} from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const accessToken = localStorage.getItem('jwt');
      try {
        const responseGet = await axios.get('http://localhost:8000/todos', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(`응답: ${JSON.stringify(responseGet.data)}`);
        setTodos(responseGet.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handelAddTodo = async () => {
    const accessToken = localStorage.getItem('jwt');

    const todoData = {
      todo: newTodo,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/todos',
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

  return (
    <>
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
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
              <button>수정</button>
              <button>삭제</button>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;

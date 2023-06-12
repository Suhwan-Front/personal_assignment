const TodoList = () => {
  return (
    <>
      <div>투두 리스트 페이지</div>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
    </>
  );
};

export default TodoList;

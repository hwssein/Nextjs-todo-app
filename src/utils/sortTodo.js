const sortTodo = (todos) => {
  let sorted = {};

  todos.map((item) => {
    if (!sorted[item.status]) sorted[item.status] = [];

    sorted[item.status].push(item);
  });

  return sorted;
};

export { sortTodo };

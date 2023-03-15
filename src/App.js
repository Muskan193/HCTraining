import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography ,TextField} from "@mui/material";
import './App.css';
import { Box } from "@mui/system";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  return (
    <div className="App">
      <Box className="container">
        
        <Typography sx={{ color:'black'}} variant="h3">Todo List App</Typography>
        <form className="todoForm" onSubmit={handleSubmit}>
       
          <TextField className="todoForm"  sx={{width:"100%"}}  
           placeholder="Add Task here" variant="standard"  value={todo}
            onChange={(e) => setTodo(e.target.value)} />
          <button  className="btn_main" type="submit"> {editId ? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li  className="singleTodo">
              <span  className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}><EditIcon/></button>
              <button onClick={() => handleDelete(t.id)}><DeleteIcon/></button>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default App;

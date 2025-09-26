import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) navigate("/login");

  const fetchNotes = () => {
    axios
      .get(`${API_URL}notes/`, { headers: { Authorization: `Token ${token}` } })
      .then((res) => setNotes(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleSubmit = () => {
    const data = { title, content };
    if (editingNote) {
      axios
        .put(`${API_URL}notes/${editingNote.id}/`, data, { headers: { Authorization: `Token ${token}` } })
        .then(() => { setEditingNote(null); setTitle(""); setContent(""); fetchNotes(); });
    } else {
      axios
        .post(`${API_URL}notes/`, data, { headers: { Authorization: `Token ${token}` } })
        .then(() => { setTitle(""); setContent(""); fetchNotes(); });
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}notes/${id}/`, { headers: { Authorization: `Token ${token}` } })
      .then(() => fetchNotes());
  };

  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes App</h2>
      <button onClick={logout}>Logout</button>
      <h3>{editingNote ? "Edit Note" : "Add Note"}</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br />
      <button onClick={handleSubmit}>{editingNote ? "Update" : "Add"}</button>
      <hr />
      <h3>Your Notes</h3>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => handleEdit(note)}>Edit</button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Home;

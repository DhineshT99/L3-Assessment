import { useState, useEffect } from "react";
import { useDebounce } from "./store/useDebounce";
import { fetchUsers } from "./store/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import "./App.css";

function UsersPage() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.users);
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue.trim()) {
      dispatch(fetchUsers(debouncedValue))
        .unwrap()
        .then((data) => console.log("Fetched users:", data))
        .catch((err) => console.log("Fetch error:", err));
    } else {
      dispatch(fetchUsers(""));
    }
  }, [debouncedValue, dispatch]);

  return (
    <div className="users-container">
      <h2>User Listing</h2>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {loading && <p className="info loading">Loading...</p>}
        {error && <p className="info error">Error: {error}</p>}
        {!loading && !error && data.length === 0 && (
          <p className="info no-data">No users found</p>
        )}
        <div className="user-list">
          {data.map((u) => (
            <div className="user-card" key={u.id}>
              <div className="user-name">{u.name}</div>
              <div className="user-email">{u.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;

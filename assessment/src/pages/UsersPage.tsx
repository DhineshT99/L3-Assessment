import { useState, useEffect } from "react";
import { useDebounce } from "../store/useDebounce";
import { fetchUsers } from "../store/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import "../App.css";
import { UserList } from "../components/UserList";

function UsersPage() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.users);
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchUsers(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div className="users-container">
      <h2>User Listing</h2>
      <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <UserList
        items={data}
        loading={loading}
        error={error ?? undefined}
        renderItem={(user) => (
          <div className="user-card" key={user.id}>
            <div className="user-name">
              <span className="label">Name:</span> {user.name}
            </div>
            <div className="user-email">
              <span className="label">E mail:</span> {user.email}
            </div>
          </div>
        )}
        emptyMessage={
          <div style={{ textAlign: "center", padding: 18 }}>
            No users found.
          </div>
        }
        errorMessage={
          <div style={{ color: "#d32f2f", textAlign: "center", padding: 18 }}>
            Failed to fetch users. Try again later.
          </div>
        }
      />
    </div>
  );
}
export default UsersPage;

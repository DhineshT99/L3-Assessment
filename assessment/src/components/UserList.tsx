import Loader from "./Loader";

interface UserListProps<T> {
  items: T[];
  loading: boolean;
  error?: string;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export function UserList<T>({
  items,
  loading,
  error,
  renderItem,
  emptyMessage = <div style={{ textAlign: "center", padding: "18px", color: "#555" }}>No data found.</div>,
  errorMessage = <div style={{ textAlign: "center", color: "#d32f2f", padding: "18px" }}>Something went wrong. Please try again.</div>,
  loadingFallback = <Loader />
}: UserListProps<T>) {
  if (loading) return <>{loadingFallback}</>;
  if (error) return <>{errorMessage}</>;
  if (!items.length) return <>{emptyMessage}</>;
  return (
    <div className="user-list">
      {items.map(renderItem)}
    </div>
  );
}

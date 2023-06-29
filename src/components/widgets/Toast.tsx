export default function Toast({ children }: { children: React.ReactNode }) {
  return (
    <div className="position-absolute top-0 start-50 m-4 z-3 translate-middle-x">
      <div className="bg-white p-2 rounded">{children}</div>
    </div>
  );
}

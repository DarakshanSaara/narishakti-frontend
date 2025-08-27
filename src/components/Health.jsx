export default function Health() {
  return (
    <pre>
      {JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }, null, 2)}
    </pre>
  );
}

// Template re-monta a cada navegação → dispara o fade de transição de rota.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}

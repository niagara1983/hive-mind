export function LoadingStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-[104px] rounded-lg bg-muted" />
        </div>
      ))}
    </div>
  )
}
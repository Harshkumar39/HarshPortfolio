export function GlobalLoader() {
  return (
    <div className="global-loader" role="status" aria-label="Loading page">
      <span className="loader-mark">H<span>.</span></span>
      <span className="loader-track"><span /></span>
      <span className="sr-only">Loading</span>
    </div>
  )
}

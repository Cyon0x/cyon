import { CodeField } from "./CodeField";

/** Fixed backdrop: hairline grid, a hand-placed code layer and film grain. */
export function GridBackdrop() {
  return (
    <>
      <div className="backdrop-grid" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <CodeField />
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}

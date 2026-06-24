import { useSuperStore } from "../store/useSuperStore.js";

export default function NotesWidget() {
  const notes = useSuperStore((state) => state.notes);
  const setNotes = useSuperStore((state) => state.setNotes);

  return (
    <section className="notes-card">
      <div className="notes-card__header">
        <h2>All notes</h2>
        {notes && (
          <button type="button" onClick={() => setNotes("")}>
            Clear
          </button>
        )}
      </div>
      <textarea
        aria-label="All notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="This is how I am going to learn MERN Stack in next 3 months."
      />
    </section>
  );
}

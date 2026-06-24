import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand.jsx";
import { categories } from "../data/assets.js";
import { useSuperStore } from "../store/useSuperStore.js";

export default function Categories() {
  const navigate = useNavigate();
  const savedCategories = useSuperStore((state) => state.categories);
  const setCategories = useSuperStore((state) => state.setCategories);
  const [selected, setSelected] = useState(savedCategories);
  const [touched, setTouched] = useState(false);

  const canContinue = selected.length >= 3;

  function toggleCategory(name) {
    setTouched(true);
    setSelected((current) =>
      current.includes(name)
        ? current.filter((category) => category !== name)
        : [...current, name]
    );
  }

  function continueToDashboard() {
    setTouched(true);

    if (!canContinue) {
      return;
    }

    setCategories(selected);
    navigate("/dashboard");
  }

  return (
    <main className="category-page">
      <section className="category-page__intro">
        <Brand />
        <h1>Choose your entertainment category</h1>
        <div className="selected-tags">
          {selected.map((category) => (
            <button key={category} type="button" onClick={() => toggleCategory(category)}>
              {category} <span>x</span>
            </button>
          ))}
        </div>
        {touched && !canContinue && (
          <p className="category-page__error">Minimum 3 category required</p>
        )}
      </section>
      <section className="category-grid" aria-label="Entertainment categories">
        {categories.map((category) => {
          const isSelected = selected.includes(category.name);

          return (
            <button
              type="button"
              key={category.name}
              className={`category-card ${isSelected ? "is-selected" : ""}`}
              style={{ backgroundColor: category.color }}
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              <img src={category.image} alt="" />
            </button>
          );
        })}
      </section>
      <button
        type="button"
        className="next-button"
        disabled={!canContinue}
        onClick={continueToDashboard}
      >
        Next Page
      </button>
    </main>
  );
}

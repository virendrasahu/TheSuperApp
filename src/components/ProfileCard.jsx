import { heroAssets } from "../data/assets.js";
import { useSuperStore } from "../store/useSuperStore.js";

export default function ProfileCard({ compact = false }) {
  const user = useSuperStore((state) => state.user);
  const categories = useSuperStore((state) => state.categories);

  return (
    <section className={`profile-card ${compact ? "profile-card--compact" : ""}`}>
      <img className="profile-card__avatar" src={heroAssets.profileAvatar} alt="" />
      <div className="profile-card__content">
        <p>{user.name || "Super User"}</p>
        <p>{user.email || "user@superapp.dev"}</p>
        <h2>{user.username || "superuser"}</h2>
        <div className="profile-card__chips">
          {categories.slice(0, compact ? 4 : 6).map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

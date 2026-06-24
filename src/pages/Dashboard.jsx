import { useNavigate } from "react-router-dom";
import NewsWidget from "../components/NewsWidget.jsx";
import NotesWidget from "../components/NotesWidget.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import TimerWidget from "../components/TimerWidget.jsx";
import WeatherWidget from "../components/WeatherWidget.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-grid__left">
          <ProfileCard compact />
          <WeatherWidget compact />
          <TimerWidget />
        </div>
        <NotesWidget />
        <div className="dashboard-grid__right">
          <NewsWidget />
          <button type="button" className="browse-button" onClick={() => navigate("/movies")}>
            Browse
          </button>
        </div>
      </div>
    </main>
  );
}

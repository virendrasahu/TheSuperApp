import { useEffect, useMemo, useState } from "react";
import { fetchLatestNews } from "../services/newsApi.js";

export default function NewsWidget() {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let active = true;

    fetchLatestNews().then((items) => {
      if (active) {
        setArticles(items);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (articles.length < 2) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % articles.length);
    }, 2000);

    return () => window.clearInterval(id);
  }, [articles.length]);

  const article = articles[activeIndex];

  const dateLabel = useMemo(() => {
    if (!article?.publishedAt) {
      return "";
    }

    return new Date(article.publishedAt).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [article]);

  return (
    <article className="news-card">
      {!article && <p className="muted news-card__loading">Loading news...</p>}
      {article && (
        <>
          <div
            className="news-card__image"
            style={{ backgroundImage: `url("${article.image}")` }}
          >
            <div>
              <h2>{article.title}</h2>
              <p>{dateLabel}</p>
            </div>
          </div>
          <div className="news-card__copy">
            <p>{article.description}</p>
            <span>{article.source}</span>
          </div>
        </>
      )}
    </article>
  );
}

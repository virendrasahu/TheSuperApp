import { heroAssets } from "../data/assets.js";

const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

const fallbackArticles = [
  {
    title: "Want to climb Mount Everest?",
    image: heroAssets.newsEverest,
    description:
      "Expedition teams, technology, and preparation continue to reshape how climbers approach the world's highest mountain.",
    source: "Super App Daily",
    publishedAt: "2026-06-23T07:35:00.000Z",
  },
  {
    title: "Streaming platforms chase smarter discovery",
    image: heroAssets.newsEverest,
    description:
      "Personalized recommendations are becoming a larger part of how viewers decide what to watch next.",
    source: "Culture Wire",
    publishedAt: "2026-06-23T06:20:00.000Z",
  },
];

export async function fetchLatestNews() {
  try {
    if (!newsApiKey) {
      throw new Error("Missing News API key.");
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
    );

    if (!response.ok) {
      throw new Error("News request failed.");
    }

    const data = await response.json();

    const mappedArticles = (data.articles || [])
      .filter((article) => article.title && article.description)
      .map((article) => ({
      title: article.title,
      image: article.urlToImage || heroAssets.newsEverest,
      description: article.description,
      source: article.source?.name || "NewsAPI",
      publishedAt: article.publishedAt,
      url: article.url,
    }));

    return mappedArticles.length > 0 ? mappedArticles : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

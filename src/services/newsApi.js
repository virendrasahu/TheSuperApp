import { heroAssets } from "../data/assets.js";

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
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=8"
    );

    if (!response.ok) {
      throw new Error("News request failed.");
    }

    const data = await response.json();

    return data.results.map((article) => ({
      title: article.title,
      image: article.image_url || heroAssets.newsEverest,
      description: article.summary,
      source: article.news_site,
      publishedAt: article.published_at,
      url: article.url,
    }));
  } catch {
    return fallbackArticles;
  }
}

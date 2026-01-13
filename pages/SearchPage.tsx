import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Article } from '../types';
import { api } from '../services/api';

// Helper component to highlight matching text
const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  // Split text by the query, case-insensitive
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 text-black">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await api.searchArticles(query);
      setResults(data);
      setLoading(false);
    };
    doSearch();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black font-serif mb-6 border-b-4 border-black pb-2">
        Search Results for: <span className="text-red-700">"{query}"</span>
      </h2>

      {loading ? (
        <div className="text-center py-20 font-serif text-gray-500">Searching archives...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded">
          <p className="text-xl font-serif text-gray-600 mb-2">No articles found.</p>
          <p className="text-sm text-gray-400">Try searching for "Tech", "Politics", or "Climate".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {results.map(article => (
            <Link key={article.id} to={`/article/${article.slug}`} className="flex flex-col md:flex-row gap-6 group border-b border-gray-100 pb-8 last:border-0">
              <div className="w-full md:w-64 h-40 flex-shrink-0 overflow-hidden">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex-1">
                <span className="text-red-700 text-xs font-bold uppercase mb-2 block">{article.categoryName}</span>
                <h3 className="font-serif text-2xl font-bold mb-3 group-hover:underline leading-tight">
                  <Highlight text={article.title} highlight={query} />
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-2">
                  <Highlight text={article.excerpt} highlight={query} />
                </p>
                <span className="text-xs text-gray-400 font-bold">{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
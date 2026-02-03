import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Article } from '../types';

export const ArchivePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');

    const [archiveDates, setArchiveDates] = useState<{ year: number, month: number, count: number }[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch dates sidebar
                const dates = await api.getArchiveDates();
                setArchiveDates(dates);

                // Fetch articles if filters present
                if (yearParam) {
                    const fetchedArticles = await api.getArticlesByDate(
                        parseInt(yearParam),
                        monthParam ? parseInt(monthParam) : undefined
                    );
                    setArticles(fetchedArticles);
                } else {
                    // Default to latest articles or empty? 
                    // Let's show nothing or a prompt to select date.
                    setArticles([]);
                }
            } catch (error) {
                console.error('Failed to fetch archive data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [yearParam, monthParam]);

    const getMonthName = (month: number) => {
        return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>News Archive - Gossip Gazette</title>
                <meta name="description" content="Browse Gossip Gazette's article archive by year and month." />
                <link rel="canonical" href="https://gossipgazette.online/archive" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-8 font-serif border-b border-black pb-4">
                News Archive
                {yearParam && <span className="text-red-700 ml-2 text-2xl">
                    {yearParam} {monthParam && ` / ${getMonthName(parseInt(monthParam))}`}
                </span>}
            </h1>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar - Dates */}
                <div className="md:col-span-1 border-r border-gray-200 pr-4">
                    <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Browse by Date</h3>
                    <div className="space-y-4">
                        {archiveDates.length === 0 ? (
                            <p className="text-gray-500">No archives available.</p>
                        ) : (
                            <ul className="space-y-2">
                                {archiveDates.map((date) => (
                                    <li key={`${date.year}-${date.month}`}>
                                        <Link
                                            to={`/archive?year=${date.year}&month=${date.month}`}
                                            className={`flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-colors ${yearParam === String(date.year) && monthParam === String(date.month)
                                                ? 'bg-gray-100 font-bold text-red-700'
                                                : 'text-gray-700'
                                                }`}
                                        >
                                            <span>{getMonthName(date.month)} {date.year}</span>
                                            <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-600">{date.count}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Main Content - Articles List */}
                <div className="md:col-span-3">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
                        </div>
                    ) : !yearParam ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Select a Date</h3>
                            <p className="text-gray-500">Please select a month and year from the sidebar to browse the archive.</p>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-500">No articles found for this period.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {articles.map((article) => (
                                <div key={article.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8">
                                    <div className="md:w-1/3">
                                        <Link to={`/article/${article.slug}`}>
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="w-full h-48 object-cover rounded shadow-sm hover:opacity-90 transition-opacity"
                                            />
                                        </Link>
                                    </div>
                                    <div className="md:w-2/3">
                                        <Link to={`/category/${article.categoryName.toLowerCase()}`} className="text-red-700 font-bold text-xs uppercase tracking-widest mb-2 block">
                                            {article.categoryName}
                                        </Link>
                                        <Link to={`/article/${article.slug}`} className="hover:text-red-700 transition-colors">
                                            <h2 className="text-2xl font-bold font-serif mb-2 leading-tight">{article.title}</h2>
                                        </Link>
                                        <div className="flex items-center text-gray-400 text-xs mb-3 space-x-2">
                                            <span>By {article.authorName}</span>
                                            <span>•</span>
                                            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <Link to={`/article/${article.slug}`} className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-red-700 hover:border-red-700 transition-colors">
                                            Read Full Story
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { api } from './services/api';
import { Category } from './types';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch global navigation data
    api.getCategories().then(setCategories);
  }, []);

  return (
    <HashRouter>
      <Layout categories={categories}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
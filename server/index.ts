import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { neonService } from '../services/neon-service';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- ARTICLES ---
app.get('/api/articles', async (req, res) => {
    try {
        if (req.query.category) {
            const articles = await neonService.getArticlesByCategory(req.query.category as string);
            return res.json(articles);
        }
        if (req.query.q) {
            const articles = await neonService.searchArticles(req.query.q as string);
            return res.json(articles);
        }
        const articles = await neonService.getArticles();
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

app.get('/api/articles/:slug', async (req, res) => {
    try {
        const article = await neonService.getArticleBySlug(req.params.slug);
        if (!article) return res.status(404).json({ error: 'Not found' });
        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});

app.post('/api/articles', async (req, res) => {
    try {
        const article = await neonService.createArticle(req.body);
        res.json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create article' });
    }
});

app.put('/api/articles/:id', async (req, res) => {
    try {
        await neonService.updateArticle(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update article' });
    }
});

app.delete('/api/articles/:id', async (req, res) => {
    try {
        await neonService.deleteArticle(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

// --- CATEGORIES ---
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await neonService.getCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        // Expecting { name: string }
        const category = await neonService.createCategory(req.body.name);
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        await neonService.deleteCategory(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// --- COMMENTS ---
app.get('/api/comments', async (req, res) => {
    try {
        if (req.query.articleId) {
            const comments = await neonService.getComments(req.query.articleId as string);
            res.json(comments);
        } else {
            const comments = await neonService.getAllComments();
            res.json(comments);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.post('/api/comments', async (req, res) => {
    try {
        const comment = await neonService.addComment(req.body);
        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.put('/api/comments/:id/status', async (req, res) => {
    try {
        await neonService.updateCommentStatus(req.params.id, req.body.status);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update comment status' });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        await neonService.deleteComment(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// --- SETTINGS ---
app.get('/api/settings/:key', async (req, res) => {
    try {
        const value = await neonService.getSetting(req.params.key);
        res.json({ value });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch setting' });
    }
});

app.put('/api/settings/:key', async (req, res) => {
    try {
        await neonService.updateSetting(req.params.key, req.body.value);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update setting' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});

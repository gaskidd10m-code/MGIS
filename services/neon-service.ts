import { getData, getExecuteSql } from '../app/actions';
import { Article, Category, Comment } from '../types';

// Helper to map SQL result keys (snake_case) to App types (camelCase)
const mapArticle = (row: any): Article => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    authorId: row.author_id,
    authorName: row.author_name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    tags: row.tags || [],
    status: row.status as 'draft' | 'published' | 'archived',
    publishedAt: row.published_at,
    views: row.views || 0,
    source: row.source
});

const mapCategory = (row: any): Category => ({
    id: row.id,
    name: row.name,
    slug: row.slug
});

const mapComment = (row: any): Comment => ({
    id: row.id,
    articleId: row.article_id,
    userId: row.user_id,
    userName: row.user_name,
    content: row.content,
    createdAt: row.created_at,
    parentId: row.parent_id,
    status: row.status as 'pending' | 'approved' | 'rejected'
});

export const neonService = {
    // Articles
    async getArticles(): Promise<Article[]> {
        const result = await getExecuteSql(`
      SELECT * FROM articles ORDER BY published_at DESC
    `);
        return result.map(mapArticle);
    },

    async getArticleBySlug(slug: string): Promise<Article | undefined> {
        const result = await getExecuteSql(`
      SELECT * FROM articles WHERE slug = $1
    `, [slug]);
        return result.length ? mapArticle(result[0]) : undefined;
    },

    async getArticlesByCategory(categoryId: string): Promise<Article[]> {
        const result = await getExecuteSql(`
      SELECT * FROM articles WHERE category_id = $1 ORDER BY published_at DESC
    `, [categoryId]);
        return result.map(mapArticle);
    },

    async searchArticles(query: string): Promise<Article[]> {
        const result = await getExecuteSql(`
        SELECT * FROM articles 
        WHERE title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1
    `, [`%${query}%`]);
        return result.map(mapArticle);
    },

    async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
        // Note: status 'published' is hardcoded if not provided, but usually comes from data
        const result = await getExecuteSql(`
      INSERT INTO articles (
        title, slug, excerpt, content, cover_image, 
        author_id, author_name, category_id, category_name, 
        tags, status, published_at, views, source
      ) VALUES (
        $1, $2, $3, $4, $5, 
        $6, $7, $8, $9, 
        $10, $11, $12, $13, $14
      ) RETURNING *
    `, [
            data.title, data.slug, data.excerpt, data.content, data.coverImage,
            data.authorId, data.authorName, data.categoryId, data.categoryName,
            data.tags, data.status, data.publishedAt, data.views, data.source
        ]);
        return mapArticle(result[0]);
    },

    async updateArticle(id: string, data: Partial<Article>): Promise<void> {
        // Dynamic update query builder would be better, but simpler for now
        // This assumes we pass the full object or we might overwrite with nulls if not careful.
        // Ideally we only update fields present.
        // For now, let's just support status/views/content updates mostly used.

        // A proper implementation handles partial updates dynamics:
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        // Check specific fields relevant to update
        const map = {
            title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'content',
            coverImage: 'cover_image', categoryId: 'category_id', categoryName: 'category_name',
            tags: 'tags', status: 'status', publishedAt: 'published_at', views: 'views'
        };

        Object.entries(data).forEach(([key, val]) => {
            const dbKey = (map as any)[key];
            if (dbKey) {
                fields.push(`${dbKey} = $${idx++}`);
                values.push(val);
            }
        });

        if (fields.length === 0) return;

        values.push(id);
        await getExecuteSql(`UPDATE articles SET ${fields.join(', ')} WHERE id = $${idx}`, values);
    },

    async deleteArticle(id: string): Promise<void> {
        await getExecuteSql(`DELETE FROM articles WHERE id = $1`, [id]);
    },

    async incrementViews(id: string): Promise<void> {
        await getExecuteSql(`UPDATE articles SET views = views + 1 WHERE id = $1`, [id]);
    },

    // Categories
    async getCategories(): Promise<Category[]> {
        const result = await getExecuteSql(`SELECT * FROM categories`);
        return result.map(mapCategory);
    },

    async createCategory(name: string): Promise<Category> {
        const slug = name.toLowerCase().replace(/ /g, '-');
        const result = await getExecuteSql(`
      INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *
    `, [name, slug]);
        return mapCategory(result[0]);
    },

    async deleteCategory(id: string): Promise<void> {
        await getExecuteSql(`DELETE FROM categories WHERE id = $1`, [id]);
    },

    // Comments
    async getComments(articleId: string): Promise<Comment[]> {
        const result = await getExecuteSql(`
      SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC
    `, [articleId]);
        return result.map(mapComment);
    },

    async getAllComments(): Promise<Comment[]> {
        const result = await getExecuteSql(`SELECT * FROM comments ORDER BY created_at DESC`);
        return result.map(mapComment);
    },

    async addComment(data: Omit<Comment, 'id' | 'createdAt' | 'status'>): Promise<Comment> {
        const result = await getExecuteSql(`
      INSERT INTO comments (article_id, user_id, user_name, content, status) 
      VALUES ($1, $2, $3, $4, 'pending') 
      RETURNING *
    `, [data.articleId, data.userId, data.userName, data.content]);
        return mapComment(result[0]);
    },

    async updateCommentStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
        await getExecuteSql(`UPDATE comments SET status = $1 WHERE id = $2`, [status, id]);
    },

    async deleteComment(id: string): Promise<void> {
        await getExecuteSql(`DELETE FROM comments WHERE id = $1`, [id]);
    },

    // --- SETTINGS ---
    async getSetting(key: string): Promise<string> {
        const result = await getExecuteSql(`SELECT value FROM settings WHERE key = $1`, [key]);
        return result.length ? result[0].value : '';
    },

    async updateSetting(key: string, value: string): Promise<void> {
        await getExecuteSql(`
            INSERT INTO settings (key, value) VALUES ($1, $2)
            ON CONFLICT (key) DO UPDATE SET value = $2
        `, [key, value]);
    }
};

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase-config';
import { Article, Category, Comment } from '../types';

// Collection references
export const articlesCollection = collection(db, 'articles');
export const categoriesCollection = collection(db, 'categories');
export const commentsCollection = collection(db, 'comments');

// Helper to convert Firestore timestamp to ISO string
const timestampToISO = (timestamp: any): string => {
    if (timestamp?.toDate) {
        return timestamp.toDate().toISOString();
    }
    return timestamp || new Date().toISOString();
};

// Articles
export const firestoreService = {
    // Get all articles
    async getArticles(): Promise<Article[]> {
        const q = query(articlesCollection, orderBy('publishedAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            publishedAt: timestampToISO(doc.data().publishedAt)
        } as Article));
    },

    // Get article by slug
    async getArticleBySlug(slug: string): Promise<Article | undefined> {
        const q = query(articlesCollection, where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return undefined;
        const doc = snapshot.docs[0];
        return {
            ...doc.data(),
            id: doc.id,
            publishedAt: timestampToISO(doc.data().publishedAt)
        } as Article;
    },

    // Get articles by category
    async getArticlesByCategory(categoryId: string): Promise<Article[]> {
        const q = query(
            articlesCollection,
            where('categoryId', '==', categoryId),
            orderBy('publishedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            publishedAt: timestampToISO(doc.data().publishedAt)
        } as Article));
    },

    // Search articles
    async searchArticles(searchQuery: string): Promise<Article[]> {
        // Note: Firestore doesn't support full-text search natively
        // This is a simple implementation - for production, use Algolia or similar
        const snapshot = await getDocs(articlesCollection);
        const lowerQuery = searchQuery.toLowerCase();
        return snapshot.docs
            .map(doc => ({
                ...doc.data(),
                id: doc.id,
                publishedAt: timestampToISO(doc.data().publishedAt)
            } as Article))
            .filter(article =>
                article.title.toLowerCase().includes(lowerQuery) ||
                article.excerpt.toLowerCase().includes(lowerQuery) ||
                article.content.toLowerCase().includes(lowerQuery)
            );
    },

    // Create article
    async createArticle(articleData: Omit<Article, 'id'>): Promise<Article> {
        const docRef = await addDoc(articlesCollection, {
            ...articleData,
            publishedAt: Timestamp.fromDate(new Date(articleData.publishedAt))
        });
        return {
            ...articleData,
            id: docRef.id
        };
    },

    // Update article
    async updateArticle(id: string, data: Partial<Article>): Promise<void> {
        const docRef = doc(articlesCollection, id);
        const updateData = { ...data };
        if (data.publishedAt) {
            updateData.publishedAt = Timestamp.fromDate(new Date(data.publishedAt)) as any;
        }
        await updateDoc(docRef, updateData);
    },

    // Delete article
    async deleteArticle(id: string): Promise<void> {
        await deleteDoc(doc(articlesCollection, id));
    },

    // Increment views
    async incrementViews(id: string): Promise<void> {
        const docRef = doc(articlesCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const currentViews = docSnap.data().views || 0;
            await updateDoc(docRef, { views: currentViews + 1 });
        }
    },

    // Categories
    async getCategories(): Promise<Category[]> {
        const snapshot = await getDocs(categoriesCollection);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as Category));
    },

    async createCategory(name: string): Promise<Category> {
        const newCat = {
            name,
            slug: name.toLowerCase().replace(/ /g, '-')
        };
        const docRef = await addDoc(categoriesCollection, newCat);
        return {
            ...newCat,
            id: docRef.id
        };
    },

    async deleteCategory(id: string): Promise<void> {
        await deleteDoc(doc(categoriesCollection, id));
    },

    // Comments
    async getComments(articleId: string): Promise<Comment[]> {
        const q = query(
            commentsCollection,
            where('articleId', '==', articleId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            createdAt: timestampToISO(doc.data().createdAt)
        } as Comment));
    },

    async getAllComments(): Promise<Comment[]> {
        const q = query(commentsCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            createdAt: timestampToISO(doc.data().createdAt)
        } as Comment));
    },

    async addComment(commentData: Omit<Comment, 'id' | 'createdAt' | 'status'>): Promise<Comment> {
        const newComment = {
            ...commentData,
            createdAt: Timestamp.now(),
            status: 'pending' as const
        };
        const docRef = await addDoc(commentsCollection, newComment);
        return {
            ...commentData,
            id: docRef.id,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
    },

    async updateCommentStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
        await updateDoc(doc(commentsCollection, id), { status });
    },

    async deleteComment(id: string): Promise<void> {
        await deleteDoc(doc(commentsCollection, id));
    }
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class AdminApiClient {
    private async request(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem('adminToken');

        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // Admin Auth
    async login(email: string, password: string) {
        return this.request('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    // Categories
    async getCategories() {
        return this.request('/api/categories');
    }

    async createCategory(data: any) {
        return this.request('/api/categories', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Artworks
    async getArtworks() {
        return this.request('/api/artworks');
    }

    async createArtwork(data: any) {
        return this.request('/api/artworks', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Health
    async getHealth() {
        return this.request('/health');
    }
}

export const adminApi = new AdminApiClient();
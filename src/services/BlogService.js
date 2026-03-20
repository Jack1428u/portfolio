import axios from 'axios';

/**
 * BlogService — Capa de abstracción de datos para el recurso Blog.
 *
 * Estrategia de resolución slug → id:
 *   El frontend usa el campo `slug` como parámetro de URL para SEO.
 *   El backend expone el detalle por `id` (MongoDB ObjectId).
 *   getBlogBySlug() orquesta ambos: primero obtiene la lista para
 *   localizar el `id` a partir del `slug`, luego consulta el detalle.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

const blogApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key':process.env.ADMIN_API_KEY || '',
    },
});

/* ── Interceptor: log estructurado sin reventar el proceso Node ── */
blogApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status ?? 'NO_RESPONSE';
        const url = error.config?.url ?? 'UNKNOWN_URL';
        const message = error.message ?? 'Unknown error';
        console.error(`[BlogService] ${status} | ${url} | ${message}`);
        return Promise.reject(error);
    }
);

/**
 * Obtiene todos los posts publicados.
 * @returns {Promise<Array>} Array de blogs o [] en caso de error.
 */
export async function getBlogs() {
    try {
        const { data } = await blogApi.get('/blogs', {
            params: { status: 'published' },
        });
        return Array.isArray(data) ? data : (data?.data ?? []);
    } catch {
        // console.error("Error en getBlogs:", error.response?.data || error.message); // Si se descomenta agregar catch (error)
        return [];
    }
}

/**
 * Obtiene un post completo usando el slug como clave de búsqueda frontend.
 * Internamente resuelve el `id` del backend en dos pasos:
 *   1. GET /blogs → busca el blog cuyo `slug` coincide → extrae su `id`
 *   2. GET /blogs/:id → devuelve el documento completo
 *
 * @param {string} slug  — Valor del parámetro de URL [slug]
 * @returns {Promise<Object|null>} Blog completo o null si no existe / error.
 */
export async function getBlogBySlug(slug) {
    if (!slug || typeof slug !== 'string') return null;

    try {
        // Paso 1: Localizar el id a partir del slug
        const blogs = await getBlogs();
        const match = blogs.find((b) => b.slug === slug);

        if (!match?.id) return null;

        // Paso 2: Obtener el detalle completo por id
        const { data } = await blogApi.get(`/blogs/${encodeURIComponent(match.id)}`);
        return data?.data ?? data ?? null;
    } catch (error) {
        if (error.response?.status === 404) return null;
        return null;
    }
}
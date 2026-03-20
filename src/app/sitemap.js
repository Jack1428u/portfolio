import { getBlogs } from '@/services/BlogService';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jackutrilla.com';

  // 1. Definimos las rutas estáticas de tu portafolio
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, // Prioridad máxima para tu Landing Page
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Alta prioridad para el hub de contenidos
    },
  ];

  // 2. Obtenemos los blogs desde tu API/Base de datos
  let dynamicBlogRoutes = [];
  try {
    const blogs = await getBlogs(); 
    
    // Mapeamos cada blog a su URL específica
    dynamicBlogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      // Usamos la fecha real de modificación del artículo
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: 'monthly',
      priority: 0.8, // Prioridad estándar para artículos
    }));
  } catch (error) {
    console.error('Error generando las rutas dinámicas para el sitemap:', error);
  }

  // 3. Retornamos todo combinado
  return [...staticRoutes, ...dynamicBlogRoutes];
}
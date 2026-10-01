import { pool } from './db';
import { supabase } from './supabase';

async function selectRows(table: string, orderBy?: string) {
  if (supabase) {
    let query = supabase.from(table).select('*');
    if (orderBy) query = query.order(orderBy, { ascending: true });
    const { data, error } = await query;
    if (!error && Array.isArray(data)) return data;
  }

  try {
    const sql = orderBy
      ? `SELECT * FROM ${table} ORDER BY ${orderBy} ASC`
      : `SELECT * FROM ${table}`;
    const result = await pool.query(sql);
    return result.rows || [];
  } catch {
    return [];
  }
}

function mapStaff(staff: any[], departments: any[]) {
  return staff.map((row) => ({
    id: row.id,
    name: row.name,
    photo_url: row.photo_url || '/images/staff1.jpg',
    designation: row.designation,
    department_id: row.department_id,
    department_name: departments.find((dept) => dept.id === row.department_id)?.name || row.department_name || '',
    qualification: row.qualification || '',
    experience: row.experience || '',
    email: row.email || '',
    phone: row.phone || '',
    bio: row.bio || '',
    order_index: row.order_index ?? 0,
    is_active: row.is_active !== false,
  }));
}

function mapNews(news: any[], categories: any[]) {
  return news.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    category_id: row.category_id,
    category_name: categories.find((cat) => cat.id === row.category_id)?.name || row.category_name || '',
    featured_image: row.featured_image || '/images/campus.jpg',
    tags: Array.isArray(row.tags) ? row.tags : [],
    is_featured: Boolean(row.is_featured),
    status: row.status || 'published',
    publish_date: row.publish_date,
    created_at: row.created_at,
  }));
}

export async function fetchPublicContent() {
  const [
    departments,
    staff,
    newsCategories,
    news,
    events,
    albums,
    galleryItems,
    programs,
    downloads,
    banners,
    pages,
    menus,
  ] = await Promise.all([
    selectRows('departments', 'id'),
    selectRows('staff', 'order_index'),
    selectRows('news_categories', 'id'),
    selectRows('news', 'id'),
    selectRows('events', 'event_date'),
    selectRows('gallery_albums', 'id'),
    selectRows('gallery_items', 'id'),
    selectRows('academic_programs', 'id'),
    selectRows('downloads', 'id'),
    selectRows('banners', 'order_index'),
    selectRows('pages', 'id'),
    selectRows('menus', 'order_index'),
  ]);

  return {
    departments,
    staff: mapStaff(staff, departments),
    newsCategories,
    news: mapNews(news, newsCategories),
    events,
    albums,
    galleryItems,
    programs,
    downloads,
    banners,
    pages,
    menus,
  };
}

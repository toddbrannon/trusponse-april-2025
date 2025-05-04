import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const files = import.meta.glob('../blog/*.md', { query: '?raw', import: 'default' });
    
      // 🔍 Log which files were found
      console.log('📄 Blog files found:', Object.keys(files));
    
      const loadedPosts: Post[] = [];
    
      for (const path in files) {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
    
        try {
          const file = await files[path](); // file is raw markdown string
          const { data } = matter(file);
    
          console.log(`✅ Loaded: ${slug}`, data); // Debug the frontmatter
    
          loadedPosts.push({
            title: data.title,
            date: data.date,
            description: data.description,
            slug,
          });
        } catch (err) {
          console.error(`❌ Failed to parse ${slug}`, err);
        }
      }
    
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
      setPosts(loadedPosts);
    };
    

    fetchPosts();
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              to={`/blog/${post.slug}`}
              className="text-2xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm mt-1">{post.date}</p>
            <p className="text-gray-600 mt-2">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;

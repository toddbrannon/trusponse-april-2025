import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';

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
      const context = require.context('../blog', false, /\.md$/);
      const postsData = context.keys().map((key: string) => {
        const slug = key.replace('./', '').replace('.md', '');
        const fileContent = context(key).default;
        const { data } = matter(fileContent);
        return {
          title: data.title,
          date: data.date,
          description: data.description,
          slug,
        };
      });
      setPosts(postsData);
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

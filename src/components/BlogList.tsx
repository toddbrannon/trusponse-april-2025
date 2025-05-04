
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
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.date}</p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

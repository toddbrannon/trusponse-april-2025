import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import { marked } from 'marked';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      const file = await import(`../blog/${slug}.md`);
      const { data, content } = matter(file.default);
      setTitle(data.title);
      setContent(marked(content));
    };

    fetchPost();
  }, [slug]);

  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
      <div 
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </section>
  );
};

export default BlogPost;

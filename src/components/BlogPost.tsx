
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
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPost;

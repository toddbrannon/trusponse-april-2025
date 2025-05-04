<section className="max-w-6xl mx-auto py-20 px-6">
  <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">Latest Blog Posts</h1>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <Link
        key={post.slug}
        to={`/blog/${post.slug}`}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 group"
      >
        <h2 className="text-xl font-semibold text-blue-600 group-hover:underline mb-2">{post.title}</h2>
        <p className="text-sm text-gray-400 mb-3">{post.date}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
      </Link>
    ))}
  </div>
</section>

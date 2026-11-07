import { useEffect, useMemo, useState } from 'react';
import { LINKEDIN, postUrl } from '../data';
import { categories, posts, type Category, type Post } from '../posts';
import { ArrowUpRight } from './Icons';
import Section from './Section';

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

type Filter = 'All' | Category;

function useColumnCount() {
  const count = () => (window.matchMedia('(min-width: 1024px)').matches ? 3 : window.matchMedia('(min-width: 640px)').matches ? 2 : 1);
  const [columns, setColumns] = useState(count);

  useEffect(() => {
    const update = () => setColumns(count());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return columns;
}

function PostCard({ post }: { post: Post }) {
  return (
    <a className="post" href={postUrl(post.id)} target="_blank" rel="noreferrer">
      {post.image && (
        <img src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} loading="lazy" />
      )}
      <div className="post__body">
        <span className="post__meta">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
          <span>{post.category}</span>
        </span>
        <h3 className="post__title">{post.title}</h3>
        <span className="post__excerpt">{post.excerpt}</span>
        <span className="post__cta">
          Read on LinkedIn
          <ArrowUpRight />
        </span>
      </div>
    </a>
  );
}

export default function Posts() {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState(false);
  const columnCount = useColumnCount();
  // Three rows of cards, or four cards in the single column on a phone.
  const firstView = columnCount === 1 ? 4 : columnCount * 3;

  const matching = useMemo(() => (filter === 'All' ? posts : posts.filter((p) => p.category === filter)), [filter]);
  const visible = expanded ? matching : matching.slice(0, firstView);

  // Dealt out across the columns, so the newest posts stay along the top row.
  const columns = useMemo(() => {
    const out: Post[][] = Array.from({ length: columnCount }, () => []);
    visible.forEach((p, i) => out[i % columnCount].push(p));
    return out;
  }, [visible, columnCount]);

  const choose = (next: Filter) => {
    setFilter(next);
    setExpanded(false);
  };

  return (
    <Section
      id="posts"
      title="LinkedIn posts"
      intro="Build notes, results and filings, written as they happened. Each one opens on LinkedIn."
    >
      <div className="filters" role="group" aria-label="Filter posts by topic">
        {(['All', ...categories] as Filter[]).map((c) => (
          <button className="filter" type="button" key={c} aria-pressed={filter === c} onClick={() => choose(c)}>
            {c}
            <span>{c === 'All' ? posts.length : posts.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <div className="posts">
        {columns.map((column, i) => (
          <div className="posts__column" key={i}>
            {column.map((p) => (
              <PostCard post={p} key={p.id} />
            ))}
          </div>
        ))}
      </div>

      <div className="posts__foot">
        {matching.length > firstView && (
          <button className="btn btn--secondary" type="button" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show fewer' : `Show all ${matching.length} posts`}
          </button>
        )}
        <a className="text-link" href={`${LINKEDIN}/recent-activity/all/`} target="_blank" rel="noreferrer">
          All activity on LinkedIn
          <ArrowUpRight />
        </a>
      </div>
    </Section>
  );
}

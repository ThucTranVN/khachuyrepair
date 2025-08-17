import React from 'react';

const ArticleGrid = ({ articles = [] }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles available</p>
      </div>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article) => {
        return (
          <article 
            key={article.id} 
            className="article-card"
            onClick={() => {
              if (article.url && article.url !== '#') {
                window.open(article.url, '_blank', 'noopener,noreferrer');
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {/* Article Image */}
            <div className="article-image">
              <img 
                src={article.image || '/tiktok-thumbnail.png'} 
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Article Content */}
            <div className="article-content">
              {/* Category Tag */}
              <div>
                <span className="category-tag">
                  {article.category || 'Technology'}
                </span>
              </div>

              {/* Title - Fixed height */}
              <h3 className="article-title" style={{ 
                margin: '0 0 8px 0',
                fontSize: '16px',
                lineHeight: '1.2',
                fontWeight: 'bold',
                minHeight: 'auto',
                maxHeight: 'none'
              }}>
                {article.title || 'No Title'}
              </h3>

              {/* Date and Author - Simple display below title */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '12px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                <span>📅 {article.date || 'No Date'}</span>
                <span>•</span>
                <span>👤 {article.author || 'No Author'}</span>
              </div>

              {/* Description */}
              {article.description && (
                <p className="article-description">
                  {article.description}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleGrid;

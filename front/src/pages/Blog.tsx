import { useState } from 'react';
import './blogcss.css';
import { Container, Row, Col, Form, Button, Card, Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import blogpost from '../data/BlogData';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const navigate = useNavigate();

  const handleBlogClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  // Ajout d'un id pour chaque select afin d'améliorer l'accessibilité
  const categories = ['All', ...new Set(blogpost.map(post => post.category))];
  const tags = ['All', ...new Set(blogpost.flatMap(post => post.tags || []))];

  const filteredPosts = blogpost.filter(post => {
    // On s'assure que title et content soient traités comme des chaînes
    const title = String(post.title).toLowerCase();
    const content = String(post.content).toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = title.includes(search) || content.includes(search);
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    // Si post.tags est undefined, on le remplace par un tableau vide
    const matchesTag = selectedTag === 'All' || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === 'recent')
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortOption === 'oldest')
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortOption === 'title')
      return a.title.localeCompare(b.title);
    if (sortOption === 'popular')
      return ((b.likes ?? 0) + ((b.comments ?? 0) * 2)) - ((a.likes ?? 0) + ((a.comments ?? 0) * 2));
    return 0;
  });

  const recentPosts = [...blogpost]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleAddComment = (postId: number) => {
    if (commentText.trim()) {
      alert(`Comment added to post ${postId}: ${commentText}`);
      setCommentText('');
      setShowComments(null);
    }
  };

  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showComments !== null) {
      handleAddComment(showComments);
    }
  };

  return (
    <Container className="blog-container py-5">
      <Row className="justify-content-center mb-5">
        <Col lg={12} className="text-center">
          <h1 className="blog-title display-4 fw-bold mb-3 position-relative d-inline-block">
            Our Blog
            <span className="position-absolute bottom-0 start-50 translate-middle-x bg-danger" style={{ height: '4px', width: '80px' }}></span>
          </h1>
          <p className="blog-subtitle lead text">
            Find our news, advice and updates here.
          </p>
        </Col>
      </Row>

      <Row>
        {/* Sidebar - Filters */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-funnel me-2"></i>Filters
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="searchInput">Search</Form.Label>
                <Form.Control
                  id="searchInput"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="categoriesSelect">Categories</Form.Label>
                <Form.Select
                  id="categoriesSelect"
                  title="Select a category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="tagsSelect">Tags</Form.Label>
                <Form.Select
                  id="tagsSelect"
                  title="Select a tag"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  {tags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="sortSelect">Sort by</Form.Label>
                <Form.Select
                  id="sortSelect"
                  title="Select a sort option"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="recent">Most recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Alphabetical order</option>
                  <option value="popular">Most popular</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="outline-secondary"
                className="w-100 mt-3"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedTag('All');
                  setSortOption('recent');
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>Reset
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Blog posts */}
        <Col lg={6} className="mb-4">
          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <Card key={post.id} className="mb-4 shadow-sm blog-post" id={`post-${post.id}`}>
                <Row className="g-0">
                  <Col md={5}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid h-100 rounded-start"
                      style={{ objectFit: 'cover', minHeight: '200px' }}
                    />
                  </Col>
                  <Col md={7}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <Card.Title className="fw-bold">{post.title}</Card.Title>
                        <Badge bg="danger" className="px-2 py-1">
                          {post.category}
                        </Badge>
                      </div>

                      <div className="d-flex gap-3 mb-2 small text-muted">
                        <div>
                          <i className="bi bi-person me-1"></i>{post.author}
                        </div>
                        <div>
                          <i className="bi bi-clock me-1"></i>{post.date}
                        </div>
                      </div>

                      <Card.Text className="mb-3">{post.content}</Card.Text>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2">
                          <Button
                            variant={likedPosts.includes(post.id) ? 'danger' : 'outline-danger'}
                            size="sm"
                            onClick={() => handleLike(post.id)}
                          >
                            <i className="bi bi-hand-thumbs-up me-1"></i>
                            {likedPosts.includes(post.id) ? (post.likes ?? 0) + 1 : (post.likes ?? 0)}
                          </Button>

                          <Button
                            variant={showComments === post.id ? 'danger' : 'outline-danger'}
                            size="sm"
                            onClick={() =>
                              setShowComments(showComments === post.id ? null : post.id)
                            }
                          >
                            <i className="bi bi-chat me-1"></i>
                            {post.comments ?? 0}
                          </Button>
                        </div>

                        <Button
                          variant="link"
                          className="px-0"
                          onClick={() => handleBlogClick(post.id)}
                        >
                          Read Post <ArrowRight className="ms-2" />
                        </Button>
                      </div>

                      {showComments === post.id && (
                        <div className="mt-3 border-top pt-3">
                          <h6 className="mb-2">Comments</h6>
                          <ListGroup className="mb-3">
                            <ListGroup.Item>Great article!</ListGroup.Item>
                            <ListGroup.Item>Very helpful, thanks!</ListGroup.Item>
                          </ListGroup>

                          <Form.Group>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder="Your comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyDown={handleCommentKeyPress}
                              className="mb-2"
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleAddComment(post.id)}
                            >
                              Send
                            </Button>
                          </Form.Group>
                        </div>
                      )}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <Card className="text-center py-5 shadow-sm">
              <Card.Body>
                <h3 className="text-muted">No articles found</h3>
                <p className="mb-3">Try adjusting your search criteria</p>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedTag('All');
                  }}
                >
                  Reset filters
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Sidebar - Recent posts and Tags */}
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>Recent
              </h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {recentPosts.map(post => (
                  <ListGroup.Item
                    key={post.id}
                    action
                    className="d-flex gap-3 py-3"
                    onClick={() =>
                      document.getElementById(`post-${post.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      width="64"
                      height="64"
                      className="rounded"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0">{post.title}</h6>
                      <small className="text-muted">{post.date.split(' ')[0]}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-4 shadow-sm">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-tags me-2"></i>Popular tags
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                {tags
                  .filter(t => t !== 'All')
                  .map(tag => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? 'danger' : 'outline-danger'}
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;

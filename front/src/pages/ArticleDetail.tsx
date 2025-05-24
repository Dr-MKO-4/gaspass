import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { ArrowLeft, Calendar, Clock, Person } from "react-bootstrap-icons";
import {blogPosts} from "../data/BlogPostData";
import "./articledetailcss.css";

// Define the type for your blog posts
interface BlogPost {
  id: number;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  imageCaption?: string;
  author: string;
  content: string | string[];
  category: string;
  likes?: number;
  comments?: number;
  tags?: string[];
  readingTime: number; // Make sure this is included in your type
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  // Type the find result as BlogPost or undefined
  const post = blogPosts.find((p) => p.id === postId) as BlogPost | undefined;

  if (!post) {
    return (
      <Container className="not-found-container py-5 text-center">
        <h2>Article not found</h2>
        <Button variant="danger" onClick={() => navigate(-1)}>
          Back to articles
        </Button>
      </Container>
    );
  }

  return (
    <Container className="article-detail py-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 back-button"
      >
        <ArrowLeft className="me-2" />
        Back to articles
      </Button>

      <article>
        <header className="mb-5">
          <Badge bg="danger" className="mb-3 category-badge">
            {post.category}
          </Badge>
          <h1 className="article-title">{post.title}</h1>
          
          <div className="article-meta d-flex flex-wrap gap-3 mb-4">
            <span className="d-flex align-items-center">
              <Person className="me-2" />
              {post.author}
            </span>
            <span className="d-flex align-items-center">
              <Calendar className="me-2" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="d-flex align-items-center">
              <Clock className="me-2" />
              {post.readingTime} min read
            </span>
          </div>

          <img 
            src={post.image} 
            alt={post.title} 
            className="article-image img-fluid rounded"
          />
          {post.imageCaption && (
            <figcaption className="image-caption text-muted mt-2">
              {post.imageCaption}
            </figcaption>
          )}
        </header>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="article-content">
              {typeof post.content === 'string' ? (
                <p>{post.content}</p>
              ) : (
                post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              )}
            </div>

            {post.tags && (
              <div className="article-tags mt-5">
                <h5>Tags:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} bg="light" text="dark" className="tag">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </article>

      <section className="related-articles mt-5 pt-5 border-top">
        <h3 className="mb-4">Related articles</h3>
        <Row>
          {blogPosts
            .filter(p => p.id !== post.id && p.category === post.category)
            .slice(0, 3)
            .map(relatedPost => (
              <Col md={4} key={relatedPost.id}>
                <Card className="h-100 related-card">
                  <Card.Img variant="top" src={relatedPost.image} />
                  <Card.Body>
                    <Card.Title>{relatedPost.title}</Card.Title>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => navigate(`/articles/${relatedPost.id}`)}
                    >
                      Read article
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </section>
    </Container>
  );
};

export default ArticleDetail;
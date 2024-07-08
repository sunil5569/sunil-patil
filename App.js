// App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function App() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ name: '', category: '', dateCreated: '', creatorName: '' });
  const [updateArticle, setUpdateArticle] = useState({});

  useEffect(() => {
    fetch('/api/articles')
      .then(response => response.json())
      .then(data => setArticles(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newArticle.name && newArticle.category && newArticle.dateCreated && newArticle.creatorName) {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      const data = await response.json();
      setArticles([...articles, data]);
      setNewArticle({ name: '', category: '', dateCreated: '', creatorName: '' });
    }
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateArticle)
    });
    const data = await response.json();
    setArticles(articles.map((article) => article._id === id ? data : article));
    setUpdateArticle({});
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>Museum Management</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" id="name" value={newArticle.name} onChange={(event) => setNewArticle({ ...newArticle, name: event.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type="select" id="category" value={newArticle.category} onChange={(event) =>setNewArticle({ ...newArticle, category: event.target.value })}>
                <option value="">Select a category</option>
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="artifact">Artifact</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="dateCreated">Date Created</Label>
              <Input type="date" id="dateCreated" value={newArticle.dateCreated} onChange={(event) => setNewArticle({ ...newArticle, dateCreated: event.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label for="creatorName">Creator Name</Label>
              <Input type="text" id="creatorName" value={newArticle.creatorName} onChange={(event) => setNewArticle({ ...newArticle, creatorName: event.target.value })} />
            </FormGroup>
            <Button type="submit">Add Article</Button>
          </Form>
          {updateArticle._id && (
            <Form onSubmit={() => handleUpdate(updateArticle._id)}>
              <FormGroup>
                <Label for="nameUpdate">Name</Label>
                <Input type="text" id="nameUpdate" value={updateArticle.name} onChange={(event) => setUpdateArticle({ ...updateArticle, name: event.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="categoryUpdate">Category</Label>
                <Input type="select" id="categoryUpdate" value={updateArticle.category} onChange={(event) => setUpdateArticle({ ...updateArticle, category: event.target.value })}>
                  <option value="">Select a category</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="artifact">Artifact</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="dateCreatedUpdate">Date Created</Label>
                <Input type="date" id="dateCreatedUpdate" value={updateArticle.dateCreated} onChange={(event) => setUpdateArticle({ ...updateArticle, dateCreated: event.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="creatorNameUpdate">Creator Name</Label>
                <Input type="text" id="creatorNameUpdate" value={updateArticle.creatorName} onChange={(event) => setUpdateArticle({ ...updateArticle, creatorName: event.target.value })} />
              </FormGroup>
              <Button type="submit">Update Article</Button>
            </Form>
          )}
        </Col>
        <Col md={6}>
          <h2>Articles</h2>
          <ul>
            {articles.map((article) => (
              <li key={article._id}>
                <p>{article.name}</p>
                <p>{article.category}</p>
                <p>{article.dateCreated}</p>
                <p>{article.creatorName}</p>
                <Button color="primary" onClick={() => setUpdateArticle(article)}>Update</Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
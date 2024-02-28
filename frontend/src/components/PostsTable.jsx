
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function PostsTable({ user }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/posts/all`);
            const posts = await response.json();
            setPosts(posts);
        }
        fetchPosts();
        console.log(posts)
    }, [user]);

    const handleDelete = (e) => {

    }
    
    const handleEdit = (e) => {

    }
    return (
        <Card style={{ height: "550px" }}>
            <Card.Header>My Posts</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Like Counts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, idx) => {
                                return <tr key={idx}>
                                    <td>{post.title}</td>
                                    <td>{post.likeCount}</td>
                                    <td><i onClick={handleDelete} className="btn btn-primary bi bi-trash3"></i>&nbsp;<i onClick={handleEdit} className="btn  btn-primary bi bi-pencil-square"></i></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

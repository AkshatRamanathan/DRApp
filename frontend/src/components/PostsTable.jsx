
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

    const handleDelete = async (e, post) => {
        e.stopPropagation();
        const resp = await fetch(`/api/posts/delete/${post._id}`, { method: 'DELETE' });
        const json = await resp.json()
        window.location.href = json?.data?.redirect;

    }

    const handleEdit = async (e, post) => {
        e.stopPropagation();
        window.location.href = `post/${post._id}`

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
                                return <tr onClick={() => { location.href = `post/${post._id}` }} key={idx}>
                                    <td>{post.title}</td>
                                    <td>{post.likeCount}</td>
                                    <td><i onClick={(e) => { handleDelete(e, post) }} className="btn btn-primary bi bi-trash3"></i>&nbsp;<i onClick={(e) => { handleEdit(e, post) }} className="btn  btn-primary bi bi-pencil-square"></i></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

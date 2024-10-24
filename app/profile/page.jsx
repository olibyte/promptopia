"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '../../components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = () => {    
    }
    const handleDelete = async () => {

    }


    return (
        <Profile
            name={session?.user.name}
            desc={session?.user.description}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;
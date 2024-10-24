'use client';

import { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (params.id) fetchPosts();
    }, [params.id]);
    
}

export default ProfilePage;
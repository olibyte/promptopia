'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
const UpdatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify(
                    {
                        prompt: post.prompt,
                        tag: post.tag,
                        userId: session?.user.id,
                    }
                ),
            })
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt;
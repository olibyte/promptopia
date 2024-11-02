'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    const pathName = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex1 flex justify-start items-center gap-3 cursor-pointer">

                    {post.creator.image ? (
                        <Image
                            src={post.creator.image}
                            alt="user_image"
                            width={32}
                            height={32}
                            className="rounded-full object-contain"
                        />
                    ) : (
                        <Image
                            src="/assets/images/logo.svg"
                            alt="user_image"
                            width={32}
                            height={32}
                            className="rounded-full object-contain"
                        />
                    )}
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
            <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
                #{post.tag}
            </p>
            {/* check if current user is creator of post, and they're on the profile page, show the div */}
            {session?.user.id === post.creator._id && pathName === '/profile' && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
                    <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
                </div>
            )}
        </div>

    )
}

export default PromptCard;
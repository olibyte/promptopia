'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptList = ({data}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={() => {}} />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]); 
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const filterPrompts = (searchtext) => {
    return posts.filter(
      ((p) => 
        p.prompt.toLowerCase().includes(searchtext.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchtext.toLowerCase()) ||
        p.creator.username.toLowerCase().includes(searchtext.toLowerCase())
      )
    );
  };
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        // debounce method
        setSearchTimeout(
          setTimeout(() => {
            const result = filterPrompts(e.target.value);
            setSearchResults(result);
          }, 500)
        );
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        }
        if (searchText) fetchPosts();
    }, [searchText]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a prompt"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptList data={searchResults} />
        </section>
    )
}

export default Feed;
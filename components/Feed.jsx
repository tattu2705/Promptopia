'use client'

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data?.map((post, index) => {
          return <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
        })
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value)
    const response = await fetch(`/api/prompt/search/${e.target.value}`)
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      <PromptCardList data={posts} />
    </section>
  )
}

export default Feed
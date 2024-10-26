import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userId = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: Date.now().toString(), // generate a unique ID
      userId: userId.current.value,
      title: postTitle.current.value,
      body: postBody.current.value,
      reactions: Number(reactions.current.value),
      tags: tags.current.value.split(' '), // assuming tags are space-separated
    };

    addPost(newPost);

    // Clear the form fields after submission
    userId.current.value = '';
    postTitle.current.value = '';
    postBody.current.value = '';
    reactions.current.value = '';
    tags.current.value = '';
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">Enter your User Id here</label>
        <input type="text" ref={userId} className="form-control" id="userId" placeholder="Your user Id" />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Post Title</label>
        <input type="text" ref={postTitle} className="form-control" id="title" placeholder="How are you feeling today..." />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Post Content</label>
        <textarea ref={postBody} rows="4" className="form-control" id="body" placeholder="Tell us more about it" />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">Number of reactions</label>
        <input type="text" ref={reactions} className="form-control" id="reactions" placeholder="How many people reacted to this post" />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Enter your hashtags here</label>
        <input type="text" ref={tags} className="form-control" id="tags" placeholder="Please enter tags using space" />
      </div>

      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
};

export default CreatePost;

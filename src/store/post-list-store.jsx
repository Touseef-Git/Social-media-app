import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';

const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...currPostList, action.payload];
    case 'DELETE_POST':
      return currPostList.filter(post => post.id !== action.payload.id);
    default:
      return currPostList;
  }
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Swat",
    body: "Hi Friends, I am going to Swat for my vacations. Hope to enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Swat", "Enjoying"],
  },
  {
    id: "2",
    title: "Paas hogaye Bhai",
    body: "4 saal k masti k bad bhi hogaye hain paas. Hard to believe.",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable"],
  }
];

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST);

  const addPost = (post) => {
    dispatchPostList({ type: 'ADD_POST', payload: post });
  };

  const deletePost = (id) => {
    dispatchPostList({ type: 'DELETE_POST', payload: { id } });
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

PostListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PostListContext, PostListProvider };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from './Post';
import Container from 'react-bootstrap/Container';
import WaveSurferComponent from './WaveSurfer';
import WaveSurferSimple from './WaveSurferSimple';
interface PostAttributes {
  id: number;
  userId: number;
  title: string;
  categories: string[];
  soundUrl: string;
  commentCount: number;
  likeCount: number;
  listenCount: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
    profileImgUrl: string;
    googleId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  Likes: {
    id: number;
    userId: number;
    postId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  Comments: {
    id: number;
    userId: number;
    postId: number;
    soundUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
  isLiked: boolean;
}
interface followerAttributes {
  id: number;
  username: string;
  profileImgUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
const UserProfile = ({ audioContext }) => {
  const [selectedUserPosts, setSelectedUserPosts] = useState<PostAttributes[]>([]);
  const [onProfile, setOnProfile] = useState<boolean>(true);
  const [onUserProfile, setOnUserProfile] = useState<boolean>(true);
  const [selectedUserFollowers, setSelectedUserFollowers] = useState<followerAttributes[]>([]);
  const currentUser: any = useLoaderData();
  


  const getSelectedUserInfo = async () => {
    try {
      const selectedUserObj = await axios.get(`/post/selected/${currentUser.id}`);
      setSelectedUserPosts(selectedUserObj.data);
      // setUserPosts(selectedUserObj.data[0].Posts)
      console.log('heyx2', selectedUserObj);
    } catch (error) {
      console.error('could not get selected user info', error);
    }
  };
  const updatePost = async (postId, updateType) => {
    try {
      const updatedPost = await axios.get(`/post/updatedPost/${postId}/${currentUser.id}`);
      console.log('updated post obj', updatedPost);
      const postIndex = selectedUserPosts.findIndex((post) => post.id === updatedPost.data.id);
      updatedPost.data.rank = selectedUserPosts[postIndex].rank;
      // console.log('post index', updatePostIndex)
      const postsWUpdatedPost = selectedUserPosts.splice(postIndex, 1, updatedPost.data);
      console.log(postsWUpdatedPost);
      setSelectedUserPosts(postsWUpdatedPost);
    } catch (error) {
      console.log('could not update post', error);
    }
  };
  const getSelectedUserFollowers = async () => {
    try {
      const followers = await axios.get(`/post/user/${currentUser.id}/followers`);
      console.log('followers', followers);
    } catch (error) {
      console.log('error fetching current user followers', error);
    }
  };
  useEffect(() => {
    getSelectedUserInfo();
    console.log('currentUser in user profile', currentUser);
    getSelectedUserFollowers();
  }, []);
  const numberOfPostsPerRow = 3;
  const rows: PostAttributes[][] = [];
  for (let i = 0; i < selectedUserPosts.length; i += numberOfPostsPerRow) {
    const row = selectedUserPosts.slice(i, i + numberOfPostsPerRow);
    rows.push(row);
  }
  return (
    <Container>
      <div className="user-main">
        <div className="card user-profile-card" style={{ justifyContent: 'center' }}>
          <div className="user-profile-image">
            <img 
            src={currentUser.profileImgUrl} 
            alt="user profile image" 
            style={{ borderRadius: '50%', width: '100px', height: '100px' }}
            />
          </div>
          <div className="user-profile-info">
            <h2 style={{ color: 'white' }}>{currentUser.username}</h2>
          </div>
        </div>
        <div className="grid-post-container">
          {rows.map((row, index) => (
            <Row key={index}>
              {row.map((post) => (
                <Col key={post.id}>
                  <div className="grid-post-item">
                    <WaveSurferComponent
                      audioContext={audioContext}
                      postObj={post}
                      audioUrl={post.soundUrl}
                      postId={post.id}
                      userId={currentUser.id}
                      updatePost={updatePost}
                      getPosts={getSelectedUserInfo}
                      onProfile={onProfile}
                      onUserProfile={onUserProfile}
                      setOnProfile={setOnProfile}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;

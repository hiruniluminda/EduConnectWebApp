import React, { useState,useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {database} from './firebase-config';
import { ref, child, get, set, push, onValue, off } from 'firebase/database';
import { Button } from 'react-bootstrap';

const dbRef = ref(database);//firbase realtime database refference

/**
 * @author github.com/daser46
 * @param {user} String username of the replier
 * @param {content} String context of the reply
 * @returns reply component with user and the content
 */
const Reply = ({user, content}) => {
  return(
    <div className='row'>
    <div className='col d-flex m-2' style={{width: '100%'}}>
      <div className='row'><div className='col'><b>{user}</b></div></div>
      <div className='row'><div className='col'>&nbsp;&nbsp;&nbsp;{content}</div></div>
    </div>
  </div>
  );
}

/**
 * @author github.com/daser46
 * @param {username} String username of the replier
 * @param {content} String context of the post
 * @param {owner} String username of the one posted the post
 * @param {postId} String unique ID of the post
 * @returns post component
 */
const Post = ({owner,content,username,postId}) => {
  const userRef = child(dbRef, `posts/${postId}/replies`);
  const [replies,setReplies] = useState([]); 
  const [reply, setReply] = useState('');

  /**
  * @author github.com/daser46
  * add a reply to the post
  */
  const addReply = async () => {
    const rfr =  push(userRef);
    await set(rfr, {
      username,
      reply
    });
    setReply('');
  }

  /**
   * @author github.com/daser46
   * callback function to fetch replies on mount
   */
  useEffect(() => {
    onValue(userRef,(snapshot) => {
      const dataSnapshot = snapshot.val();
      const dataArray = dataSnapshot ? Object.values(dataSnapshot) : [];
      setReplies(dataArray);
    }, (error) => {
      console.error('Error fetching data: ', error);
    });

    return () => {
      const dataRef = child(dbRef, `posts`);
      off(dataRef,'value');
    };
    
  },[]);
  console.log(replies);
  

  return(
    <div class="area">
      <form action="#" class="area_post">
      <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title"> {owner} </h3>
            </div>
            <div class="panel-content panel-activity">
                <form action="#" class="panel-activity__status">
                    <div class="actions">
                        <div class="container">
                           <text> {content} </text>
                        </div>
                    </div>
                    <div>
                      {replies.map(e => <Reply user={e.username} content={e.reply}/>)}
                    </div>
                    <div className='row'>
                      <div className='col d-flex justfy-content-center align-items-center'>
                        <textarea placeholder='Comment: ' style={{width:'80%'}} className='m-2' value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
                        <Button variant='primary' className='p-2 d-flex' onClick={() => {addReply()}}>comment</Button>
                      </div>
                    </div>
                    <div class="btn-group">
                            <button type="button" class="btn-link" title="" data-toggle="tooltip" data-original-title="Like">
                            <i class="bi bi-hand-thumbs-up-fill"></i>
                            </button>
                            <button type="button" class="btn-link" title="" data-toggle="tooltip" data-original-title="Comment">
                            <i class="bi bi-chat-left-text-fill"></i>
                            </button>
                            <button type="button" class="btn-link" title="" data-toggle="tooltip" data-original-title="">
                            <i class="bi bi-chat-heart-fill"></i>
                            </button>
                    </div> 
                </form>
            </div>
        </div> 
      </form>
    </div>
  );
}



function Community({username}) {
  const [owner, setOwner] = useState(username);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const addPost = async (owner,content) => {
    const userRef = child(dbRef, `posts`);
    const rfr =  push(userRef);
    await set(rfr, {
      id : rfr.key,
      owner,
      content
    });
    setContent('');
  };

  const onPost = (owner,content)  => {
    addPost(owner,content);
  }
  /**
   * @author github.com/daser46
   * callback once on mount fetching all posts
   */
  useEffect(() => {
    const fetchData = () => {
      const dataRef = child(dbRef, `posts`);
      onValue(dataRef,(snapshot) => {
        const dataSnapshot = snapshot.val();
        const dataArray = dataSnapshot ? Object.values(dataSnapshot) : [];
        setPosts(dataArray);
      }, (error) => {
        console.error('Error fetching data: ', error);
      });
    };

    fetchData();
    
    // Cleanup the event listener when the component unmounts
    return () => {
      const dataRef = child(dbRef, `posts`);
      off(dataRef,'value');
    };
  }, []);
  return (
    <div><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous"></link>
    <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">Create a Post </h3>
            </div>
            <div class="panel-content panel-activity">
                <form action="#" class="panel-activity__status">
                    <textarea name="user_activity" placeholder="Share what you've been up to..." value={content} class="form-control" onChange={e => setContent(e.target.value)}></textarea>
                    <div class="actions">
                        <div class="btn-group">
                            <button type="button" class="btn-link" title="" data-toggle="tooltip" data-original-title="Post an Image">
                                <i class="fa fa-image"></i>
                            </button>
                            
                            <button type="button" class="btn-link" title="" data-toggle="tooltip" data-original-title="Post an Question">
                                <i class="fa fa-question-circle-o"></i>
                            </button>
                        </div>
                        <button type="button" class="btn btn-sm btn-rounded btn-info" onClick={() => onPost(owner,content)}>
                            Post
                        </button>
                    </div>
                </form>
    </div>
</div>
<h5> Community Posts </h5>
<div style={{maxHeight: '62vh', overflow: 'auto'}}>
{posts.length > 0 && posts.map(e => <Post username={username} postId={e.id} owner={e.owner} content={e.content} replies={e.replies}/>)}
</div>
</div>
  );
}

export default Community;



import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import data from './data';


class Posts extends Component {

  constructor() {
    super()
    this.ascendant = this.ascendant.bind(this)
    this.falling = this.falling.bind(this)
    this.ascendantPosts = this.ascendantPosts.bind(this)
    this.fallingPosts = this.fallingPosts.bind(this)
    this.addVotes = this.addVotes.bind(this)
    this.subtractVotes = this.subtractVotes.bind(this)
    this.state = {
      posts: data.reverse(),
      ascendant: false,
      falling: true
    }
  }

  render() {
    return (
      <div>
        <div className="buttons">
          <div>Orden:</div>
          <button type="button" onClick={this.ascendant} className={this.state.ascendant == true ? 'btn border-primary btn-primary': "btn border-primary"} >Ascendente</button>
          <button type="button" onClick={this.falling} className={this.state.falling == true ? 'btn border-primary btn-primary': "btn border-primary"} >Descendente</button>
        </div>
        <br />
        <br />
        {this.state.posts.map((post,index) =>
          <div className="row">
            <div className="col-lg-2 text-center">
            </div>
            <div className="col-lg-3 text-center">
              <div className="container">
                <img className="imag" src={post.post_image_url} width="204" height="136"/>
              </div>
            </div>
            <div className="col-lg-1 text-center">
              <div className="votes">
                <div onClick={() => this.addVotes(post.id)}><FontAwesomeIcon icon={faAngleUp} /></div>
                <div>{post.votes}</div>
                <div onClick={() => this.subtractVotes(post.id)}><FontAwesomeIcon icon={faAngleDown} /></div>
              </div>
            </div>
            <div className="col-lg-5">
              <a href={post.url}><h4>{post.title}</h4></a>
              <p>{post.description}</p>
              <div className="text-secondary">Escrito por:  <img className="rounded-circle" src="//a.disquscdn.com/uploads/users/2864/1155/avatar92.jpg?1481303405" width="30" height="30" /></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  ascendantPosts(){
    var postAscendant=[]
    var orderVotes=this.state.posts.map(i=>i.votes).sort((a,b)=>a-b);
    for (var i = 0; i < orderVotes.length; i++) {
      for (var j = 0; j < this.state.posts.length; j++) {
        if(orderVotes[i] == this.state.posts[j].votes && postAscendant.indexOf(this.state.posts[j])==-1){
          postAscendant.push(this.state.posts[j]);
        }
      }
    }
    return postAscendant
  }

  fallingPosts(){
    var postFalling=[]
    var orderVotes=this.state.posts.map(i=>i.votes).sort((a,b)=>a-b).reverse();
    for (var i = 0; i < orderVotes.length; i++) {
      for (var j = 0; j < this.state.posts.length; j++) {
        if(orderVotes[i] == this.state.posts[j].votes && postFalling.indexOf(this.state.posts[j])==-1){
          postFalling.push(this.state.posts[j]);
        }
      }
    }
    return postFalling
  }

  ascendant(){
    this.setState({
      posts: this.ascendantPosts(),
      ascendant: true,
      falling: false
    });
  }

  falling(){
    this.setState({
      posts: this.fallingPosts(),
      ascendant: false,
      falling: true
    });
  }

  addVotes(postId){
    var newPost=[];
    for (var i = 0; i< this.state.posts.length; i++) {
      if(this.state.posts[i].id == postId){
        this.state.posts[i].votes++;
        newPost.push(this.state.posts[i]);
      }
      else{
        newPost.push(this.state.posts[i]);
      }
    }
    this.setState({
      posts: newPost
    });

    if(this.state.ascendant==true){
      this.ascendant()
    }
    else{
      this.falling()
    }
  }

  subtractVotes(postId){
    var newPost=[];
    for (var i = 0; i< this.state.posts.length; i++) {
      if(this.state.posts[i].id == postId){
        this.state.posts[i].votes--;
        newPost.push(this.state.posts[i]);
      }
      else{
        newPost.push(this.state.posts[i]);
      }
    }
    this.setState({
      posts: newPost
    });

    if(this.state.ascendant==true){
      this.ascendant()
    }
    else{
      this.falling()
    }
  }
}


export default Posts;

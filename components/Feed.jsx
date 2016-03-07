/**
 * @class component UserFeed
 * @classdesc Component to show specified user feed
 */
UserFeed = React.createClass({
  propTypes:{
    userId: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
  },
  getInitialState(){
    return {
      postsLimit: 10
    }
  },
  mixins: [ReactMeteorData],
  getMeteorData(){
    let handle = false
    let results

    if(this.props.userId){
      handle = Meteor.subscribe("posts", this.props.userId, {sort: {date: -1}, limit: this.state.postLimit})
      results = Meteor.posts.find({posterId: this.props.userId}, {sort: {date: -1}}).fetch()
    } else {
      handle = Meteor.subscribe("feed", {sort: {date: -1}, limit: this.state.postLimit})
      results = Meteor.posts.find({}, {sort: {date: -1}}).fetch()
    }

    if(handle){
      return {
        dataLoaded: handle.ready(),
        feed: results
      }
    }
  },
  postForm(){
    if(this.props.userId === Meteor.userId()){
      return <NewFeedPost />
    }
  },
  /**
   * Create a comment form for a given post
   * @access private
   */
  postComment(postId){},
  /**
   * Add a comment to the given post
   * @access private
   */
  addComment(e){},
  /**
   * List individual post
   * @access private
   */
  listPost(){
    if(this.data.feed !== undefined && this.data.feed !== null){
      let posts = this.data.feed
      if(posts.length > 0){
        return posts.map((post)=>{
          return <div key={post._id} className="row card-panel hoverable">
            <div className="col s2 center-align">
              <a href={FlowRouter.path("profile", {userId: post.poster()._id})} >
                <i className="material-icons">account_circle</i><br />
                {post.poster().username}
              </a>
            </div>
            <div className="col s7">{post.body}</div>
            <div className="col s3">{moment(post.date).fromNow()}</div>
          </div>
        })
      } else {
        return <div>No entries in the feed.</div>
      }
    }
  },
  /**
   * Show additional posts
   * @access private
   */
  extendLimit(e){
    this.setState({
      postLimit: this.state.postLimit + 10
    })
  },
  getContent(){
    let addToLimit
    if(this.data.feed !== undefined && this.data.feed !== null){
      if(this.data.feed.length > 10){
        addToLimit = <div className="align-center">
          <a className="btn waves-effect waves-light" onClick={this.extendLimit}>Show more</a>
        </div>
      }
    }
    return <div>
      {this.postForm()}
      {this.listPost()}
      {addToLimit}
    </div>
  },
  render(){
    if(this.data.dataLoaded){
      return this.getContent()
    }
    return <div><Loader /></div>
  }
})

/**
 * @class component UserProfile
 * @classdesc User profile page
 */
UserProfile = React.createClass({
  propTypes: {
    user: React.PropTypes.string //id or username
  },
  mixins: [ReactMeteorData],
  getMeteorData(){
    const handle = Meteor.subscribe("profileFor", this.props.user)
    let data = {
      dataLoaded: handle.ready(),
      profile: Meteor.profiles.findOne()
    }

    //if profile not found redirect to 404
    if(handle.ready() && Meteor.profiles.findOne() === undefined){
      console.log('User not found');
      //TODO show 404 not main page
      //FlowRouter.go('/')
    }

    if(handle.ready()){
      if(Meteor.userId() !== Meteor.profiles.findOne().userId){
        Meteor.subscribe("getUser", this.props.user)
        Meteor.subscribe("friends")
        Meteor.subscribe("friendRequests")
        Meteor.subscribe("outgoingFriendRequests")

        data.currentUser = Meteor.users.findOne({_id: Meteor.userId()})
        data.profileUser = Meteor.users.findOne({$or:[{_id:this.props.user}, {username:this.props.user}]})
        data.currentFriends = Meteor.friends.find().fetch()
        data.currentRequests = Meteor.requests.find().fetch()
      }
    }
    return data
  },
  showAvatar(){
    //show user avatar
    if(false){
      return (<img className="profile-picture responsive-img" src="/images/avatars/{this.data.profile.avatar}" />)
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>)
    }
  },
  //requests friendship
  requestFriendship(e){
    e.preventDefault()
    this.data.profileUser.requestFriendship()
  },
  unfriend(e){
    e.preventDefault()
    this.data.profileUser.unfriend()
  },
  block(e){
    e.preventDefault()
    this.data.profileUser.block()
  },
  unBlockUser(e){
    e.preventDefault()
    this.data.profileUser.unblock()
  },
  reportUser(e){
    //TODO
    e.preventDefault()
  },
  acceptFriendshipRequest(e){
    e.preventDefault()
    this.data.profileUser.acceptFriendshipRequest()
  },
  denyFriendshipRequest(e){
    e.preventDefault()
    this.data.profileUser.denyFriendshipRequest()
  },
  cancelFriendshipRequest(e){
    e.preventDefault()
    this.data.profileUser.cancelFriendshipRequest()
  },
  //figure out which button to show
  friendshipOption(){
    let currentUser = this.data.currentUser
    let profileUser = this.data.profileUser

    //if friend request pending show cancel request button
    //TODO wait if PR #18 accepted https://github.com/copleykj/socialize-friendships/pull/18
    //else include this function into the server file
    /*
    if(currentUser.hasRequested(profileUser)){
      return <a href="#!" onClick={this.cancelFriendshipRequest} className="btn waves-effect">Cancel friendship request</a>
    }*/
    if(profileUser.hasRequestFrom(currentUser)){
      return <a href="#!" onClick={this.cancelFriendshipRequest} className="btn waves-effect">Cancel friendship request</a>
    }

    //if friendship request from this user show accept or deny button
    if(currentUser.hasRequestFrom(profileUser)){
      return <span><a href="#!" onClick={this.acceptFriendshipRequest} className="btn waves-effect">Accept friendship request</a><a href="#!" onClick={this.denyFriendshipRequest} className="btn waves-effect">Deny friendship</a></span>
    }

    //if friends show unfriend button
    if(currentUser.isFriendsWith(profileUser)){
      return <a href="#!" onClick={this.unfriend} className="btn waves-effect">Unfriend</a>
    } else {
      return <a href="#!" onClick={this.requestFriendship} className="btn waves-effect">Add to friends</a>
    }
  },
  //figure which button to show
  blockOption(){
    let currentUser = this.data.currentUser
    let profileUser = this.data.profileUser

    //if friends don't display anything
    if(! currentUser.isFriendsWith(profileUser)){
      //has user been blocked by the current user?
      if(false){
        //show unblock button
        return <a href="#!" onClick={this.unblock} className="btn waves-effect">Unblock</a>
      } else {
        //show block button
        return <a href="#!" onClick={this.block} className="btn waves-effect">Block</a>
      }
    }
  },
  addActions(){
    //no actions if user not logged in
    if(Meteor.userId()){
      //not the same user
      if(Meteor.userId() !== this.data.profile.userId){
        return (<div className="card-action">
          <a href="/pm/create?to={this.data.profile.userId}" className="btn waves-effect">Send a message</a>
          {this.friendshipOption()}
          {this.blockOption()}
          <a href="#!" onClick={this.reportUser} className="btn waves-effect">Report</a>
        </div>)
      }
    }
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    return (<div className="profile-header-bg">
      <div className="container">
        <section className="card-panel">
            <span className="profile-picture-box">{this.showAvatar()}</span>
            <h1 className="profile-username">{this.data.profile.username}</h1>
            <hr />
            {this.addActions()}
        </section>
        <section className="row">
          <div className="col s12 m10 l9">
            <div className="card-panel">
              <h4>Stream</h4>
              <UserFeed userId={this.data.profile.userId} />
            </div>
          </div>
          <div className="col s12 m2 l3">
            <div className="card-panel">
              <h5>{this.data.profile.givenName} {this.data.profile.familyName}</h5>
              <p>{this.data.profile.biography}</p>
            </div>
          </div>
        </section>
      </div>
    </div>)
  },
  /**
   * If user is defined it will show the content. Otherwise it will show a loading message.
   * @access private
   */
  render(){
    if(this.data.dataLoaded){
      if(Meteor.userId() !== Meteor.profiles.findOne().userId){
        //make sure that all the data is loaded so we don't get any strange errors
        if(this.data.currentUser && this.data.profileUser && this.data.currentFriends && this.data.currentRequests){
          return this.getContent()
        } else {
          return <div><Loader /></div>
        }
      } else {
        return this.getContent()
      }
    }
    return <div><Loader /></div>
  }
})

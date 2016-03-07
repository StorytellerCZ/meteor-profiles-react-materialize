/**
 * @class component UserFriendsRequests
 * @classdesc Component to manage friend requests.
 */
UserFriendsRequests = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    const handle = Meteor.subscribe("friendRequests")

    return {
      dataLoaded: handle.ready(),
      requests: Meteor.requests.find({userId: Meteor.userId()}).fetch()
    }
  },
  /**
   * Accepts a friend request from a given user.
   * @access private
   * @param {string} requestor userId
   */
  accept(requestor){
    requestor.acceptFriendshipRequest();
  },
  /**
   * Deny a request for friendship from the given user.
   * @access private
   * @param {string} requestor userId
   */
  deny(requestor){
    requestor.denyFriendshipRequest()
  },
  /**
   * Shows listing and options for friend requests.
   * @access private
   * @returns {jsx}
   */
  request(){
    let requests = this.data.requests

    if(requests.length === 0){
      return <li className="collection-item">You have no requests for friendship.</li>
    } else {
      return requests.map((req)=>{
        let requester = req.requester()

        return (<li key={requester._id} className="collection-item avatar">
          <i className="material-icons circle">user</i>
          <span className="title">{requester.username}</span>
          <p><a href="#!" onClick={this.accept.bind(null, requester)} ><i className="material-icons">check</i></a>
          <a href="#!" onClick={this.deny.bind(null, requester)} ><i className="material-icons">cancel</i></a></p>
          <a href={FlowRouter.path("/profile/"+requester.username)} className="secondary-content"><i className="material-icons">send</i></a>
        </li>)
      })
    }
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    return (<div>
      <h1><a href={FlowRouter.path("/")}><i className="material-icons">arrow_back</i></a> Friendships requests</h1>
      <ul className="collection">
        {this.request()}
      </ul>
    </div>)
  },
  /**
   * If user is defined it will show the content. Otherwise it will show a loading message.
   * @access private
   */
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

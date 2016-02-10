UserFriendsRequests = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    const handle = Meteor.subscribe("friendRequests")

    return {
      dataLoaded: handle.ready(),
      requests: Meteor.requests.find({userId: Meteor.userId()}).fetch()
    }
  },
  accept(requestor){
    requestor.acceptFriendshipRequest();
  },
  deny(requestor){
    requestor.denyFriendshipRequest()
  },
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
  getContent(){
    return (<div>
      <h1><a href={FlowRouter.path("/")}><i className="material-icons">arrow_back</i></a> Friendships requests</h1>
      <ul className="collection">
        {this.request()}
      </ul>
    </div>)
  },
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

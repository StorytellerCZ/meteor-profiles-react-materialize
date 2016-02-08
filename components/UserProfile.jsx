UserProfile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    const handle = Meteor.subscribe("profileFor", this.props.user)

    return {
      dataLoaded: handle.ready(),
      user: Meteor.users.findOne({username: this.props.user})
    }
  },
  showAvatar(){
    //show user avatar
    if(false){
      return (<img className="profile-picture responsive-img" src="/images/avatars/{this.data.userProfile.avatar}" />)
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>)
    }
  },
  showRealName(){

  },
  addActions(){
    //no actions if user not logged in
    if(Meteor.userId()){
      //not the same user
      if(Meteor.userId() !== this.data.user._id){
        return (<div className="card-action">
          <a href="/pm/create?to={this.data.user._id}" className="btn waves-effect">Send a message</a>
          <a href="#!" className="btn waves-effect">Add to friends</a>
          <a href="#!" className="btn waves-effect">Block</a>
          <a href="#!" className="btn waves-effect">Report</a>
        </div>)
      }
    }
  },
  getContent(){
    return (<div className="profile-header-bg">
      <div className="container">
        <div className="row">
          <section className="card">
            <div className="card-content">
              <span className="profile-picture-box">{this.showAvatar()}</span><h1 className="profile-username">{this.data.user.username}</h1>{this.showRealName()}
              <hr />
              <p>{/* this.data.userProfile.bio */}</p>
            </div>
            {this.addActions()}
          </section>
        </div>
      </div>
    </div>)
  },
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

UserProfile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    const handle = Meteor.subscribe("profileFor", this.props.user._id)

    return {
      dataLoaded: handle.ready(),
      profile: Meteor.profiles.findOne()
    }
  },
  showAvatar(){
    //show user avatar
    if(false){
      return (<img className="profile-picture responsive-img" src="/images/avatars/{this.data.profile.avatar}" />)
    } else {
      return (<i className="material-icons profile-picture">account_circle</i>)
    }
  },
  addActions(){
    //no actions if user not logged in
    if(Meteor.userId()){
      //not the same user
      if(Meteor.userId() !== this.data.profile.userId){
        return (<div className="card-action">
          <a href="/pm/create?to={this.data.profile.userId}" className="btn waves-effect">Send a message</a>
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
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

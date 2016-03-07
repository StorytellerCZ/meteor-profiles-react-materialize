/**
 * @class component UserChangeAvatar
 * @classdesc Changes user avatar. NOT IMPLEMENTED
 */
UserChangeAvatar = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let data = {}
    if(Package['storyteller:profiles-server']){
      const handle = Meteor.subscribe("profileFor", Meteor.userId())

      return {
        dataLoaded: handle.ready(),
        userProfile: Meteor.profiles.findOne({})
      }
    } else {
      console.log("You are missing the storyteller:profiles-server package")
      return {
        dataLoaded: false
      }
    }
  },

  getInitialState() {
        return {
            errors: {}
        }
  },

  deleteAvatar(e){
    e.preventDefault()
    //detele the current avatar
  },

  uploadAvatar(e){
    e.preventDefault()
    //upload avatar from hard drive
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    let avatarSrc = null
    if(this.data.userProfile){
      avatarSrc = this.data.userProfile.avatar
    }

    return (
      <form method="post" className="row" onSubmit={this.uploadAvatar}>
        <fieldset>
          <legend>Avatar</legend>
          <div className="col s12 m4 l2">
            <img className="responsive-img" src={avatarSrc} alt="current avatar" /><br />
            <a onClick={this.deleteAvatar} className="btn waves-effect">Delete avatar</a>
          </div>
          <div className="col s12 m8 l10">
              <div className="file-field input-field">
                <div className="btn waves-effect">
                  <span>File</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>
            <a onClick={this.uploadAvatar} className="btn waves-effect right">Upload</a>
        </fieldset>
      </form>)
  },
  /**
   * If user is defined it will show the content. Otherwise it will show a loading message.
   * @access private
   */
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

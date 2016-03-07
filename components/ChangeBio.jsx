/**
 * @class component UserChangeBio
 * @classdesc Change user biography
 */
UserChangeBio = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    if(Package["storyteller:profiles-server"]){
      const handle = Meteor.subscribe("profileFor", Meteor.userId())
      return {
        dataLoaded: handle.ready(),
        userProfile: Meteor.profiles.findOne({})
      }
    } else {
      console.log("You are missing the storyteller:profiles-server package.")
      return {
        dataLoaded: false,
        userProfile: false
      }
    }
  },
  componentDidMount(){
    $("#userBio").trigger('autoresize')
    Materialize.updateTextFields()
  },
  componentDidUpdate(){
    $("#userBio").trigger('autoresize')
    Materialize.updateTextFields()
  },
  /**
   * Changes currently logged in user's biography
   * @access private
   * @param {event} e Submit event from form
   */
  changeBio(e){
    e.preventDefault()
    let bio = e.target.userBio.value

    check(bio, String)

    Meteor.call("updateBiography", bio, (error, result)=>{
      if(error){
        Materialize.toast(error.reason, 5000)
        console.log(error);
      }
      if(result){
        Materialize.toast("Saved!", 3000)
      }
    })
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    let bio = null
    if(this.data.userProfile.biography){
      bio = this.data.userProfile.biography
    }

    return (
      <form method="post" className="row" ref="bioForm" onSubmit={this.changeBio}>
        <fieldset>
          <legend>Biography</legend>
            <div className="input-field col s12">
              <textarea id="userBio" name="userBio" className="materialize-textarea" defaultValue={bio}></textarea>
              <label htmlFor="userBio" className="active">A little bit about yourself</label>
              <input type="submit" value="Change" className="btn waves-effect"></input>
            </div>
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

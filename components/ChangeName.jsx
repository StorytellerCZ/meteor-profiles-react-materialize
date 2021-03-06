UserChangeName = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    if(Package["storyteller:profiles-server"]){
      const handle = Meteor.subscribe("profileFor", Meteor.userId())
      return {
        dataLoaded: handle.ready(),
        userProfile: Meteor.profiles.findOne()
      }
    } else {
      console.log("You are missing the storyteller:profiles-server package.")
      return {
        dataLoaded: false,
        userProfile: false
      }
    }
  },
  /**
   * Functions that run every time the component updates
   * @access private
   */
  componentDidUpdate(){
    Materialize.updateTextFields()
  },
  /**
   * Changes currently logged in user's name
   * @access private
   * @param {event} e Submit event from form
   */
  changeName(e){
    e.preventDefault()
    let given = e.target.given.value
    let family = e.target.family.value

    //check
    check(given, String)
    check(family, String)

    Meteor.call("updateName", {given: given, family: family}, function(error, result){
      if(error){
        console.log("error", error);
        Materialize.toast(error.reason, 5000)
      }
      if(result){
        Materialize.toast("Saved!", 3000)
      }
    });
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    let given, family = null
    if(this.data.userProfile.givenName || this.data.userProfile.familyName){
      given = this.data.userProfile.givenName
      family = this.data.userProfile.familyName
    }
    return (
      <form method="post" className="row section" ref="usernameForm" onSubmit={this.changeName}>
        <fieldset>
          <legend></legend>
            <div className="input-field col s12 m6">
              <input type="text" name="given" className="validate" defaultValue={given}></input>
              <label htmlFor="given" className="active">Given Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input type="text" name="family" className="validate" defaultValue={family}></input>
              <label htmlFor="family" className="active">Family Name</label>
            </div>
          <input type="submit" value="Change" className="btn waves-effect"></input>
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

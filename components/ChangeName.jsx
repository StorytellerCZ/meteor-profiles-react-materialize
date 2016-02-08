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
  componentDidMount(){
    Materialize.updateTextFields()
  },
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
              <label htmlFor="given">Given Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input type="text" name="family" className="validate" defaultValue={family}></input>
              <label htmlFor="family">Family Name</label>
            </div>
          <input type="submit" value="Change" className="btn waves-effect"></input>
        </fieldset>
      </form>)
  },
  render(){
    return (this.data.dataLoaded) ? this.getContent() : <div><Loader /></div>
  }
})

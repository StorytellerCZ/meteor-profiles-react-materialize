/**
 * @class component userProfileSettings
 * @classdesc Settings page to set things for the profile page. NOT IMPLEMENTED
 */
userProfileSettings = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    if(Package["storyteller:profiles-server"]){
      const handle = Meteor.subscribe("profileFor", Meteor.userId())
      return {
        dataReady: handle.ready(),
        userProfile: Meteor.profiles.findOne()
      }
    } else {
      console.log("You need the storyteller:profiles-server package")
      return {
        dataReady: false
      }
    }
  },
  getInitialState(){
    return {
      bgType: "color"
    }
  },
  componentDidMount(){
    if(handle.ready()){
      this.setState({
        bgType: this.data.userProfile.profileBackground.type
      })
    }
  },
  /**
   * Changes the type of the background between color and bg image
   * @access private
   */
  changeBgType(){
    if(this.state.bgType === "color"){
      this.setState({
        bgType: "url"
      })
    } else {
      this.setState({
        bgType: "color"
      })
    }
  },
  /**
   * Lets user select a color
   * @access private
   * TODO: Select from material design colors or any color
   */
  colorSelect(){
    return (<div>
        <input name="colorSelect" type="color" className="validate" />
        <label htmlFor="colorSelect">Color code</label>
      </div>)
  },
  /**
   * Let's user select an image for a background
   * @access private
   * TODO
   */
  imageSelect(){
    return (<div>
        <input name="imageUrl" type="url" className="validate" />
        <label htmlFor="imageUrl">Image Url</label>
      </div>)
  },
  saveSettings(e){
    e.preventDefault()
  },
  /**
   * Actual content to be displayed when user data are available.
   * @access private
   * @returns {jsx}
   */
  getContent(){
    return (<section className="section">
      <div className="row">
        <h5>Profile settings</h5>
        <form method="post" className="col s12" ref="profileSettingsForm" onSubmit={this.saveSettings}>
          <fieldset>
            <legend>Background</legend>
            <div className="row">
              <div className="input-field col s12">
                <div className="switch">
                  <label htmlFor="type">
                    Color
                    <input name="type" disabled type="checkbox" />
                    <span className="lever"></span>
                    Image
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                {(this.state.bgType === "color") ? this.colorSelect() : this.imageSelect()}
              </div>
            </div>
          </fieldset>
          <div className="row">
            <div className="input-field col s12">
              <input type="submit" value="Save Changes" className="btn waves-effect"></input>
            </div>
          </div>
        </form>
      </div>
    </section>)
  },
  /**
   * If user is defined it will show the content. Otherwise it will show a loading message.
   * @access private
   */
  render(){
    return (this.data.dataReady) ? this.getContent() : <div>Loading...</div>
  }
})

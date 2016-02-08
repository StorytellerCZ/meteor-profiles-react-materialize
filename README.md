Client side for storyteller:profiles-server package in React and Materialize CSS. Build on top of socialize:user-profile package.

UNDER DEVELOPMENT

Adds the following components to the storyteller:accounts-react-materialize package settings page:
=====
* `<UserChangeName />`
* `<UserChangeBio />`
* `<UserChangeAvatar />` WIP

User profile page
=====
Creates a user profile page to display all the information to everyone.

WIP: Integrates with other socialize packages to add more interactivity to the profile page.


Routes
=====
```js
//user profiles
FlowRouter.route("/profile", {
  name: "profile-personal",
  triggersEnter: [usersOnly, checkForProfile],
  action: () => {
    ReactLayout.render(MainLayout, { content: <UserProfile user={Meteor.users.findOne(Meteor.userId())} />,
     footer: "long"})
  }
})

FlowRouter.route("/profile/:username", {
  name: "profile",
  triggersEnter: [checkForProfile],
  action: (params, queryParams) => {
   //check if user exists
   if(params.username !== null && ! Meteor.users({username: params.username})){
     //show 404
     console.log("User not found!")
   }

   //if username null, go to the currently logged in user
   if(params.username === null){
     if(Meteor.userId()){
       FlowRouter.go("/profile")
     } else {
       //show 404
       console.log("User not found!")
     }
   }
   ReactLayout.render(MainLayout, { content: <UserProfile user={params.username} />,
    footer: "long"})
 }
})

function checkForProfile(context){
  Meteor.call("checkForProfile", context.params.username);
}
```

Loader
=====
The code allows for you to add your own custom loader. Just name the component `Loader` and it will work.

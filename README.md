[![Stories in Ready](https://badge.waffle.io/StorytellerCZ/meteor-profiles-server.png?label=ready&title=Ready)](https://waffle.io/StorytellerCZ/meteor-profiles-server)

# profiles-react-materialize

Client side for storyteller:profiles-server package in React and Materialize CSS. Build on top of socialize:user-profile package.

UNDER DEVELOPMENT

## Settings components

*   `<UserChangeName />`
*   `<UserChangeBio />`
*   `<UserChangeAvatar />` WIP

## User profile page

`<UserProfile />`
Creates a user profile page to display all the information to everyone.

## Friendships

`socialize:friendships` is implemented in this package.
`<UserFriendsRequests />` serves as a dedicated component to view the friendship requests to the user.


## Feed
`socialize:feed` is implemented in this package to show user a Facebook like feed on their profile page

*   `<UserFeed userId="userId" />`
*   `<NewFeedPost />`

## Routes

```js
//user profiles
FlowRouter.route("/profile", {
  name: "profile-personal",
  triggersEnter: [usersOnly],
  action: () => {
    ReactLayout.render(MainLayout, { content: <UserProfile user={Meteor.users.findOne(Meteor.userId())} />,
     footer: "long"})
  }
})

FlowRouter.route("/profile/:username", {
  name: "profile",
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
```

Loader
=====
The code allows for you to add your own custom loader. Just name the component `Loader` and it will work.

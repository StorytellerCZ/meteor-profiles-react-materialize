Package.describe({
  name: 'storyteller:profiles-react-materialize',
  version: '0.3.4',
  summary: 'Profiles for your users',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-react-materialize.git',
  documentation: 'README.md',
  deprecated: true
});

Package.onUse(function(api) {
  api.versionsFrom(['1.3', '2.3']);
  api.use(['meteor', 'ecmascript', 'check', 'accounts-password']);

  //other packages in use
  api.use([
    'storyteller:profiles-server@1.0.0',
    'socialize:user-profile@1.0.5',
    'socialize:friendships@1.1.2',
    'socialize:feed@1.0.5',
    'momentjs:moment@2.29.1',
    'djedi:sanitize-html-client@1.11.3'
  ]);

  api.addFiles([
    'components/UserProfile.jsx',
    'layouts/profile.css',
    'components/ChangeAvatar.jsx',
    'components/ChangeBio.jsx',
    'components/ChangeName.jsx',
    'components/ProfileSettings.jsx',
    'components/FriendsRequests.jsx',
    'components/Feed.jsx',
    'components/NewFeedPost.jsx'
  ], "client");

  api.imply(['momentjs:moment']);

  api.export([
    "UserProfile",
    "UserChangeAvatar",
    "UserChangeBio",
    "UserChangeName",
    "UserProfileSettings",
    "UserFriendsRequests",
    "UserFeed",
    "NewFeedPost"
  ], "client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-react-materialize');
  //api.addFiles('profiles-react-materialize-tests.js');
});

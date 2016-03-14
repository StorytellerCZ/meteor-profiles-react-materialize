Package.describe({
  name: 'storyteller:profiles-react-materialize',
  version: '0.3.1',
  summary: 'Profiles for your users',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-react-materialize.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['meteor', 'ecmascript', 'react@0.14.3', 'check', 'accounts-password']);

  //other packages in use
  api.use([
    'storyteller:profiles-server@0.3.1',
    'socialize:user-profile@0.2.0',
    'socialize:friendships@0.4.3',
    'socialize:feed@0.2.3',
    'momentjs:moment@2.12.0',
    'djedi:sanitize-html-client@1.11.2'
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

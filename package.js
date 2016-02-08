Package.describe({
  name: 'storyteller:profiles-react-materialize',
  version: '0.1.1',
  summary: 'Profiles for your users',
  git: 'https://github.com/StorytellerCZ/meteor-profiles-react-materialize.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['meteor', 'ecmascript', 'react@0.14.3', 'check', 'accounts-password']);

  //other packages in use
  api.use(['storyteller:profiles-server@0.1.1', 'socialize:user-profile@0.1.5']);

  api.addFiles(['components/UserProfile.jsx', 'layouts/profile.css', 'components/ChangeAvatar.jsx', 'components/ChangeBio.jsx', 'components/ChangeName.jsx', 'components/ProfileSettings.jsx'], "client");

  api.export(["UserProfile", "UserChangeAvatar", "UserChangeBio", "UserChangeName", "UserProfileSettings"], "client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('storyteller:profiles-react-materialize');
  //api.addFiles('profiles-react-materialize-tests.js');
});
export default () => ({
  storage: {
    local: {
      uploadDir: process.env.UPLOAD_DIR || 'apps/media/uploads',
    },
    useravatar: {
      uploadDir: process.env.USERAVATAR_DIR || 'apps/media/uploads/userAvatar',
    },
    profileBg: {
      uploadDir: process.env.PROFILEBG_DIR || 'apps/media/uploads/profileBg',
    },
  },
  URL: {
    userAvatarUrl: process.env.USERAVATARURL || 'http://localhost:5500/image/avatar/',
    profileBgUrl: process.env.PROFILEBGURL || 'http://localhost:5500image/profileBackGound/',
  }
});

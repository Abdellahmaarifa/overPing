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
    achievement: {
      uploadDir: process.env.ACHIEVEMENT_DIR || 'apps/media/uploads/achievement',
    },
  },
  URL: {
    userAvatarUrl: process.env.USERAVATARURL || 'http://localhost:5500/image/avatar/',
    profileBgUrl: process.env.PROFILEBGURL || 'http://localhost:5500/image/profileBackGound/',
    achievement: process.env.ACHIEVEMENTURL || 'http://localhost:5500/image/achievement/',
  }
});

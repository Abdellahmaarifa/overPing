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
});

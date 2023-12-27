export default () => ({
    storage: {
      local: {
        uploadDir: process.env.UPLOAD_DIR || 'apps/media/uploads',
      },
    },
  });
  
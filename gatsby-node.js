exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  await createNode({
    id: createNodeId('masthead-image'),
    masthead: `${process.env.CDN_URL}/thedchu-masthead.jpg`,
    internal: {
      type: 'MastheadImage',
      contentDigest: createContentDigest({
        masthead: `${process.env.CDN_URL}/thedchu-masthead.jpg`,
      }),
    },
  });
};

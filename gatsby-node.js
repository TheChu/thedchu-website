exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  const masthead = `${process.env.CDN_URL}/thedchu-masthead.jpg`;
  await createNode({
    id: createNodeId('masthead-image'),
    masthead,
    internal: {
      type: 'MastheadImage',
      contentDigest: createContentDigest({
        masthead,
      }),
    },
  });
};

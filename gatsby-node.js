exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const createNodeMastheadImage = async () => {
    const url = `${process.env.CDN_URL}/thedchu-masthead.jpg`;
    return await createNode({
      id: createNodeId('masthead-image'),
      url,
      internal: {
        type: 'MastheadImage',
        contentDigest: createContentDigest({
          url,
        }),
      },
    });
  };

  const aboutImages = [
    {
      description: 'on the streets',
      url: `${process.env.CDN_URL}/thedchu-about-1.jpg`,
    },
    {
      description: 'hiking',
      url: `${process.env.CDN_URL}/thedchu-about-2.jpg`,
    },
    {
      description: 'coding at the beach',
      url: `${process.env.CDN_URL}/thedchu-about-3.jpg`,
    },
    {
      description: 'playing guitar',
      url: `${process.env.CDN_URL}/thedchu-about-4.jpg`,
    },
  ];

  const createNodeAboutImages = await aboutImages.map(async (aboutImage, i) => {
    return await createNode({
      id: createNodeId(`about-image-${i + 1}`),
      ...aboutImage,
      internal: {
        type: 'AboutImage',
        contentDigest: createContentDigest({
          ...aboutImage,
        }),
      },
    });
  });

  await Promise.all([createNodeMastheadImage(), ...createNodeAboutImages]);
};

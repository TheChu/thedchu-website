exports.onCreateNode = ({ node }) => {
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter.thumbnail !== null
  ) {
    node.frontmatter.thumbnail = `${process.env.CDN_URL}/${node.frontmatter.thumbnail}`;
  }
};

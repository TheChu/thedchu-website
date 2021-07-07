import { onCreateNode } from '../../../plugins/gatsby-remark-preprocess/gatsby-node';

describe('gatsby-node', () => {
  describe('onCreateNode', () => {
    beforeEach(() => {
      process.env.CDN_URL = 'cdn.test.com';
    });

    afterEach(() => {
      jest.clearAllMocks();
      delete process.env.CDN_URL;
    });

    it('should prepend CDN url to thumbnail path', () => {
      const node = {
        frontmatter: { thumbnail: 'test-thumbnail.jpg' },
        internal: { type: 'MarkdownRemark' },
      };

      onCreateNode({ node });
      expect(node.frontmatter.thumbnail).toEqual(
        'cdn.test.com/test-thumbnail.jpg'
      );
    });

    it('should not do anything if node type is not `MarkdownRemark`', () => {
      const node = {
        internal: { type: 'NotMarkdown' },
      };

      onCreateNode({ node });
      expect(node).toEqual({ internal: { type: 'NotMarkdown' } });
    });
  });
});

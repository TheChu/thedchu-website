import { sourceNodes } from '../gatsby-node';

describe('gatsby-node', () => {
  describe('sourceNodes', () => {
    beforeEach(() => {
      process.env.CDN_URL = 'cdn.test.com';
    });

    afterEach(() => {
      jest.clearAllMocks();
      delete process.env.CDN_URL;
    });

    it('should call createNode', async () => {
      const createNode = jest.fn();
      const createNodeId = jest.fn().mockImplementation((id) => `test-${id}`);
      const createContentDigest = jest
        .fn()
        .mockImplementation((obj) => `test-${JSON.stringify(obj)}`);

      await sourceNodes({
        actions: { createNode },
        createNodeId,
        createContentDigest,
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-masthead-image',
        internal: {
          contentDigest:
            'test-{"masthead":"cdn.test.com/thedchu-masthead.jpg"}',
          type: 'MastheadImage',
        },
        masthead: 'cdn.test.com/thedchu-masthead.jpg',
      });
    });
  });
});

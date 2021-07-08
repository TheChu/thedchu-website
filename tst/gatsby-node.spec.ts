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

    const createNode = jest.fn();
    const createNodeId = jest.fn().mockImplementation((id) => `test-${id}`);
    const createContentDigest = jest
      .fn()
      .mockImplementation((obj) => `test-${JSON.stringify(obj)}`);

    it('should create the correct number of nodes', async () => {
      await sourceNodes({
        actions: { createNode },
        createNodeId,
        createContentDigest,
      });
      expect(createNode).toHaveBeenCalledTimes(5);
    });

    it('should create MastHeadImage node', async () => {
      await sourceNodes({
        actions: { createNode },
        createNodeId,
        createContentDigest,
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-masthead-image',
        internal: {
          contentDigest: 'test-{"url":"cdn.test.com/thedchu-masthead.jpg"}',
          type: 'MastheadImage',
        },
        url: 'cdn.test.com/thedchu-masthead.jpg',
      });
    });

    it('should create AboutImage nodes', async () => {
      await sourceNodes({
        actions: { createNode },
        createNodeId,
        createContentDigest,
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-about-image-1',
        internal: {
          contentDigest:
            'test-{"description":"on the streets","url":"cdn.test.com/thedchu-about-1.jpg"}',
          type: 'AboutImage',
        },
        description: 'on the streets',
        url: 'cdn.test.com/thedchu-about-1.jpg',
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-about-image-2',
        internal: {
          contentDigest:
            'test-{"description":"hiking","url":"cdn.test.com/thedchu-about-2.jpg"}',
          type: 'AboutImage',
        },
        description: 'hiking',
        url: 'cdn.test.com/thedchu-about-2.jpg',
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-about-image-3',
        internal: {
          contentDigest:
            'test-{"description":"coding at the beach","url":"cdn.test.com/thedchu-about-3.jpg"}',
          type: 'AboutImage',
        },
        description: 'coding at the beach',
        url: 'cdn.test.com/thedchu-about-3.jpg',
      });
      expect(createNode).toHaveBeenCalledWith({
        id: 'test-about-image-4',
        internal: {
          contentDigest:
            'test-{"description":"playing guitar","url":"cdn.test.com/thedchu-about-4.jpg"}',
          type: 'AboutImage',
        },
        description: 'playing guitar',
        url: 'cdn.test.com/thedchu-about-4.jpg',
      });
    });
  });
});

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'thedchu',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'thedchu',
        short_name: 'thedchu',
        description: `thedchu's personal website`,
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/assets/img/thedchu-logo.svg',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-preprocess'],
      },
    },
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'MastheadImage',
        imagePath: 'url',
      },
    },
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'AboutImage',
        imagePath: 'url',
      },
    },
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'MarkdownRemark',
        imagePath: 'frontmatter.thumbnail',
        name: 'thumbnail',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
  ],
};

const { setup } = require('./src/data/setup')

module.exports = {
  siteMetadata: {
    title: setup.title,
    short_name: setup.short_name,
    keywords: setup.keywords,
    description: setup.description,
    copyright: setup.copyright,
    canonicalUrl: setup.canonicalUrl,
    image: setup.image,
    author: {
      name: setup.author.name,
      minibio: setup.author.minibio,
    },
    siteUrl: setup.siteUrl,
    startUrl: setup.startUrl,
    pathPrefix: setup.pathPrefix,
    icon: setup.icon,
    rssFeed: setup.rssFeed || '',
    organization: {
      name: setup.organization.name,
      url: setup.organization.url,
      logo: setup.organization.logo,
    },
    social: {
      twitter: setup.social.twitter || '',
      fbAppID: setup.social.fbAppID || '',
    },
    googleAnalyticsId: 'UA-131102503-1',

    categories: [
      {
        slug: 'acting-like-a-grown-up',
        name: 'Acting Like a Grown-Up',
      },
      {
        slug: 'finding-direction',
        name: 'Finding Direction',
      },
      {
        slug: 'happiness',
        name: 'Building Happiness',
      },
      {
        slug: 'motivation',
        name: 'Staying Motivated',
      },
      {
        slug: 'remote-productivity',
        name: 'Remote Productivity',
      },
      {
        slug: 'remote-work',
        name: 'Living & Working Remotely',
      },
      {
        slug: 'storytelling',
        name: 'Storytelling',
      },
      {
        slug: 'impact',
        name: 'Creating an Impact',
      },
    ],
  },
  plugins: [
    // Files system
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: setup.googleAnalyticsId,
      },
    },
    // Media
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        stripMetadata: true,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    // Performance
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: setup.title,
        short_name: setup.short_name,
        description: setup.description,
        start_url: setup.startUrl,
        display: 'standalone',
        // icon: `${__dirname}/src/assets/images/${setup.icon}`,
        icon: `src/assets/images/gatsby-icon.png`,
        legacy: true,
      },
    },
    // `gatsby-plugin-netlify-cache`,
    // `gatsby-plugin-remove-serviceworker`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        rejected: true,
        printRejected: true,
        develop: true,
      },
    },
    'gatsby-plugin-netlify',
  ],
}

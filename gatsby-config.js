module.exports = {
  siteMetadata: {
    title: 'Ether Starter',
    keywords: 'Gatsby.js, React.js, GraphQL, Netlify, NetlifyCMS, Gulp, PostCSS'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },   
          {
            resolve: "gatsby-remark-better-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77.
              height: 400, // Optional: Overrides optional.ratio.
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0.
              showInfo: false // Optional: Hides video title and player actions.
            }
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },                  
        ],
      },
    }, 
    // SEO Smart
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `norican`,
          `fjalla one`,
          `source sans pro\:300,400,600,700,900`
        ]
      }
    },       
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: false,
        enableIdentityWidget: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
        htmlTitle: `Content Manager`,
      },
    },
    // 'gatsby-plugin-stripe-checkout',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
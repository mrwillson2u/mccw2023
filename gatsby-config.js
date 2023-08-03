/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `mccw2023`,
    siteUrl: `https://www.mccw3032.tld`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Shippori Mincho`,
            file: `https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&display=swap`,
          },
          {
            name: `Alegreya`,
            file: `https://fonts.googleapis.com/css2?family=Alegreya&display=swap`,
          },
          {
            name: `EB Garamond`,
            file: `https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&display=swap`,
          },
        ],
      },
    },

  ],
}

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
  plugins: [`gatsby-plugin-sass`, `gatsby-plugin-gatsby-cloud`],
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `mccw2023`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [`gatsby-plugin-sass`],
}

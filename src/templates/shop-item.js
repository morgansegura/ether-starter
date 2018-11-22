import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ShoppingCart from '../components/ShoppingCart'
import { convertWholeDollarsToCents } from '../helpers.js';

export const ShopItemTemplate = ({
  content,
  contentComponent,
  price,
  inStock,
  discount,
  mainImage,
  description,
  color,
  size,
  gallery,
  title,
  details,
  helmet,
}) => {
  const ShopItemContent = contentComponent || Content

  const priceDiscount = discount === null ? 0 : convertWholeDollarsToCents(discount)
  price = price === 0 ? price : convertWholeDollarsToCents(price)
  const savings = price - priceDiscount

  const product = {
    title,
    description,
    color,
    size,
    mainImage,
    priceDiscount,
    details,
    gallery,
    inStock,
    price,
    savings
  }

  return (
    
    <section className="section">
      {helmet || ''}
      <div className="container">
        <div className="shop-item__block">
          <h1 className="shop-item__title">
            {title}
          </h1>
          {<ShoppingCart product={product} />}
          <ShopItemContent content={content} />
        </div>

      </div>
    </section>
  )
}

ShopItemTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  price: PropTypes.number,
  color: PropTypes.object,
  size: PropTypes.object,
  discount: PropTypes.number,
  inStock: PropTypes.number,
  mainImage: PropTypes.object,
  details: PropTypes.object,
  gallery: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ShopItem = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ShopItemTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Shop"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        title={post.frontmatter.title}
        price={post.frontmatter.price}
        inStock={post.frontmatter.inStock}
        discount={post.frontmatter.discount}
        mainImage={post.frontmatter.mainImage}
        gallery={post.frontmatter.gallery}
        color={post.frontmatter.color}
        size={post.frontmatter.size}
        details={post.frontmatter.details}
      />
  
    </Layout>
  )
}

ShopItem.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ShopItem

export const shopQuery = graphql`
  query ShopItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        price
        inStock
        discount
        color {
          style
          options {
            option
            hex
          }
        }         
        size {
          options {
            option
            short
          }
        }  
        details {
          more {
            label
            item
          }
        }

        mainImage {
          image {
            childImageSharp {
              fluid(maxWidth: 500, quality: 92) {
                ...GatsbyImageSharpFluid
              }
            }            
          }
          alt
        }
        gallery {
          image {
            childImageSharp {
              fluid(maxWidth: 500, quality: 92) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }

      }
    }
  }
`
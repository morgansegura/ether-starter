import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ShoppingCart from '../components/ShoppingCart'

export const ShopItemTemplate = ({
  id,
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

  const priceDiscount = discount === null ? 0 : discount
  const savings = price - priceDiscount

  const product = {
    id,
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
  console.log(id)

  return (
    
    <section className="section product">
      {helmet || ''}


      <div className="container product__container">
        <div className="product__block">
          <ShoppingCart product={product} />
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
  id: PropTypes.string,
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
            htmlAttributes={{ lang: 'en' }}
            titleTemplate="%s | Shop"
            link={[{
              href: "https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
              rel: "stylesheet",
              type: "text/css"
            }]}
            script={[{
              type: 'text/javascript',
              url: "",
              id: "snipcart",
              "data-api-key": "M2JmYjRiNDMtNmNlYi00NjdiLTk4ODYtODgwNTFlMTkwNjhkNjM2Nzg4MDQ4MjU3NDgxMDk0",
              src: "https://cdn.snipcart.com/scripts/2.0/snipcart.js"
            }, {
              type: 'text/javascript',
              src: "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
            }]}            
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
        id={post.id}
        
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
    site {
      siteMetadata {
        title
      }
    }    
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        price
        inStock
        discount
        color {
          style
          color {
            color
            hex
          }
        }         
        size {
          style
          size {
            size
            short
            amount
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
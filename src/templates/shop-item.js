import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ShopItemTemplate = ({
  content,
  contentComponent,
  description,
  shortDescription,
  price,
  quantity,
  discount,
  mainImage,

  tags,
  title,
  helmet,
}) => {
  const ShopItemContent = contentComponent || Content
  const discountPrice = price - (price * (discount / 100)).toFixed(2)
  console.log(mainImage)
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="">
            <h1 className="">
              {title}
            </h1>

            <div className="shop__item">
              <p>{mainImage ? mainImage : 'No image here.'}</p>
            </div>

            <div className="shop__item">
              <p>Description: {shortDescription !== null ? shortDescription : description}</p>
            </div>

            <p className="price">
              <span className="label">Price:</span>
              <span className="data">${price}</span>
            </p>

            { // Stock Quantity
              discount > 0 ?
                <div className="shop__item">
                  <p className="price">
                    <span className="data">{discount}%</span>
                    <span className="label">off</span>
                  </p>
                  <p className="price price__discount">
                    <span className="label">New Price:</span>
                    <span className="data">${discountPrice}</span>
                  </p>
                </div>
                :
                <div className="shop__item">
                  <p className="price">
                    <span className="label">Regular price.</span>
                  </p>
                </div>
            }

            { // Stock Quantity
              quantity > 0 ?
                <p className="shop__item price">
                  <span className="data">{quantity}</span>
                  <span className="label">In stock</span>
                </p>
                :
                <p className="shop__item price">
                  <span className="label">Out of stock</span>
                </p>
            }

            <ShopItemContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ShopItemTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  price: PropTypes.float,
  discount: PropTypes.float,
  quantity: PropTypes.number,
  mainImage: PropTypes.object,
  gallery: PropTypes.object,
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
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        shortDescription={post.frontmatter.shortDescription}
        price={post.frontmatter.price}
        quantity={post.frontmatter.quantity}
        discount={post.frontmatter.discount}
        mainImage={post.frontmatter.main_image}
      // gallery={post.frontmatter.gallery}
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
        shortDescription
        price
        discount
        quantity
        main_image {
          image
          alt
        }

        tags
      }
    }
  }
`
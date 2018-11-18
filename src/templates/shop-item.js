import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
// import Img from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ShopItemTemplate = ({
  content,
  contentComponent,
  price,
  inStock,
  discount,
  mainImage,
  description,
  gallery,
  tags,
  title,
  helmet,
}) => {
  const ShopItemContent = contentComponent || Content
  const discountPrice = price - (price * (discount / 100)).toFixed(2)
  console.log(gallery)
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="shop-item__block">
          <h1 className="shop-item__title">
            {title}
          </h1>
          <div className="row">
            <div className="col-12 col-md-6 main-image">
              <PreviewCompatibleImage className="main-image__item" imageInfo={mainImage} />
            </div>
            <div className="gallery">
              {gallery ?
                gallery.map((img, i) => (
                    <div key={i} className="col-12 col-md-6 gallery__item">
                      <PreviewCompatibleImage imageInfo={img} />
                    </div>
                )) : null}
            </div>          
          </div>


          <div className="shop__item">
            <p>Description: {description !== null ? description : null}</p>
          </div>

          <p className="price">
            <span className="label">Price:</span>
            <span className="data">${price}</span>
          </p>

          { // Discount
            discount > 0 ?
              <div className="discount">
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
            inStock > 0 ?
              <p className="shop__item price">
                <span className="data">{inStock}</span>
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
    </section>
  )
}

ShopItemTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  inStock: PropTypes.number,
  mainImage: PropTypes.object,
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
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        price={post.frontmatter.price}
        inStock={post.frontmatter.inStock}
        discount={post.frontmatter.discount}
        mainImage={post.frontmatter.mainImage}
        gallery={post.frontmatter.gallery}
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
        tags
      }
    }
  }
`
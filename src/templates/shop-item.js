import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import StripeCheckout from '../components/stripe/StripeCheckout'

export const ShopItemTemplate = ({
  content,
  contentComponent,
  price,
  inStock,
  discount,
  mainImage,
  description,
  gallery,
  itemDetails,
  title,
  helmet,
}) => {
  const ShopItemContent = contentComponent || Content
  price = (price * 100)
  discount = (discount * 100)
  const savingsPrice = discount > 0 ? (price - discount) : price
  const discountPrice = price - savingsPrice 
  console.log(discountPrice)
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

            <div className="col-12 col-md-6 gallery row no-gap">
              {gallery && gallery.length ?
                gallery.map((img, i) => (
                    <div key={i} className="col-6 gallery__item">
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
            discount && discount > 0 ?
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
            inStock && inStock > 0 ?
              <p className="shop__item price">
                <span className="data">{inStock}</span>
                <span className="label">In stock</span>
              </p>
              :
              <p className="shop__item price">
                <span className="label">Out of stock</span>
              </p>
          }

          <div className="">
            <hr />
            <h3>Details:</h3>
            {itemDetails && itemDetails.length ?
              itemDetails.map((opt, i) => {
              return (
                <div key={i} className="">
                  <h4>{opt.option.optionTitle}</h4>
                  {opt.option.optionList && opt.option.optionList.length ?
                    opt.option.optionList.map((list, j) => (
                      <p key={j}>{list.optionItem}</p>
                    )) : null}
                </div>
              )}) : null}
          </div> 
          <StripeCheckout title={title} price={discountPrice} itemDetails={itemDetails} />
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
  discount: PropTypes.number,
  inStock: PropTypes.number,
  mainImage: PropTypes.object,
  gallery: PropTypes.array,
  itemDetails: PropTypes.array,
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
        itemDetails={post.frontmatter.itemDetails}
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
        itemDetails {
          option {
            optionTitle
            optionList {
              optionItem
            }
          }
        }
      }
    }
  }
`
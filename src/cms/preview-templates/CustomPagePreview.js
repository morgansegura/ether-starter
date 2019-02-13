import React from 'react'
import PropTypes from 'prop-types'
import { CustomPageTemplate } from '../../templates/page'

const CustomPagePreview = ({ entry, widgetFor }) => (
  <CustomPageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

CustomPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CustomPagePreview

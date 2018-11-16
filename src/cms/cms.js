import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import PricingPagePreview from './preview-templates/PricingPagePreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('pricing', PricingPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

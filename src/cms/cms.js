import CMS from 'netlify-cms'
import * as NativeColorWidget from 'netlify-cms-widget-native-color'

import HomePagePreview from './preview-templates/HomePagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import CustomPagePreview from './preview-templates/CustomPagePreview'
import SettingsPagePreview from './preview-templates/SettingsPagePreview'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('post', BlogPostPreview)
CMS.registerPreviewTemplate('page', CustomPagePreview)
CMS.registerPreviewTemplate('settings', SettingsPagePreview)

// Additional Widgets
CMS.registerWidget('native-color', NativeColorWidget.Control)

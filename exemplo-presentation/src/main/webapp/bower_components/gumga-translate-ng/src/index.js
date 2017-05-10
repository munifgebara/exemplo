'use strict';

require('./helper/helper.js')
require('./filter/filter.js')
require('./provider/provider.js')

require('./directive/translate/translate.js')
require('./directive/helper/helper.js')
require('./directive/translate-tag/translate-tag.js')

angular.module('gumga.translate', [
    'gumga.translate.helper',
    'gumga.translate.filter',
    'gumga.translate.provider',
    'gumga.translate.directive',
    'gumga.translate.directive.translatetag',
    'gumga.translate.directive.translatehelper'
  ])

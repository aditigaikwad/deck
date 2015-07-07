'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.directives', [
  require('./gist.directive.js'),
  require('./help.directive.js'),
  require('./modalWizard.js'),
  require('./accountLabelColor.directive.js'),
  require('utils/scrollTriggerService.js'),
])
//.directive(require('./accountLabelColor.directive.js'))
.directive('accountSelectField', require('./accountSelectField.js'))
.directive('accountTag', require('./accountTag.js'))
.directive('autoScroll', require('./autoScroll.directive.js'))
.directive('autoFocus', require('./autofocus.js'))
.directive('availabilityZoneSelector', require('./availabilityZoneSelector.js'))
.directive('checklist', require('./checklist.directive.js'))
.directive('collapsibleSection', require('./collapsibleSection.js'))
.directive('dynamicOverlay', require('./dynamicOverlay.js'))
.directive('insightMenu', require('./insightmenu.js'))
.directive('insightmenu', require('./instanceList.directive.js'))
.directive('instanceListBody', require('./instanceListBody.directive.js'))
.directive('instances', require('./instances.js'))
.directive('katoError', require('./katoError.js'))
.directive('katoProgress', require('./katoProgress.js'))
.directive('loadBalancerAvailabilityZoneSelector', require('./loadBalancerAvailabilityZoneSelector.js'))
.directive('modalClose', require('./modalClose.js'))
.directive('modalPage', require('./modalPage.js'))
.directive('multiPageModal', require('./multiPageModal.js'))
.directive('panelProgress', require('./panelProgress.js'))
.directive('regionSelectField', require('./regionSelectField.directive.js'))
.directive('serverGroup', require('./serverGroup.js'))
.directive('sortToggle', require('./sorttoggle.js'))
.directive('stateActive', require('./stateactive.js'))
.directive('submitButton', require('./submitButton.js'))
.directive('subnetSelectField', require('./subnetSelectField.js'))
.directive('vilible', require('./visible.js'))
.directive('wizardPage', require('./wizardPage.js'))
.name;

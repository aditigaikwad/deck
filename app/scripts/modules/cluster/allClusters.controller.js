'use strict';

let angular = require('angular');

module.exports = angular.module('clusters.all', [
  require('../clusterFilter/clusterFilterService.js'),
  require('../clusterFilter/clusterFilterModel.js'),
  require('./clusterPod.directive.js'),
  require('../account/account.module.js'),
  require('../providerSelection/providerSelection.module.js'),
  require('../providerSelection/providerSelection.service.js'),
  require('../securityGroups/securityGroup.read.service.js'),
  require('../serverGroups/configure/common/serverGroupCommandBuilder.js'),
  require('utils/waypoints/waypointContainer.directive.js'),
])
  .controller('AllClustersCtrl', function($scope, app, $modal, $location,
                                          securityGroupReader, accountService, providerSelectionService,
                                          _, $stateParams, settings, $q, $window, clusterFilterService, ClusterFilterModel, serverGroupCommandBuilder) {

    $scope.sortFilter = ClusterFilterModel.sortFilter;

    var searchCache = null;

    $scope.$on('$stateChangeStart', function() {
      searchCache = $location.search();
    });
    $scope.$on('$stateChangeSuccess', function() {
      if (searchCache) {
        $location.search(searchCache);
      }
    });

    function addSearchFields() {
      app.serverGroups.forEach(function(serverGroup) {
        var buildInfo = '';
        if (serverGroup.buildInfo && serverGroup.buildInfo.jenkins) {
          buildInfo = [
              '#' + serverGroup.buildInfo.jenkins.number,
              serverGroup.buildInfo.jenkins.host,
              serverGroup.buildInfo.jenkins.name].join(' ').toLowerCase();
        }
        if (!serverGroup.searchField) {
          serverGroup.searchField = [
            serverGroup.region.toLowerCase(),
            serverGroup.name.toLowerCase(),
            serverGroup.account.toLowerCase(),
            buildInfo,
            _.collect(serverGroup.loadBalancers, 'name').join(' '),
            _.collect(serverGroup.instances, 'id').join(' ')
          ].join(' ');
        }
      });
    }

    function updateClusterGroups() {
      clusterFilterService.updateQueryParams();
      $scope.$evalAsync(function() {
          clusterFilterService.updateClusterGroups(app);
        }
      );

      $scope.groups = ClusterFilterModel.groups;
      $scope.displayOptions = ClusterFilterModel.displayOptions;
      $scope.tags = ClusterFilterModel.sortFilter.tags;
    }

    this.clearFilters = function() {
      clusterFilterService.clearFilters();
      updateClusterGroups();
    };

    this.createServerGroup = function createServerGroup() {
      // BEN_TODO: figure out interpolated values with webpack
      providerSelectionService.selectProvider().then(function(selectedProvider) {
        $modal.open({
          templateUrl: 'scripts/modules/serverGroups/configure/' + selectedProvider + '/wizard/serverGroupWizard.html',
          controller: selectedProvider + 'CloneServerGroupCtrl as ctrl',
          resolve: {
            title: function() { return 'Create New Server Group'; },
            application: function() { return app; },
            serverGroup: function() { return null; },
            serverGroupCommand: function() { return serverGroupCommandBuilder.buildNewServerGroupCommand(app, selectedProvider); },
            provider: function() { return selectedProvider; }
          }
        });
      });
    };

    this.updateClusterGroups = _.debounce(updateClusterGroups, 200);

    function autoRefreshHandler() {
      addSearchFields();
      updateClusterGroups();
    }

    autoRefreshHandler();

    app.registerAutoRefreshHandler(autoRefreshHandler, $scope);
  })
  .name;

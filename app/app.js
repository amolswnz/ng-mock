angular.module('ItemsApp', [])

  .controller('MainCtrl', function($scope, $rootScope) {
    $scope.title = 'Hello World';

    $rootScope.$on("item:added", function(event, item) {
      $scope.item = item;
    });
  })

  .factory('ItemsService', function() {
    var is = {},
      _items = ['hat', 'book', 'pen'];
    is.get = function() {
      return _items;
    };
    return is;
  })

  .directive('userProfile', function() {
    return {
      restrict: 'E',
      template: '<div>{{user.name}}</div>',
      scope: {
        user: '=data'
      },
      replace: true
    };
  })

  .filter('reverse', [function() {
    return function(string) {
      return string.split('').reverse().join('');
    };
  }])

  .factory('ItemsServiceServer', ['$http', '$q', function($http, $q) {
    var is = {};
    is.get = function() {
      var deferred = $q.defer();
      $http.get('items.json') //'items.json will be mocked in the test'
        .then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };
    return is;
  }])



  .factory("appBroadcaster", ['$rootScope', function($rootScope) {
    var abc = {};
    abc.itemAdded = function(item) {
      $rootScope.$broadcast("item:added", item);
    };
    return abc;
  }]);

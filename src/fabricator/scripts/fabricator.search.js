//Todo - Note reduce the search range only for the name not the aditional content.

(function(window) {
    var ns = 'fApp';
    window[ns] = angular.module(ns, []);
} (window));



(function(module) {
    module.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }]);
} (fApp));




(function(module) {
    module.directive('fSearch', ['fIndexService', function(fIndexService) {
        return {
            restrict: 'AE',
            scope: false,
            link: function($scope, $element, $attrs) {


                $scope.getURL = function() {
                    return this.item.url;
                };

                fIndexService.getData('fabricator/data/data.json')
                    .success(function(data, status) {
                        $scope.collection = objectToArray(data);
                    })
                    .error(function(data, status) {
                        console.log('Error', data, status);
                    });



                function objectToArray(collection) {
                    var result = [];
                    angular.forEach(collection, function(group) {
                        angular.forEach(group, function(value) {
                            result.push(value);
                        });
                    });
                    return result;
                }
            }
        }
    }]);
} (fApp));


(function(module) {
    module.factory('fIndexService', ['$http', function($http) {
        return {
            getData: function getData(location) {
                if(angular.isUndefined(location)) throw 'Define data location';
                return $http.get(location);
            }
        }
    }]);
} (fApp));


(function(module) {
    module.filter('emptyifblank', [function() {
        return function(object, query) {
            if(!query) {
                return {}
            } else {
                return object;
            }
        }
    }]);
} (fApp));
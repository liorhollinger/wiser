'use strict';

var app = angular.module('wiser', ['ngRoute', 'angularUtils.directives.dirPagination'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'wiser.html',
                controller: 'WiserCtrl'
            })
    }])

    .controller('WiserCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('products.json').then(function (response) {
            $scope.products = response.data;
            $scope.sortItems('price');

        });

        function compare(a, b) {
            if (a[$scope.parameterToCompare] < b[$scope.parameterToCompare])
                return -1;
            else if (a[$scope.parameterToCompare] > b[$scope.parameterToCompare])
                return 1;
            else
                return 0;
        }

        $scope.sortItems = function (parameter) {
            $scope.parameterToCompare = parameter;
            $scope.products.sort(compare);
            $scope.name = (parameter === 'name');
            $scope.sku = (parameter === 'sku');
            $scope.price = (parameter === 'price');
            $scope.category = (parameter === 'category');
        };



        $scope.setProduct = function (product) {
            $scope.productOnfocus = product;
            $('#edit').on('shown.bs.modal', function () {
                $('#name').focus();
            })
        };

        $('#edit').on('hidden.bs.modal', function () {
            $(this)
                .find("input,textarea,select")
                .val('')
                .end()
        });

        $scope.deleteProduct = function () {
            $scope.products.forEach(function (product, index) {
                if (product.sku === $scope.productOnfocus.sku) {
                    $scope.products.splice(index, 1);
                }
            });
        };

        $scope.editProduct = function () {
            var upDatedProduct = {
                "name": $scope.productToUpDate.name,
                "sku": $scope.productOnfocus.sku,
                "price": $scope.productToUpDate.price,
                "category": $scope.productToUpDate.category
            };

            $scope.products.forEach(function (product, index) {
                if (product.sku === $scope.productOnfocus.sku) {
                    $scope.products[index] = upDatedProduct;
                }
            });
            $('#edit').modal('hide');
        };

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.meals = [];


// the code that follows is what i used to create the  row data.

//var products = [];
//        var ab = 'abcdefghijklmnopqrstuvwxyz';
//        var category = ['sport', 'home', 'clothes'];
//
//       for (var i = 0 ; i < 1000 ; i++){
//           var name ='';
//           for (var j = 0 ; j < 5 ; j++){
//               name += ab[Math.floor(Math.random()*26)];
//           }
//           var product = {'name' : name, 'sku':(i+1),'price':5+Math.floor(Math.random()*200)+(Math.floor(Math.random()*100))/100,'category':category [Math.floor(Math.random()*3)] }
//           products.push(product);
//       }
//$scope.ppp = products

    }]);
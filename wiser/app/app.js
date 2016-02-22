'use strict';

var app = angular.module('wiser', ['ngRoute'])

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
        });

        $scope.orderClicked = function (currentParameter) {
            $scope.currentOrder = currentParameter;
            $scope.name = (currentParameter === 'name');
            $scope.sku = (currentParameter === 'sku');
            $scope.price = (currentParameter === 'price');
            $scope.category = (currentParameter === 'category');
        };
        $scope.orderClicked('category');

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
/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndtM-app", ['ui.router', 'ui.bootstrap', 'ngAside', 'uiInfoUser', 'uiLoginUser', 'ngCookies', 'uiConfirmationModal']);

angular.module('ndtM-app').run(function ($rootScope, $aside, $state) {
    $rootScope.user;
    $rootScope.asideState = {
        open: false
    };
    $rootScope.openAside = function (position, backdrop) {
        $rootScope.asideState = {
            open: true,
            position: position
        };

        function postClose() {
            $rootScope.asideState.open = false;
        }

        $aside.open({
            templateUrl: '/admin/views/aside.html',
            placement: position,
            size: 'sm',
            backdrop: backdrop,
            controller: function ($rootScope, $uibModalInstance) {
                $rootScope.home = function(e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('home');
                };
                $rootScope.users = function(e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('users');
                };
                $rootScope.categories = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('categories');
                };

                $rootScope.products = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('products');
                };

                $rootScope.gallery = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('gallery');
                };
                $rootScope.contacts = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                    $state.go('contacts');
                };
            }
        }).result.then(postClose, postClose);
    }
});

angular.module('ndtM-app').config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    //Now set up the states
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/admin/views/home.html',
            controller: 'ndtControllerManager'
        })
        .state('logout', {
            url: '/logout/',
            templateUrl: '/admin/views/home.html',
            controller: 'ndtLogOffController'
        })
        .state('users', {
            url: '/users/',
            templateUrl: '/admin/views/list_user.html',
            controller: 'ndtUsersController'
        })
        .state('categories', {
            url: '/categories/',
            templateUrl: '/admin/views/list_category.html',
            controller: 'ndtCategoriesController'
        })
        .state('products', {
            url: '/products/',
            templateUrl: '/admin/views/list_product.html',
            controller: 'ndtProductsController'
        })
        .state('contacts', {
            url: '/contacts/',
            templateUrl: '/admin/views/list_contact.html',
            controller: 'ndtUsersController'
        })
        .state('gallery', {
            url: '/gallery/',
            templateUrl: '/admin/views/list_contact.html',
            controller: 'ndtUsersController'
        })

});
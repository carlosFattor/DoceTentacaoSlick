/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').config(
    function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    });
angular.module('ndtM-app').factory('listAPIManager', function ($http, $cookieStore, $state) {

    var global_error_handler;

    var auth = {
        user: null,
        authenticated: authenticated,
        set_user: set_user,
        logout: logout
    };

    var factory = {
        loginUser: loginUser,
        getUsers: getUsers,
        deleteUsers: deleteUsers,
        createUser: createUser,
        updateUser: updateUser,
        auth: auth,
        getCategories: getCategories,
        getProducts: getProducts,
        getGallery: getGallery,
        updateGallery: updateGallery,
        createGall: createGall,
        deleteGallery: deleteGallery,
        updateCategory: updateCategory,
        createCat: createCat,
        deleteCategory: deleteCategory,
        createProduct: createProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
        getContacts: getContacts
    };

    function authenticated() {
        set_user($cookieStore.get("user_auth"))
        return (auth.user !== null && auth.user !== undefined);
    };

    function set_user(user) {
        auth.user = user;
        $cookieStore.put("user_auth", auth)
    };

    function logout() {
        auth.user = null;
    };

    function _check_for_authentication(result) {
        result.success(function (data, status) {
            set_user(data.response);
        }).error(function (data, status) {
            auth.user = null;
        });

    };

    function loginUser(credentials) {
        var promise = $http({
            method: 'post',
            url: '/admin/users/login/',
            data: credentials
        });
        if (global_error_handler) {
            promise.catch(global_error_handler)
        }
        _check_for_authentication(promise);
        return promise;
    };

    function getUsers() {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'get',
                url: '/admin/users/'
            });
        } else {
            $state.go('home')
        }
        return promise;
    };
    function deleteUsers(id) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'delete',
                url: '/admin/users/delete/',
                data: id
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function createUser(user) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'post',
                url: '/admin/users/new/',
                data: user
            });
        } else {
            $state.go('home')
        }
        return promise;
    };

    function updateUser(user) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'put',
                url: '/admin/users/update/',
                data: user
            });
        } else {
            $state.go('home')
        }
        return promise;
    };

    function getCategories() {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'get',
                url: '/admin/category/list/'
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function getProducts() {
        var promise = {};
        if (authenticated) {
            promise = $http({
                method: 'get',
                url: '/admin/product/list/ '
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function getGallery(){
        var promise = {}
        if(authenticated()){
            promise = $http({
                method: 'get',
                url: '/admin/gallery/list/'
            })
        }else{
            $state.go('home')
        }
        return promise;
    };

    function updateGallery(gal){
        var promise = {}
        if(authenticated()){
            promise = $http({
                method: 'put',
                url: '/admin/gallery/update/',
                data: gal
            })
        }else{
            $state.go('home')
        }
        return promise;
    };

    function createGall(gal) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'post',
                url: '/admin/gallery/new/',
                data: gal
            });
        } else {
            $state.go('home')
        }
        return promise;
    };

    function deleteGallery(id) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'delete',
                url: '/admin/gallery/delete/',
                data: id
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function updateCategory(cat){
        var promise = {}
        if(authenticated()){
            promise = $http({
                method: 'put',
                url: '/admin/category/update/',
                data: cat
            })
        }else{
            $state.go('home')
        }
        return promise;
    };

    function createCat(cat) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'post',
                url: '/admin/category/new/',
                data: cat
            });
        } else {
            $state.go('home')
        }
        return promise;
    };

    function deleteCategory(id) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'delete',
                url: '/admin/category/delete/',
                data: id
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function createProduct(prod) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'post',
                url: '/admin/product/new/',
                data: prod
            });
        } else {
            $state.go('home')
        }
        return promise;
    };

    function updateProduct(prod){
        var promise = {}
        if(authenticated()){
            promise = $http({
                method: 'put',
                url: '/admin/product/update/',
                data: prod
            })
        }else{
            $state.go('home')
        }
        return promise;
    };

    function deleteProduct(id) {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'delete',
                url: '/admin/product/delete/',
                data: id
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    function getContacts() {
        var promise = {};
        if (authenticated()) {
            promise = $http({
                method: 'get',
                url: '/admin/contacts/'
            })
        } else {
            $state.go('home')
        }
        return promise;
    };

    return factory;
});
/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module('ndt-app').config(
    function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    });
angular.module("ndt-app").factory("listAPI", function ($http) {
    var _getList = function () {
        return $http.get(config.baseURL + "/list/");
    };

    var _getListCategory = function () {
        return $http.get("/category/list/");
    };

    var _getProduct = function (id) {
        return $http.get("/product/get/" + id + "/");
    }
    var _getListProductFeatured = function () {
        return $http.get("/product/list_featured/");
    };

    var _getListProducts = function (id) {
        return $http.get("/product/list_products/" + id + "/");
    }

    var _getListGallery = function () {
        return $http.get("/gallery/list/")
    }

    var _sendContact = function (contact) {
        return $http.post("/contact/send/", contact)
    }

    var _sendNews = function (email) {
        return $http.post("/contact/news/", email)
    }

    var _findListProds = function (name) {
        return $http.get("/product/get_list/" + name + "/")
    }

    return {
        getList: _getList,
        getListCategory: _getListCategory,
        getProduct: _getProduct,
        getListProductFeatured: _getListProductFeatured,
        getListProducts: _getListProducts,
        getListGallery: _getListGallery,
        sendContact: _sendContact,
        sendNews: _sendNews,
        findListProds: _findListProds
    };
});

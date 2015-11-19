/**
 * Created by carlos on 15/10/15.
 */
'use strict';
angular.module("ndt-app").factory("listAPI", function($http, config){
    var _getList = function(){
        return $http.get(config.baseURL+"/list/");
    };

    var _getListCategory = function() {
        return $http.get(config.baseURL+"/category/list/");
    };

    var _getProduct = function(id) {
        return $http.get(config.baseURL+"/product/get/"+id+"/");
    }
    var _getListProductFeatured = function () {
        return $http.get(config.baseURL+"/product/list_featured/");
    };

    var _getListProducts= function(id) {
        return $http.get(config.baseURL+"/product/list_products/"+id+"/");
    }

    var _getListGallery = function() {
        return $http.get(config.baseURL+"/gallery/list/")
    }

    var _sendContact = function(contact){
        return $http.post(config.baseURL+"/contact/send/", contact)
    }

    var _sendNews = function(email) {
        return $http.post(config.baseURL+"/contact/news/", email)
    }

    return {
        getList: _getList,
        getListCategory: _getListCategory,
        getProduct: _getProduct,
        getListProductFeatured: _getListProductFeatured,
        getListProducts: _getListProducts,
        getListGallery: _getListGallery,
        sendContact: _sendContact,
        sendNews: _sendNews
    };
});

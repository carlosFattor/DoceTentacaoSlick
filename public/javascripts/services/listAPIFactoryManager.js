/**
 * Created by carlos on 19/11/15.
 */
'use strict';
angular.module('ndtM-app').config(
    function($httpProvider){
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    }
);
angular.module('ndtM-app').factory('listAPIManager', function ($http, $cookieStore, $state) {

    var global_error_handler;

    var auth = {
        user: null,
        authenticated: authenticated,
        has_permission: has_permission,
        set_user: set_user,
        logout: logout
    };

    var factory = {
        loginUser: loginUser,
        getUsers: getUsers,
        deleteUsers: deleteUsers,
        createUser: createUser,
        updateUser: updateUser,
        error_handler: set_error_handler,
        auth: auth
    };

    function authenticated(){
        set_user($cookieStore.get("user_auth"))
        return (auth.user !== null && auth.user !== undefined);
    };

    function has_permission(permission){
        return auth.user && auth.user.permissions[permission];
    };

    function set_user(user){
        auth.user = user;
        $cookieStore.put("user_auth", auth)
    };

    function logout(){
        auth.user = null;
    };

    function _check_for_authentication(result){
        result.success(function(data, status){
            set_user(data.response);
        }).error(function(data, status){
            auth.user = null;
        });

    };

    function loginUser(credentials) {
        var promise = $http({
            method: 'post',
            url: '/admin/users/login/',
            data: credentials
        });
        if(global_error_handler){
            promise.catch(global_error_handler)
        }
        _check_for_authentication(promise);
        return promise;
    };

    function getUsers(){
        var promise ={};
        if(authenticated()){
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
        var promise = $http({
            method: 'delete',
            url: '/admin/users/delete/',
            data: id
        });
        if(global_error_handler){
            promise = null;
        }
        return promise;
    };
    function createUser(user){
        var promise = $http({
            method: 'post',
            url: '/admin/users/new/',
            data: user
        });
        if(global_error_handler){
            promise.catch(global_error_handler)
        }
        return promise;
    }
    function updateUser(user){
        var promise = $http({
            method: 'put',
            url: '/admin/users/update/',
            data: user
        });
        if(global_error_handler){
            promise.catch(global_error_handler)
        }
        return promise;
    }

    function set_error_handler(f){
        global_error_handler = f;
    };

    return factory;
});
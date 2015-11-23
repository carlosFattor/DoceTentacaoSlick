'use strict';
/**
 * Created by carlos on 22/11/15.
 */
angular.module('uiLoginUser', ['ui.bootstrap.modal', 'ngCookies'])
angular.module('uiLoginUser').directive('loginUser', function($rootScope, listAPIManager, $cookieStore){
    var generateInfoUser = function(user){
        $rootScope.infoUser = {
            url: '/manager/views/info_user.html',
            name: user.name,
            avatar: user.avatarURL,
            itemMenu: [
                { nameMenu: 'Painel', class: 'fa fa-tachometer', link: '#'},
                { nameMenu: 'Config', class: 'fa fa-cogs', link: '#'},
                { nameMenu: 'Ajuda', class: 'fa fa-question', link: '#'},
                { nameMenu: 'Logoff', class: 'fa fa-power-off', link: 'logout'}
            ]
        }
        $rootScope.user = user;

        $cookieStore.put("user", $rootScope.user);
        $cookieStore.put("infoUser", $rootScope.infoUser);
    }

    var readeCookie = function(){
        var userCookie = $cookieStore.get("user");
        console.log(userCookie);
        if(userCookie != null){
            generateInfoUser(userCookie);
        }
    }
    return {
        replace: true,
        restrict: 'E',
        templateUrl: '/admin/views/login_user.html',
        scope: {

        },
        link: function(scope, element, attrs){
            scope.frmLogin = {};
            scope.msgSuccess;
            scope.msgFail;

            console.log("teste")
            readeCookie();

            scope.cancelUser = function(){
                delete $rootScope.user;
                scope.frmLogin = {};
            }
            scope.logUser = function(objUser) {

                listAPIManager.getUserValue(angular.copy(objUser))
                    .success(function(data, status){
                        scope.msgFail = false;
                        generateInfoUser(data.response);
                    })
                    .error(function(data, status){
                        scope.msgSuccess = false;

                        if(status === 403){
                            scope.msgFail = "Permissão de acesso negada.";
                        } else if(status === 404){
                            scope.msgFail = "Usuário não encontrado.";
                        }
                    })
            };
        }
    };
});
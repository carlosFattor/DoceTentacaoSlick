angular.module("ndt-app").filter("name", function(){
    return function(input){
        var listaNomes = input.split(" ");
        var listaNomesFormatado = listaNomes.map(function(name){
            if(name.size <= 2) return name.toLowerCase();
            return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        });

        return listaNomesFormatado.join(" ");
    };
});
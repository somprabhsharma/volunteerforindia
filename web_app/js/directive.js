app.directive('settingButton', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).dropdown(scope.$eval(attrs.settingButton));
        }
    };
});

app.directive('mobileButton', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	$(element).sideNav(scope.$eval(attrs.settingButton));
        }
    };
});

app.directive('filepath',function(){
    console.log("there");
    return{
        link: function(scope,element,attrs){
            console.log("i am here");
            // File Input Path
            $(element).each(function() {
              var path_input = $(element).find('input.file-path');
              $(element).find('input[type="file"]').change(function () {
                path_input.val($(element)[0].files[0].name);
                path_input.trigger('change');
              });
            });
        }
    };
});
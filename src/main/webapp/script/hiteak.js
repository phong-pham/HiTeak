$(document).ready(function() {
    $('#submitCatalogRequest').click(function(){
        var requestForm = $('#requestCatalogForm');
        if(HiTeak.validateForm(requestForm)){
            var formData = HiTeak.doRetrieveDataFromForm(requestForm);
            $.postJSON('request-catalog', formData,
                function(json){
                    HiTeak.showDialog('Confirm', 'Thanks for requesting our catalog.', HiTeak.HITEAK_ALERT_LEVEL_SUCCESS, 'Close', goToHomePage);
                }
            )
        }
    });

    var goToHomePage = function(){
        window.location.href = 'http://' + window.location.host + '/home';
    }

    $('.login-link').click(function(){
        var loginView = $('#loginView');
        loginView.modal();
        loginView.find('#password').val('');
        loginView.find('#userName').val('').trigger('focus');
    });

    $('#loginBtn').click(function(){
        doLogin();
    });


    var doLogin = function(){
        var loginView = $('#loginView');
        $.postJSON('do-login',{
            userName    : loginView.find('#userName').val(),
            password    : loginView.find("#password").val(),
        }, function(json){
            if(json.success){
                loginView.modal('hide');
                $('.login-info').css('display', 'block');
                $('.login-name').html('Hello ' + json.data.firstName + ' ' + json.data.lastName);
                $('.login-link').css('display', 'none');

            }else{
                HiTeak.showDialog('Error', json.message, HiTeak.HITEAK_ALERT_LEVEL_ERROR);
            }
        });

    };

    $('.logout-link').click(function(){
        $.postJSON('do-logout',{}, function(json){
            $('.login-info').css('display', 'none');
            $('.login-name').html('');
            $('.login-link').css('display', 'block');
        });
    });
});
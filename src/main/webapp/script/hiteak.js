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
        setupLoginView('login');
        loginView.find('#userName').trigger('focus');
    });

    $('#loginBtn').click(function(){
        var loginView   = $('#loginView'),
            action      = loginView.attr('action');
        if(HiTeak.validateForm(loginView, '.input-group')){
            if(action == 'login'){
                doLogin();
            }else if(action == 'forgot'){

            }else if(action == 'signup'){
                var formData = HiTeak.doRetrieveDataFromForm(loginView, '.input-group');
                if(formData){
                    if(formData.password != formData.reenterPassword){
                        HiTeak.showDialog('Error', 'Password is not matched.', HiTeak.HITEAK_ALERT_LEVEL_ERROR);
                    }else{
                        formData.login = {
                            userName    : formData.email,
                            password    : formData.password
                        };
                        $.postJSON('request-sign-up', formData,
                            function(json){
                                HiTeak.showDialog('Confirm', 'Thanks for requesting our catalog.', HiTeak.HITEAK_ALERT_LEVEL_SUCCESS, 'Close', goToHomePage);
                            }
                        )
                    }
                }
            }
        }
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
    $('#viewLoginBtn').click(function(){
        setupLoginView('login');
    });
    $('#forgotPwdBtn').click(function(){
        setupLoginView('forgot');
    });
    $('#signUpBtn').click(function(){
        setupLoginView('signup');
    });
    var setupLoginView = function(action){
        var loginView = $('#loginView');
        loginView.find('.input-group[action*=' + action + ']').css('display', 'table');
        loginView.find('.input-group:not([action*=' + action + ']').css('display', 'none');
        loginView.attr('action', action);
        loginView.find('.input-group').removeClass('has-error');
        loginView.find('input[type=text]').val('');
        loginView.find('input[type=password]').val('');
        loginView.find('.login-footer [action=' + action + ']').css('display', 'none');
        loginView.find('.login-footer [action!=' + action + ']').css('display', 'inline-block');
        if(action == 'forgot'){
            loginView.find('.login-footer span[action=login]').css('display', 'none');
        }
    };

    $('.edit-entity').click(function(){
        var cmp     = $(this),
            entity  = cmp.attr('edit-entity');
        if(entity == 'slides'){
            doEditSlides();
        }
    });

    var doEditSlides = function(){
        var slideView       = $('.carousel-inner'),
            images          = slideView.find('img'),
            editSlideView   = $('#editSlideView'),
            imgList         = editSlideView.find('.slide-list'),
            imgPreview      = editSlideView.find('.slide-preview'),
            imgListStr      = '<table class="table table-striped">';
        for(var i=0; i<10; i++){
            var img = i < images.length ? $(images[i]) : null;
            imgListStr += '<tr order="' + (i+1) + '"';
            if(img){
                imgListStr += ' imageId="' + img.attr('imageId') + '"';
                imgListStr += ' imageSrc="' + img.attr('src') + '"';
                imgListStr += '>';
                imgListStr += '<td class="img-slide pointer">Slide ' + (i+1) + '</td>';
                imgListStr += '<td style="text-align: right;"><span class="glyphicon glyphicon-minus pointer padding-right-10 remove-img"/>';
            }else{
                imgListStr += '><td class="img-slide">' + (i+1) + '</td>';
                imgListStr += '<td style="text-align: right;"><span class="glyphicon glyphicon-minus pointer padding-right-10 remove-img" style="display: none;"/>';
            }

            imgListStr += '<input id="input-' + (i+1) + '" type="file" class="file" style="display: none;" accept="image/*"/>';
            imgListStr += '<span class="glyphicon glyphicon-folder-open pointer browse-file"/></td></tr>';
        }
        imgListStr += '</table>';
        imgPreview.attr('src', '');
        imgList.html(imgListStr);
        editSlideView.modal();
    };

    $('.img-slide').live('click',function(){
        var cmp             = $(this),
            tr              = cmp.parents('tr'),
            editSlideView   = $('#editSlideView'),
            imgPreview      = editSlideView.find('.slide-preview'),
            imgSrc          = tr.attr('imageSrc');
        if(imgSrc){
            imgPreview.attr('src', imgSrc);
        }
    });
    $('.browse-file').live('click', function(){
        var cmp         = $(this),
            parentCmp   = cmp.parents('tr'),
            fileInput   = parentCmp.find('input[type=file]');
        fileInput.trigger('click');
    });
    var maxFileSize = 1024 * 1024 * 1024 * 10;  //10MB
    $('#editSlideView input[type=file]').live('change', function(){
        var cmp         = $(this),
            row         = cmp.parents('tr'),
            rowInfo     = row.find('.img-slide'),
            modalBody   = cmp.parents('.modal-body'),
            previewDiv  = modalBody.find('.preview-div'),
            img         = modalBody.find('img'),
            file        = this.files[0];
        if(file){
            if(file.size <= maxFileSize){
                var reader = new FileReader();
                reader.onload = (function(aImg) { return function(e) {
                    aImg.attr('src', e.target.result);
                    rowInfo.addClass('pointer').text('Slide ' + row.attr('order'));
                    row.attr('imageSrc', e.target.result).find('.remove-img').css('display', 'inline-block');
                }; })(img);
                reader.readAsDataURL(file);
            }else{
                HiTeak.showDialog('Error', 'Image is larger than 10MB.', HiTeak.HITEAK_ALERT_LEVEL_ERROR);
            }
        }
    });
    $('.remove-img').live('click', function(){
        var cmp         = $(this),
            row         = cmp.parents('tr'),
            rowInfo     = row.find('.img-slide')
            editView    = $('#editSlideView'),
            img         = editView.find('.slide-preview'),
            fileInput   = row.find('input[type=file]');
        row.removeAttr('imageSrc').find('.remove-img').css('display', 'none');
        rowInfo.removeClass('pointer').text(row.attr('order'));
        img.attr('src', '');
        fileInput.val('');
    });
    $('#saveImgSlideBtn').click(function(){
        var editSlideView   = $('#editSlideView'),
            imageList       = editSlideView.find('tr');
        editSlideView.find('.upload-image-progress').css('display', 'block');
        $(this).css('display', 'none');
        doSaveImageSlides(imageList.toArray());
    });
    var doSaveImageSlides = function(imageList){
        var imageType = $('#myCarousel').attr('carouselType');
        if(imageType && imageList && imageList.length > 0){
            var image   = $(imageList.shift()),
                src     = image.attr('imageSrc'),
                imageId = image.attr('imageId');
            if(src || imageId){
                $.postJSON('request-upload-img', {
                    imageId     : imageId,
                    imageData   : src,
                    imageType   : imageType
                }, function(json){
                    if(json.success){
                        doSaveImageSlides(imageList);
                    }
                });
            }else{
                doSaveImageSlides(imageList);
            }
        }else{
            location.href = location.href;
        }
    };

});
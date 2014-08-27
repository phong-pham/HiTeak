$(document).ready(function() {
    if($('body').tooltip){
        $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
    }

    var canEditPhoneNumber          = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_EDIT_PHONE_NUMBER'),
        canUpdateReasonResolution   = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_EDIT_REASON_RESOLUTION'),
        canEditFacility             = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_EDIT_FACILITY');
    canEditPhoneNumber = canEditPhoneNumber == 'true' || canEditPhoneNumber == true;
    canUpdateReasonResolution = canUpdateReasonResolution == 'true' || canUpdateReasonResolution == true;
    canEditFacility = canEditFacility == 'true' || canEditFacility == true;

    /********************************************************************************************************************************************
                        BEGIN EDITING FACILITY MESSAGE
    **********************************************************************************************************************************************/
    if($('#editor1').length > 0){
        var editor = CKEDITOR.replace( 'editor1',
                    {
                        resize_enabled: false,
                        toolbar:[

                            { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript' ] },
                            { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] }
                        ]
                    });
    }

    $('#searchFacilityByIDBtn').click(function(){
        var fid         = $('#facilityIdInput').val(),
            errorMsg    = '';
        if(!fid){
            errorMsg = 'is required';
        }else if(!SBI.isNumeric(fid)){
            errorMsg = 'is invalid';
        }
        SBI.updateValidationComponent($('#facilityIdInput'), '.input-group', '.validation-cmp', errorMsg);

        if(!errorMsg){
            doSearchFacility(fid);
        }
        return false;
    });

    $('#updateFacilityMsgBtn').click(function(){
        var notes   = SBI.getCKEditorContents(),
            fid     = $('.facility-id-lbl').text();
        if(notes.length > 2000){
            SBI.showDialog('Error','Notes cannot be longer than 2,000 characters.', SBI.SBI_ALERT_LEVEL_ERROR);
        }else{
            $.postJSON(
                'facility-message-update/' + fid,
                {
                    message: notes
                },
                function(json){
                    console.log(json);
                    SBI.showDialog(json.success? 'Message' : 'Error',json.message, json.success ? SBI.SBI_ALERT_LEVEL_SUCCESS : SBI.SBI_ALERT_LEVEL_ERROR);
                }
            );
        }
    });

    var doSearchFacility = function(facilityId){
        $.getJSON(
            'facility.json',
            {
                uuid            : 'abc123',
                facilityId      : facilityId,
                employeeNumber  : 102029
            },
            function(json) {
                if(json.success ==  false){
                    showDialog('Error',json.message, SBI.SBI_ALERT_LEVEL_ERROR);
                }else{
                    if(!json.count){
                        SBI.showDialog('Message', 'No facility found with ID ' + facilityId, SBI.SBI_ALERT_LEVEL_WARNING);
                    }else{
                        doPopulateFacilityMessageEdit(json);
                    }
                }
            }
        );
    };

    var officeMapURL = 'http://www.brightnow.com/locations/dental-office/office/office/$FACILITY_ID/map';

    var doPopulateFacilityMessageEdit = function(json){
        var data = json.data || {}
        $('#facilityEditNotePanel').css("display", "block");
        $('.facility-id-lbl').text(data.facilityId || '');
        $('.facility-name-lbl').text(data.name || '');
        $('.facility-map-url')[0].href = officeMapURL.replace(/\$FACILITY_ID/g, data.facilityId);
        $('.facility-address-lbl').text(data.fullAddress || '');
        $('.facility-address-description-lbl').text(data.addressDescription || '');
        $('.facility-phone-lbl').text(SBI.formatPhoneNumber(data.phoneNumber) || '');
        $('.facility-fax-lbl').text(SBI.formatPhoneNumber(data.faxNumber) || '');
        SBI.setCKEditorContents(data.message);
    }

    /********************************************************************************************************************************************
                            END EDITING FACILITY MESSAGE
    **********************************************************************************************************************************************/

    /********************************************************************************************************************************************
                            BEGIN EDITING PHONE NUMBER
    **********************************************************************************************************************************************/
    $('input').change(function(){
        var cmp         = $(this),
            cmpEl       = this,
            value       = cmp.val(),
            errorMsg    = '';
        if(cmpEl.type == 'checkbox'){
            value = cmpEl.checked;
        }
        if(cmp.hasClass('required') && !value){
            errorMsg = 'is required';
        }else if(value){
            if((cmpEl.getAttribute('data-type') == 'number' && !SBI.isNumeric(value))
                || (cmpEl.getAttribute('length') && cmpEl.getAttribute('length').split(',').indexOf(value.length.toString()) == -1)
                || (cmpEl.getAttribute('maxLength') && +cmpEl.getAttribute('maxLength') < value.length)
                || (cmpEl.getAttribute('minLength') && +cmpEl.getAttribute('minLength') > value.length)){
                errorMsg = 'is invalid';
            }
        }
        SBI.updateValidationComponent(cmp, '.form-group', '.validation-cmp', errorMsg);
    });

    $('#searchPhoneNumberBtn').click(function(){
        var phoneNumber = $('#searchPhoneNumberInput').val(),
            errorMsg    = '';
        if(!phoneNumber){
            errorMsg = 'is required';
        }else if(!SBI.isNumeric(phoneNumber) || (phoneNumber.length < 4)){
            errorMsg = 'is invalid';
        }
        SBI.updateValidationComponent($('#searchPhoneNumberInput'), '.input-group', '.validation-cmp', errorMsg);
        if(!errorMsg){
            doSearchPhoneNumber(phoneNumber);
        }
        return false;
    });
    $('#addPhoneNumberBtn').click(function(){
        doUpdateViewForAction('new');
        doPopulatePhoneForm({});
        return false;
    });

    var doSearchPhoneNumber = function(phoneNumber){
        $.getJSON(
            'phone-number/' + phoneNumber,
            '',
            function(json){
                console.log(json);
                if(json.success){
                    if(json.count == 0){
                        SBI.showDialog('Message', 'No phone number found for ' + phoneNumber, SBI.SBI_ALERT_LEVEL_WARNING);
                    }else{
                        doUpdateViewForAction('update');
                        doPopulatePhoneForm(json);
                    }
                }else{
                    SBI.showDialog('Error', json.message || 'Error occurred when search phone number ' + phoneNumber, SBI.SBI_ALERT_LEVEL_ERROR);
                }
            }
        )
    };

    var doUpdateViewForAction = function(action){
        if(action == 'new'){
            $('#phoneNumberAction').find('.panel-title').html('Add New Phone Number');
            $('#phoneNumberAction').removeClass('panel-default panel-primary').addClass('panel-success');
            $('#phoneNumberInput').css('display', 'block');
            $('#phoneNumberLbl').css('display', 'none');
            $('#updatePhoneNumberBtn').html('Save New Phone Number');
            $('#inactivatePhoneNumberBtn').css('display', 'none');
        }else if(action == 'update'){
            $('#phoneNumberAction').find('.panel-title').html('Update Existing Phone Number');
            $('#phoneNumberAction').removeClass('panel-default panel-success').addClass('panel-primary');
            $('#phoneNumberInput').css('display', 'none');
            $('#phoneNumberLbl').css('display', 'block');
            $('#updatePhoneNumberBtn').html('Update Phone Number');
            $('#inactivatePhoneNumberBtn').css('display', 'inline-block');
        }
    };

    var doPopulatePhoneForm = function(json){
        var data        = json.data || {},
            formPanel   = $('#phoneNumberAction'),
            form        = $('#phoneNumberDetailForm'),
            isActive    = json ? (SBI.isEmpty(data) || data.active) : true;
        if(form){
            formPanel.css('display', 'block');
            SBI.doPopulateForm(data, form);
            if(isActive){
                formPanel.find('input').removeAttr('disabled');
                formPanel.find('select').removeAttr('disabled');
                formPanel.find('button').removeAttr('disabled');
            }else{
                formPanel.find('input').attr('disabled', 'disabled');
                formPanel.find('select').attr('disabled', 'disabled');
                formPanel.find('button').attr('disabled', 'disabled');
            }
        }
    };

    $('#phoneTypeOptions').change(function(){
        var cmp             = $(this),
            phoneType       = cmp.val(),
            campaignName    = $('#campaignNameInput').parents('.form-group'),
            facilityInfo    = $('#facilityNameLbl').parents('.form-group');
        campaignName.css('display', phoneType == 'CM' ? 'block' : 'none');
        facilityInfo.css('display', phoneType == 'ML' ? 'block' : 'none');
    });

    $('#editFacilityBtn').click(function(){
        $('#facilitySearchById').modal();
    });
    $('#fsInput').keyup(function(event){
        var facilityId  = this.value,
            keyValue    = event.keyCode,
            displayList = $('#facilitySearchByZipCode #display_list')[0];
        if(keyValue == 27){ //ESCAPE
            return;
        }else if(keyValue == 40){   //DOWN
        }else if(facilityId.length == 5 && SBI.isNumeric(facilityId)){
            setFoundFacilityInfo();
            $.getJSON(
                'facility.json',
                {
                    uuid            : 'abc123',
                    facilityId      : facilityId,
                    employeeNumber  : 102029
                },
                function(json) {
                    if(json.success ==  false){
                        showDialog('Error',json.message, SBI.SBI_ALERT_LEVEL_ERROR);
                    }else{
                        if(!json.count){
                            SBI.showDialog('Message', 'No facility found with ID ' + facilityId, SBI.SBI_ALERT_LEVEL_WARNING);
                        }else{
                            setFoundFacilityInfo(json.data);
                        }
                    }
                }
            );
        }
    });
    var setFoundFacilityInfo = function(facility){
        $('#foundFacilityNameLbl').html(facility ? (facility.name + ' (' + facility.facilityId + ')') : 'No Record')
        $('#foundFacilityAddressLbl').html(facility ? facility.fullAddress : '');
        $('#foundFacilityIdLbl').html(facility ? facility.facilityId : '');
    };

    $('#setOfficeBtn').click(function(){
        if($('#foundFacilityIdLbl').html()){
            var facilityId = $('#foundFacilityIdLbl').html();
            $.getJSON(
                'phone-number/facility-check',
                {
                    facilityId: facilityId
                },
                function(json){
                    if(json.count == 0){
                        doSetOfficeToPhoneNumber();
                    }else{
                        SBI.showDialog('Warning', 'Facility ' + facilityId + ' already has phone number assigned. Would you like to assign another phone number to it?'
                                        , SBI.SBI_ALERT_LEVEL_WARNING, 'No', null, 'Yes', doSetOfficeToPhoneNumber);
                    }
                }
            );
        }else{
            SBI.showDialog('Error', 'Please select facility.', SBI.SBI_ALERT_LEVEL_ERROR);
        }
    });

    var doSetOfficeToPhoneNumber = function(){
        $('#facilityNameLbl').html($('#foundFacilityNameLbl').html());
        $('#facilityAddressLbl').html($('#foundFacilityAddressLbl').html());
        $('#facilityIdLbl').html($('#foundFacilityIdLbl').html());
        $('#facilitySearchById').modal('hide');
    };

    var doPersistPhoneNumber = function(){
        var phoneNumber = SBI.doRetrieveDataFromForm($('#phoneNumberDetailForm')),
            action      =  '';
        if(phoneNumber.phoneType != 'CM'){
            phoneNumber.campaignName = null;
        }else if(phoneNumber.phoneType != 'ML'){
            phoneNumber.facilityId = null;
        }
        if($('#phoneNumberInput').css('display') != 'none'){
            action = 'add';
            phoneNumber.phoneNumber = $('#phoneNumberInput').val();
        }else{
            action = 'update';
            phoneNumber.phoneNumber = $('#phoneNumberLbl').html();
        }
        phoneNumber.active = true;
        console.log('about to update/add phone number: %o', phoneNumber);
        $('#updatePhoneNumberBtn').attr('disabled', 'disabled')
        $.postJSON(
            'phone-number-persist/' + phoneNumber.phoneNumber + '?action=' + action,
             phoneNumber,
             function(json){
                $('#updatePhoneNumberBtn').removeAttr('disabled')
                if(json.success){
                    doUpdateViewForAction('update');
                    doPopulatePhoneForm(json);
                    SBI.showDialog('Message', 'Successfully ' + action + ' phone number ' + SBI.formatPhoneNumber(phoneNumber.phoneNumber) + '.', SBI.SBI_ALERT_LEVEL_MESSAGE);
                }else{
                    SBI.showDialog('Error', json.message || ('Fail to ' + action + ' phone number ' + SBI.formatPhoneNumber(phoneNumber.phoneNumber)), SBI.SBI_ALERT_LEVEL_ERROR);
                }
             }
        );
    };

    $('#updatePhoneNumberBtn').click(function(){
        var hasError = false;
        $('.has-error').each(function(){
            if($(this).css('display') != 'none'){
                hasError = true;
                return false;
            }
        });
        if(hasError){
            SBI.showDialog('Error', 'Form is invalid.', SBI.SBI_ALERT_LEVEL_ERROR);
        }else{
            var phoneType   = $('#phoneTypeOptions').val(),
                facilityId  = $('#facilityIdLbl').html() || 0,
                campaignName    = $('#campaignNameInput').val();
            if(phoneType == 'ML' && !facilityId){
                SBI.showDialog('Error', 'Main line phone number is required facility.', SBI.SBI_ALERT_LEVEL_ERROR);
            }else{
                var action      = $('#phoneNumberInput').css('display') != 'none' ? 'add' : 'update',
                    phoneNumber = action == 'add' ? $('#phoneNumberInput').val() : $('#phoneNumberLbl').html();
                SBI.showDialog('Confirm', 'Are you sure you would like to ' + action + ' phone number ' + SBI.formatPhoneNumber(phoneNumber) + '?', SBI.SBI_ALERT_LEVEL_MESSAGE, 'No', null, 'Yes', doPersistPhoneNumber)
            }
        }
    });

    $('#inactivatePhoneNumberBtn').click(function(){
        SBI.showDialog('Warning', 'Are you sure you would like to inactivate phone number ' + SBI.formatPhoneNumber($('#phoneNumberLbl').html()) + '?', SBI.SBI_ALERT_LEVEL_WARNING, 'No', null, 'Yes', doInactivatePhoneNumber);
    });

    var doInactivatePhoneNumber = function (){
        var employeeNumber  = SBI.getCookies('APPTRACKER','EMPLOYEE_NUMBER'),
            phoneNumber     = $('#phoneNumberLbl').html();
        $(this).attr('disabled', 'disabled');
        $('#alertInfo').modal('hide');
        $.getJSON(
            'phone-number/inactivate/' + phoneNumber,
            {
                employeeNumber: employeeNumber
            },
            function(json){
                $(this).removeAttr('disabled');
                if(json.success){
                    doPopulatePhoneForm({});
                    $('#phoneNumberAction').css('display', 'none');
                }else{
                    SBI.showDialog('Error', 'Fail to inactivate phone number ' + SBI.formatPhoneNumber(phoneNumber) + '.', SBI.SBI_ALERT_LEVEL_ERROR);
                }
            }
        );
    }
    if(location.pathname && location.pathname.indexOf('phoneNumberEdit') != -1){
        var search      = location.search.charAt(0) == '?' ? location.search.substr(1) : location.search,
            queries     = search.split('&'),
            phoneNumber = '';
        for(var i=0; i<queries.length ; i++){
            if(queries[i] && queries[i].indexOf('phoneNumber=') != -1){
                phoneNumber = queries[i].substr(12);
                break;
            }
        }
        if(phoneNumber && SBI.isNumeric(phoneNumber)){
            $('#searchPhoneNumberInput').val(phoneNumber);
            $('#searchPhoneNumberBtn').triggerHandler('click');
        }
    }

    var editNumberIcons = $('.glyphicon.edit-phoneNumber');
    if(editNumberIcons.length > 0 && !canEditPhoneNumber){
        editNumberIcons.detach();
    }

    /********************************************************************************************************************************************
                                END EDITING PHONE NUMBER
    **********************************************************************************************************************************************/

    /********************************************************************************************************************************************
                                BEGIN EDITING REASON/RESOLUTION
    **********************************************************************************************************************************************/

    var actionOnCodeDetail = 'update';
    $('body').on('click', '.edit-code', function(){
        var form    = $('#reasonResolutionDetail').find('form'),
            cmp     = $(this),
            tr      = cmp.parents('tr'),
            tds     = tr.find('td[name]'),
            data    = {};
        if(form.length > 0 && tds.length > 0){
            for(var i=0; i<tds.length; i++){
                data[tds[i].getAttribute('name')] = tds[i].getAttribute('value');
            }
            SBI.doPopulateForm(data, form);
            $('#codeLbl').html(data.code);
        }
        actionOnCodeDetail = 'update';
        $('#reasonResolutionModalLabel').html('Update Reason/Resolution');
        $('#codeInput').css('display', 'none');
        $('#codeLbl').css('display', 'block');

        $('#reasonResolutionDetail').modal();
    });

    $('.add-code').click(function(){
        actionOnCodeDetail = 'add';
        $('#reasonResolutionModalLabel').html('Add New Reason/Resolution');
        $('#codeLbl').css('display', 'none');
        $('#codeInput').css('display', 'block');
        var form    = $('#reasonResolutionDetail').find('form'),
            data    = {
                isActive        : true,
                isReason        : false,
                isResolution    : false
            };
        if(form.length > 0){
            SBI.doPopulateForm(data, form);
        }
        $('#reasonResolutionDetail').modal();
    });

    $('#saveReasonResolutionDetailBtn').click(function(){
        var cmp         = $(this),
            form        = $('#reasonResolutionDetail').find('form'),
            isValid     = true,
            hasError    = form.find('.has-error'),
            data        = {};
        if(hasError.length > 0){
            for(var i=0; i<hasError.length; i++){
                if($(hasError[i]).css('display') != 'none'){
                    isValid = false;
                    break;
                }
            }
        }
        if(!isValid){
            SBI.showDialog('Error', 'Form is not valid.', SBI.SBI_ALERT_LEVEL_ERROR);
        }else{
            data = SBI.doRetrieveDataFromForm(form);
            if(data){
                if(!data.isReason && !data.isResolution){
                    SBI.showDialog('Error', 'Please select at least Reason or Resolution.', SBI.SBI_ALERT_LEVEL_ERROR);
                }else if(actionOnCodeDetail == 'add' && $('td[name=code][value="' + data.code + '"]').length > 0){
                    SBI.showDialog('Error', 'Code ' + data.code + ' already exists.', SBI.SBI_ALERT_LEVEL_ERROR);
                }else{
                    cmp.attr('disabled', 'disabled');
                    doSaveReasonResolutionCode(data, cmp);
                }
            }else{
                SBI.showDialog('Error', 'Cannot retrieve data from form.', SBI.SBI_ALERT_LEVEL_ERROR);
            }
        }
    });

    var doSaveReasonResolutionCode = function(data, saveBtb){
        $.postJSON(
            'reason-resolution-code/' + data.code + '?action=' + actionOnCodeDetail,
            data,
            function(json){
                saveBtb.removeAttr('disabled');
                if(json.success){
                    location.href = location.href;
                }else{
                    SBI.showDialog('Error', json.message, SBI.SBI_ALERT_LEVEL_ERROR);
                }
            }
        );
    };

    /********************************************************************************************************************************************
                                END EDITING REASON/RESOLUTION
    **********************************************************************************************************************************************/
    var syncing = false;
    $('#mongoSyncLink').click(function(){
        if(!syncing){
            SBI.showDialog('Warning', 'Are you sure you would like to rebuild mongo data for Facility information?', SBI.SBI_ALERT_LEVEL_WARNING, 'No', null, 'Yes', doMongoSync);
        }
        return false;
    });

    var doMongoSync = function(){
        syncing = true;
        $('#syncProgress').css('display', 'block');
        $.getJSON(
            'secure/mongo-sync',
            '',
            function(json){
                syncing = false;
                $('#syncProgress').css('display', 'none');
                if(json.success){
                    SBI.showDialog('Message', 'Successfully rebuild mongo data for Facility information', SBI.SBI_ALERT_LEVEL_MESSAGE);
                }else{
                    SBI.showDialog('Error', 'Fail to rebuild mongo data for Facility information', SBI.SBI_ALERT_LEVEL_ERROR);
                }
            }
        );
    }
})
$(document).ready(function() {

    var uuid = $('#uuid').val();
    var agentId = $('#employeeNumber').val();
    var language = $('#language').val();
    var menuOptions = $('#numberPress').val();
    var screenType = $('#screenType').val();



    var alreadySetResolution = false;
    var routeToDifferentScreen = false;
    var updateCsrCall = false;

    if(screenType == 'csr'){
        if(menuOptions > 0 && menuOptions < 6){
            $('#csrMenuSelection').val(menuOptions);
        }
        if($('#reasonCode').val()){
            $('#reasonInput').val($('#reasonCode').val());
        }
        if($('#resolutionCode').val()){
            alreadySetResolution = true;
            $('#resolutionInput').val($('#resolutionCode').val());
        }
    }else if($('#targetFacilityId') && $('#targetFacilityId').length && !$('#targetFacilityId').val()){
        $('#facilitySearchByZipCode').modal();
    }

    $('#zipCodeSearchBtn').click(function(){
        $('#facilitySearchByZipCode').modal();
    });
    $('#facilitySearchByZipCode').on('shown.bs.modal', function(evt){
        $('#fsbzInput').focus();
    });

    $('#facilitySearchByZipCode #display_list').keyup(function(event){
        var keyCode         = event.keyCode,
            list            = $(this),
            items           = list.find('.list-group-item'),
            selectedItem    = list.find('.list-group-item-info')[0],
            selectedIdx     = items.index(selectedItem),
            nextIdx         = -1,
            screenType      = $('#screenType').val();
        if(keyCode == 13){          //ENTER
            doSelectOfficeFromSearch(selectedItem);
        }else if(keyCode == 32 && screenType == 'csr'){
            var selectedCB = $(selectedItem).find('.office-selected')[0];
            if(selectedCB && selectedCB.checked){
                selectedCB.checked = false;
            }else if(selectedCB){
                var cbs = list.find('.office-selected');
                for(var i=0; i<cbs.length; i++){
                    cbs[i].checked = false;
                }
                selectedCB.checked = true;
            }
        }else if(keyCode == 38      //ARROW_UP
                || keyCode == 40){  //ARROW_DOWN
            if(selectedIdx == -1){
                nextIdx = 0;
            }else{
                if(selectedIdx == 0){
                    nextIdx = keyCode == 38 ? items.length -1 : selectedIdx + 1;
                }else if(selectedIdx == (items.length -1)){
                    nextIdx = keyCode == 38 ? selectedIdx - 1 : 0;
                }else{
                    nextIdx = keyCode == 38 ? selectedIdx - 1 : selectedIdx + 1;
                }
            }
            if(nextIdx != -1 && nextIdx < items.length){
                $(selectedItem).removeClass('list-group-item-info');
                var nextItem = $(items[nextIdx]);
                nextItem.focus();
                nextItem.addClass('list-group-item-info');
            }
        }
    });

    $('#fsbzInput').keyup(function(event){
        var value       = this.value,
            keyValue    = event.keyCode,
            displayList = $('#facilitySearchByZipCode #display_list')[0],
            position    = displayList.getAttribute('display-position');
        if((keyValue == 40 && position == 'bottom')         //ARROW DOWN
            || (keyValue == 39 && position == 'right')){   //ARROW RIGHT
            var officeDetail = $(displayList).find('.list-group-item')[0];
            if(officeDetail){
                officeDetail.focus();
                $('#facilitySearchByZipCode #display_list .list-group-item').removeClass('list-group-item-info');
                $(officeDetail).addClass('list-group-item-info');
            }
        }else if(SBI.isNumeric(value) && value.trim().length == 5){
            $.getJSON(
                '/callcenter/closest-facilities.json',
                {
                    zip             : value,
                    uuid            : uuid,
                    employeeNumber  : agentId
                },
                function(json){
                    if(json.success){
                        var list                = json.data,
                            targetFacilityId    = $('#targetFacilityId').val(),
                            result              = '',
                            screenType          = $('#screenType').val();
                        for(var i=0; i<list.length; i++){
                            var office          = list[i],
                                isCurrentTarget = office.facilityId == targetFacilityId;
                            result += '<a href="#" class="list-group-item" value="' + office.facilityId + '" style="padding: 5px 15px;"><div>';
                            result += '<span class="fl">Site name:</span><span class="content fr title">' + office.name + ' (' + office.facilityId + ')</span><br/>';
                            result += '<span class="fl">  Address:</span><span class="content fr">' + office.fullAddress;
                            if(screenType == 'csr'){
                                result += '<input type="checkbox" class="office-selected fr" facilityId="' + office.facilityId + '"/>';
                            }else{
                                result += (isCurrentTarget ? '<span class="glyphicon glyphicon-star fr current-facility-cls"/>' : '');
                            }
                            result += '</span><br/>';
                            result += '<span class="fl"> Distance:</span><span class="content fr phone-sp">' + office.distance + ' miles (' + $.trim(office.travelTime)+ ' minutes)</span><br/>';
                            result += '</div></a>';
                        }
                        $('#facilitySearchByZipCode #display_list').html(result);
                        registerOfficeDetailClickFromSearch();
                    }else{
                        alert(json.message);
                    }
                }
            );
        }else{
            $('#facilitySearchByZipCode #display_list').html('');
        }
    });

    var registerOfficeDetailClickFromSearch = function(){
        $('#facilitySearchByZipCode #display_list .current-facility-cls').tooltip({title: 'Current Facility', placement: 'bottom'});
        $('#facilitySearchByZipCode #display_list .list-group-item').dblclick(function(){
            doSelectOfficeFromSearch(this);
        });

        $('#facilitySearchByZipCode #display_list .list-group-item').click(function(){
            $('#facilitySearchByZipCode #display_list .list-group-item').removeClass('list-group-item-info');
            $(this).addClass('list-group-item-info');
        });
    };

    $('#facilitySearchByZipCode #setOfficeBtn').click(function(){
        var selectedOffice = $('#facilitySearchByZipCode #display_list .list-group-item-info')[0];
        doSelectOfficeFromSearch(selectedOffice);
    });

    var doSelectOfficeFromSearch = function(selectedOffice){
        if(selectedOffice){
            var screenType = $('#screenType').val();
            if(screenType == 'csr'){
            }else{
                var facilityId = selectedOffice.getAttribute('value');
                if(facilityId){
                    var hrefArr = location.href.split('/');
                    hrefArr[hrefArr.length - 1] = facilityId;
                    routeToDifferentScreen = true;
                    location.href = hrefArr.join('/');
                }
            }
        }
    };

    $('.extra-info-cls').click(function(){
        var cmp = $(this),
            patientId   = 0,
            phoneNumber = $('#appointmentPhone').val(),
            facilityId  = $('#targetFacilityId').val(),
            popTitle    = '';
        if(cmp.hasClass('patient')){
            console.log('load extra patient using phone number %o', $('#appointmentPhone').val());
            popTitle = 'Patient Appointments associated with phone number ' +  SBI.formatPhoneNumber($('#appointmentPhone').val());
        }else if(cmp.hasClass('appointment')){
            console.log('load extra appointment for patient %o', $('#foundPatientId').val());
            popTitle = 'Additional Appointments for patient ' + $('#patientName').val();
            patientId = $('#foundPatientId').val()
        }
        $.getJSON(
            '/callcenter/appointment-search.json',
            {
                patientId   : patientId,
                phoneNumber : phoneNumber,
                facilityId  : facilityId,
            },
            function(json){
                if(json.success){
                    var list    = json.data,
                        result  = '';
                    for(var i=0; i<list.length; i++){
                        var appointment = list[i];
                        result += "<a href='#' class='list-group-item' style='padding: 5px 15px;'><div>";
                        result += "<span class='fl'>Patient:</span><span class='content fr title'>" + appointment.patient.patientFullName + " (" + appointment.patient.dateOfBirth + ")</span><br/>";
                        result += "<span class='fl'>  Appointment:</span><span class='content fr'>" + appointment.formattedDateTime + " at "+ appointment.facility.name +"</span><br/>";
                        result += "</div></a>";
                    }
                    $('#appointmentSearch #appointment-display_list').html(result);
                    $('#appointmentSearchModalLabel').text(popTitle);
                    $('#appointmentSearch').modal();
                }
            }
        );
    });

    $('#libSchedulerBtn').click(function(){
        var schedulerUrl        = $('#schedulerUrl').val();
        if(schedulerUrl){
            window.open(schedulerUrl);
        }
    });

    if($('#zipCode').val() && $('#fsbzInput').length > 0){
        $('#fsbzInput').val($('#zipCode').val());
        $('#fsbzInput').triggerHandler('keyup');
    }

    /********************************************************************************************************************************************
                    BEGIN CALL DETAIL LOGIC
    **********************************************************************************************************************************************/

    var needToLoadAgentCall = true;
    var facilityIdSelect = $('#facilityIDs');
    SBI.facilityIdsList = [];
    if(facilityIdSelect.length > 0){
        var facIds = facilityIdSelect.find('option');
        for(var i=0; i<facIds.length; i++){
            SBI.facilityIdsList.push(facIds[i].value);
        };
        facilityIdSelect.remove();
    }

    $('#callDetailsBtn').click(function(){
        if(needToLoadAgentCall){
            needToLoadAgentCall = false;
            $.getJSON(
                '/callcenter/get-agent-call',
                {
                    uuid    : uuid
                },
                function(json){
                    var forms = $('#patientInfoBody').find('.patient-info-form');
                    for(var i=0; i<forms.length; i++){
                        $(forms[i]).remove();
                    }
                    doOpenCallDetail(json);
                }
            );
        }else{
            doOpenCallDetail(null);
        }
    });

    var getAgentCallDetailForEmployee = function(json){
        var data    = {
                patients    : []
            };
        if(agentId && json && json.data){
            data.ani = json.data.ani;
            if(json.data.loadedEmployees){
                for(var i=json.data.loadedEmployees.length - 1; i >= 0; i--){
                    var employee = json.data.loadedEmployees[i];
                    if(employee.employeeNumber == agentId && employee.screenType == screenType){
                        data.reasonCode = employee.reasonCode;
                        data.resolutionCode = employee.resolutionCode;
                        if(employee.resolutionDate){
                            data.resolutionDateTime = employee.resolutionDate;
                            //RESOLUTION TIME IS FORMATTED AS HH:MM:SS
                            data.resolutionDateTime += ' ' + employee.resolutionTime.substr(0,2) + ':' + employee.resolutionTime.substr(2,2) + ':' + employee.resolutionTime.substr(4,2);
                        }
                        data.employeeNumber = agentId;
                        break;
                    }
                }
            }
            if(json.data.patients){
                for(var i=0; i<json.data.patients.length; i++){
                    if(json.data.patients[i].empEntered == agentId){
                        data.patients.push(json.data.patients[i]);
                    }
                }
            }
        }
        return data;

    };

    var doOpenCallDetail = function(json){
        var data            = getAgentCallDetailForEmployee(json),
            aniValue        = data.ani || $('#ani').val(),
            reason          = data.reasonCode || 'NONE',
            resolution      = data.resolutionCode || 'NONE',
            lastUpdatedEmp  = data.employeeNumber || 0,
            lastUpdatedDate = data.resolutionDateTime ? data.resolutionDateTime : '',
            popupTitle      = 'Set Call Detail';

        if(aniValue && !$('#aniInput').val()){
            $('#aniInput').val(aniValue);
            $('#aniInput').triggerHandler('change');
        }
        if(reason != 'NONE'){
            $('#reasonInput').val(reason);
        }
        if(resolution != 'NONE'){
            $('#resolutionInput').val(resolution);
        }
        if(lastUpdatedDate){
            popupTitle += ' <small>(Last Updated on ' + lastUpdatedDate + ' by ' + lastUpdatedEmp + ')</small>';
        }
        if(json){
            $('#callDetailModalLabel')[0].innerHTML = popupTitle;
        }

        $('#callDetail').modal();
        if(screenType != 'csr'){
            var body = $('#patientInfoBody');
            if(data.patients && data.patients.length > 0){
                for(var i=0; i<data.patients.length; i++){
                    SBI.addPatientForm(data.patients[i], body, i>0);
                }
            }else if(body && body.children().length == 0){
                SBI.addPatientForm(null, body, false);
            }
        }
    };

    $('.form-control.required').change(function(){
        var cmp         = $(this),
            parent      = cmp.parents('.form-group'),
            errorMsg    = '',
            value       = cmp.val();
        if(value){
            if((this.getAttribute('data-type') == 'number' && !SBI.isNumeric(cmp.val()))
                || (this.getAttribute('length') && this.getAttribute('length') != value.length)
                || (this.getAttribute('maxLength') && this.get('maxLength') < value.length)
                || (this.getAttribute('minLength') && this.get('minLength') > value.length)){
                errorMsg = 'is invalid';
            }
        }else{
            errorMsg = 'is required';
        }
        SBI.updateValidationComponent(cmp, '.form-group', '.validation-cmp', errorMsg);
    });

    $('#addPatientInfoBtn').click(function(){
        var body = $('#patientInfoBody');
        SBI.addPatientForm(null, body, true);
    });

    $('#saveCallDetailBtn').click(function(){
        var callDetailView  = $('#callDetail'),
            aniInput        = $('#aniInput'),
            reasonInput     = $('#reasonInput'),
            resolutionInput = $('#resolutionInput'),
            patientInfoBody = $('#patientInfoBody'),
            forms           = patientInfoBody.find('.patient-info-form'),
            isFormValid     = callDetailView.find('.has-error').length == 0,
            screenType      = $('#screenType').val(),
            csrPatientId    = null,
            callDetail      = {},
            patients        = [];
        console.log('is form valid: %o', isFormValid);
        if(screenType == 'psr'){
            for(var i=0; i<forms.length; i++){
                var form = $(forms[i]),
                    patientIdInput  = $(form.find('.patient-id-input')[0]),
                    patientIdValue  = patientIdInput.val(),
                    facilityIdInput = $(form.find('.facility-id-input')[0]),
                    facilityId      = facilityIdInput.val(),
                    apptDate        = $(form.find('.patient-date-input')[0]),
                    date            = apptDate.datepicker('getDate'),
                    apptTimeHour    = $(form.find('.patient-appointment-hour')[0]),
                    apptTimeMinute  = $(form.find('.patient-appointment-minute')[0]),
                    apptTimeAmPm    = $(form.find('.patient-appointment-ampm')[0]);
                if(patientIdValue || facilityId){
                    patients.push({
                        sequence                : (i+1),
                        patientId               : patientIdValue,
                        facilityId              : facilityId,
                        nextAppointmentDateTime : SBI.formatDateTime(SBI.setTimeFromCmp(date, apptTimeHour.val(), apptTimeMinute.val(), apptTimeAmPm.val())),
                        patientLinkDateTime     : SBI.formatDateTime(new Date()),
                        emailCaptured           : form.find('.patient-email-captured')[0].checked,
                        insuranceWaiting        : form.find('.patient-insurance-waiting')[0].checked,
                        empEntered              : agentId
                    });
                }
            }
        }

        if(isFormValid){
            callDetail = {
                uuid                : uuid,
                currentFacilityId   : $('#targetFacilityId').val(),
                ani                 : aniInput.val(),
                patients            : patients,
                loadedEmployees     : [{
                    employeeNumber      : agentId,
                    screenType          : $('#screenType').val(),
                    reasonCode          : reasonInput.val(),
                    reasonDateTime      : SBI.formatDateTime(new Date()),
                    resolutionCode      : resolutionInput.val(),
                    resolutionDateTime  : SBI.formatDateTime(new Date()),
                }]
            };
            doUpdateCallDetail(callDetail);
        }
    });

    var doUpdateCallDetail = function(callDetail){
        $.postJSON(
            '/callcenter/update-call-detail',
             callDetail,
             function(json){
                if(json.success){
                    $('#callDetail').modal('hide');
                    alreadySetResolution = true;
                    needToLoadAgentCall = true;
                }
             }
        );
    };

    /********************************************************************************************************************************************
                        END CALL DETAIL LOGIC
    **********************************************************************************************************************************************/


    /********************************************************************************************************************************************
                        BEGIN CSR CALL ACTION
    **********************************************************************************************************************************************/

    var MESSAGE_OFFICE_SELECT = 1;
    var MESSAGE_TRANSFER_CALL = 2;
    var callInfoSelectedFacilityId = 0;

    $('#updateCallInfoBtn').click(function(){
        var btn             = $(this),
            numberPress     = $('#numberPress').val(),
            selectedOption  = $('#csrMenuSelection').val(),
            zipInput        = $('#fsbzInput').val(),
            displayList     = $('#display_list'),
            offices         = [],
            alertCmp        = $('#csrUpdateCallInfoAlert');
        callInfoSelectedFacilityId = $('#targetFacilityId').val();
        if(zipInput){
            offices = displayList.find('.office-selected');
            for(var i=0; i<offices.length; i++){
                if(offices[i].checked){
                    callInfoSelectedFacilityId = offices[i].getAttribute('facilityId');
                    break;
                }
            }
            if(!callInfoSelectedFacilityId){
                $(alertCmp.find('.modal-body')).html('<p>Would you like to select office?</p>');
                alertCmp[0].setAttribute('messageType', MESSAGE_OFFICE_SELECT);
                alertCmp.modal();
            }else{
                doUpdateCallInfo();
            }
        }else{
            doUpdateCallInfo();
        }
    });

    $('#csrUpdateCallInfoAlert_NoBtn').click(function(){
        var btn         = $(this),
            alertCmp    = $('#csrUpdateCallInfoAlert'),
            messageType = alertCmp[0].getAttribute('messageType');
        alertCmp.modal('hide');
        if(messageType == MESSAGE_OFFICE_SELECT){
            doUpdateCallInfo();
        }
    });

    $('#csrUpdateCallInfoAlert_YesBtn').click(function(){
        var btn         = $(this),
            alertCmp    = $('#csrUpdateCallInfoAlert'),
            messageType = alertCmp[0].getAttribute('messageType');
        alertCmp.modal('hide');
        if(messageType == MESSAGE_OFFICE_SELECT){

        }
    });

    var doUpdateCallInfo = function(){
        $.getJSON(
            '/callcenter/csr-call-update.json',
            {
                uuid            : uuid,
                menuNumberPress : $('#csrMenuSelection').val(),
                facilityId      : callInfoSelectedFacilityId,
            },
            function(json){
                if(json.success){
                    $.postJSON(
                        '/callcenter/update-call-detail',
                         {
                            uuid    : uuid,
                            loadedEmployees : [{
                                employeeNumber      : agentId,
                                screenType          : $('#screenType').val(),
                                reasonCode          : $('#reasonInput').val(),
                                reasonDateTime      : SBI.formatDateTime(new Date()),
                                resolutionCode      : $('#resolutionInput').val(),
                                resolutionDateTime  : SBI.formatDateTime(new Date()),
                            }]
                         },
                         function(json){
                            if(json.success){
                                alreadySetResolution = true;
                                updateCsrCall = true;
                                SBI.showDialog('Message', 'Successfully update call info.', SBI.SBI_ALERT_LEVEL_MESSAGE);
                            }
                         }
                    );
                }
            }
        );
    }

    /********************************************************************************************************************************************
                        END CSR CALL ACTION
    **********************************************************************************************************************************************/


    /********************************************************************************************************************************************
                        BEGIN UNLOAD PAGE
    **********************************************************************************************************************************************/
    window.onbeforeunload = function(e) {
        if(!alreadySetResolution && !routeToDifferentScreen && !updateCsrCall){
            $('#callDetailsBtn').triggerHandler('click');
            return false;
        }
    };
    window.onunload = function(e) {
        if(!routeToDifferentScreen){
            $.ajax({
                type    : 'GET',
                async   : false,
                url     : '/callcenter/unload-screen-pop',
                data    : {
                  uuid            : uuid,
                  employeeNumber  : $('#employeeNumber').val(),
                  screenType      : $('#screenType').val(),
                  unloadDateTime  : SBI.formatDateTime(new Date())
                }
            });
        }
    };
    $('.other-site').click(function(){
        routeToDifferentScreen = true;
    });
    /********************************************************************************************************************************************
                        END UNLOAD PAGE
    **********************************************************************************************************************************************/


})
$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

$('body').tooltip({ selector: '[data-toggle="tooltip"]' });

var SBI = function(){
    this.SBI_KEY_ARROW_UP = 38;
    this.SBI_KEY_ARROW_DOWN = 40;
    this.SBI_KEY_ENTER = 13;
    this.SBI_KEY_SPACE = 32;

    this.validatePatientID = function(pid){
        if(!(+(pid)) || $.trim(pid).length == 0){
            return 'is required';
        }else{
            pid = $.trim(pid);
            if(!this.isNumeric(pid)){
                return 'must be a number';
//            }else if(pid.charAt(pid.length - 1) != '0'){
//                return 'must end with 0';
            }else{
                return '';
            }
        }
    };

    this.facilityIdsList = [];
    this.validateFacilityID = function(fid){
        if(fid == null || $.trim(fid).length == 0){
            return 'is required';
        }else if(!this.isNumeric(fid)){
            return 'must be a number';
        }else if(this.facilityIdsList.indexOf(fid) == -1){
            return 'is invalid';
        }else{
            return '';
        }
    };

    this.isNumeric = function(n){
            return !isNaN(parseInt(n)) && parseInt(n) == n && n.indexOf('.') == -1;
    };
    this.validateEmail = function(email){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        if(!email || $.trim(email).length == 0){
            return 'is required';
        }else if(!emailReg.test(email)){
            return 'is invalid';
        }else{
            return '';
        }
    };
    this.validateAppointmentDate = function(date, hour, minute, amPm){
        var isValid = false;
        console.log('date: %o', date + ' ' + hour + ':' + minute + ' ' + amPm);
        date = this.setTimeFromCmp(date, hour, minute, amPm);
        var dateStr         = this.formatDateTime(date, 'Y/m/d'),
            currentDateStr  = this.formatDateTime(new Date(), 'Y/m/d');
        console.log('dateStr: %o:::: currentDateStr: %o', dateStr, currentDateStr);
        isValid = dateStr >= currentDateStr;
        return isValid ? '' : 'must be later than ' + currentDateStr;
    };

    this.setTimeFromCmp = function(date, hour, minute, amPm){
        if(date){
            if(amPm == 'AM' && hour == 12){
                date.setHours(0);
            }else if(amPm == 'PM' && hour != 12){
                date.setHours(+hour+12);
            }else{
                date.setHours(+hour);
            }
            date.setMinutes(+minute);
        }
        return date;
    };

    this.formatPhoneNumber = function(phoneNumber){
        var result = phoneNumber;
        if(phoneNumber){
            phoneNumber = phoneNumber.toString();
            phoneNumber = phoneNumber.replace(/ /g,'');
            phoneNumber = phoneNumber.replace(/\(/g,'');
            phoneNumber = phoneNumber.replace(/\)/g,'');
            if(phoneNumber.length == 10){
                result = '(' + phoneNumber.substr(0,3) + ') ' + phoneNumber.substr(3,3) + '-' + phoneNumber.substr(6,10);
            }else if(phoneNumber.length == 7){
                result = phoneNumber.substr(0,3) + '-' + phoneNumber.substr(3,7);
            }
        }
        return result;
    };
    this.SHORT_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.formatDateTime = function(dt, format){
        var result = '';
        format = format || 'Y-m-dTH:i:s';
        if(dt){
            var month   = dt.getMonth() + 1,
                date    = dt.getDate(),
                year    = dt.getFullYear(),
                hours   = dt.getHours(),
                minutes = dt.getMinutes(),
                seconds = dt.getSeconds();
            if(format == 'Y-m-dTH:i:s'){
                result = year + '-'
                        + ('0' + month).slice(-2) + '-'
                        + ('0' + date).slice(-2)
                        + 'T'
                        + ('0' + hours).slice(-2) + ':'
                        + ('0' + minutes).slice(-2) + ':'
                        + ('0' + seconds).slice(-2);
            }else if(format == 'm/d/Y H:i:s'){
                result = ('0' + month).slice(-2) + '/'
                        + ('0' + date).slice(-2) + '/'
                        + year
                        + ' '
                        + ('0' + hours).slice(-2) + ':'
                        + ('0' + minutes).slice(-2) + ':'
                        + ('0' + seconds).slice(-2);
            }else if(format == 'Y/m/d H:i:s'){
                result = year + '/'
                    + ('0' + month).slice(-2) + '/'
                    + ('0' + date).slice(-2)
                    + ' '
                    + ('0' + hours).slice(-2) + ':'
                    + ('0' + minutes).slice(-2) + ':'
                    + ('0' + seconds).slice(-2);
            }else if(format == 'Y/m/d'){
                result = year + '/'
                    + ('0' + month).slice(-2) + '/'
                    + ('0' + date).slice(-2);
            }else if(format == 'm-d-Y'){
                result = ('0' + month).slice(-2) + '-'
                    + ('0' + date).slice(-2) + '-'
                    + year;
            }else if(format == 'd-M-Y'){
                result = ('0' + date).slice(-2) + '-'
                    + SBI.SHORT_MONTH[month-1] + '-'
                    + year;
            }

        }
        return result;
    };

    this.setCKEditorContents = function(value){
        // Get the editor instance that we want to interact with.
        var oEditor = CKEDITOR.instances.editor1;

        // Set editor contents (replace current contents).
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#setData
        oEditor.setData( value );
    };

    this.getCKEditorContents = function(){
        // Get the editor instance that you want to interact with.
        var oEditor = CKEDITOR.instances.editor1;

        // Get editor contents
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#getData
        var content = oEditor.getData();
        console.log( oEditor.getData() );
        return content;
    };

    this.updateValidationComponent = function(cmp, parentCls, validationCls, errorMsg){
        var parent          = cmp.parents(parentCls),
            validationCmp   = parent.find(validationCls);
        if(validationCmp.length > 0){
            if(errorMsg){
                validationCmp.css('display', 'inline-block');
                validationCmp[0].setAttribute('data-original-title', validationCmp[0].getAttribute('field-name') + ' ' + errorMsg.trim() + '.');
            }else{
                validationCmp.css('display', 'none');
            }
            parent[errorMsg ? 'addClass' : 'removeClass']('has-error');
        }
    };

    this.isEmpty = function(obj){
        if(obj == null || obj == undefined){
            return true;
        }else{
            if(toString.call(obj) == '[object Object]'){
                return Object.keys(obj).length == 0
            }else{
                return (obj + '').length == 0;
            }
        }
    };

    /********************************************************************************************************************************************
                                BEGIN DIALOG
    **********************************************************************************************************************************************/
    this.SBI_ALERT_LEVEL_SUCCESS = 0;
    this.SBI_ALERT_LEVEL_MESSAGE = 1;
    this.SBI_ALERT_LEVEL_WARNING = 2;
    this.SBI_ALERT_LEVEL_ERROR = 3;
    this.dialogCompTpl = '<div id="alertInfo" class="modal" tabindex="-1" role="dialog" aria-hidden="true" style="$ALERT_TOP">' +
                             '<div class="modal-dialog modal-sm">' +
                                 '<div class="modal-content">' +
                                     '<div class="modal-header" style="padding: 5px 10px;">' +
                                         '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                         '<h4 class="modal-title">Message</h4>' +
                                     '</div>' +
                                     '<div class="modal-body">' +
                                     '</div>' +
                                     '<div class="modal-footer" style="padding: 5px 10px;">' +
                                         '<button type="button" class="btn btn-default btn-sm no-btn" data-dismiss="modal">No</button>' +
                                         '<button type="button" class="btn btn-default btn-sm yes-btn" data-dismiss="modal" style="display:none;">Yes</button>' +
                                     '</div>' +
                                 '</div>' +
                             '</div>' +
                         '</div>';
    this.showDialog = function(title, message, alertLevel, noBtnLbl, noBtnHandler, yesBtnLbl, yesBtnHandler, yesParameters){
        var alertInfo   = $('#alertInfo'),
            alertBody   = null,
            alertHeader = null,
            alertTitle  = null,
            noBtn       = null,
            yesBtn      = null;
        if(alertInfo.length == 0){
            var body        = $('body')[0],
                top         = window.innerHeight ? (window.innerHeight * 0.3) : 300;
            this.dialogCompTpl = this.dialogCompTpl.replace(/\$ALERT_TOP/g, 'top:' + top + 'px;')
            $('body').append(this.dialogCompTpl);
            alertInfo = $('#alertInfo');
            alertInfo.on('hidden.bs.modal', function(){
                $(this).find('.no-btn').unbind('click');
                $(this).find('.yes-btn').unbind('click');
                console.log('unbind click event...');
            });
        }
        alertBody   = alertInfo.find('.modal-body'),
        alertHeader = alertInfo.find('.modal-header');
        alertTitle  = alertInfo.find('.modal-title');
        noBtn       = alertInfo.find('.no-btn');
        yesBtn      = alertInfo.find('.yes-btn');
        if(alertBody && alertHeader && alertTitle && noBtn && yesBtn){
            alertHeader.removeClass('success message warning error');
            if(alertLevel == this.SBI_ALERT_LEVEL_SUCCESS){
                alertHeader.addClass('success');
            }else if(alertLevel == this.SBI_ALERT_LEVEL_MESSAGE){
                alertHeader.addClass('message');
            }else if(alertLevel == this.SBI_ALERT_LEVEL_WARNING){
                alertHeader.addClass('warning');
            }else if(alertLevel == this.SBI_ALERT_LEVEL_ERROR){
                alertHeader.addClass('error')
            }
            noBtnHandler = noBtnHandler || function(){alertInfo.modal('hide');};
            noBtn.html(noBtnLbl || 'Close');
            noBtn.bind('click', noBtnHandler);
            if(yesBtnLbl){
                yesBtn.css('display', 'inline-block');
                yesBtn.html(yesBtnLbl);
                if(yesBtnHandler){
                    if(yesParameters){
                        yesBtn.bind('click', yesParameters, yesBtnHandler);
                    }else{
                        yesBtn.bind('click', yesBtnHandler);
                    }
                }
            }else{
                yesBtn.css('display', 'none');
            }
            alertTitle.html(title);
            alertBody.html(message);
            alertInfo.modal();
        }
    };
    /********************************************************************************************************************************************
                                    END DIALOG
    **********************************************************************************************************************************************/


     /********************************************************************************************************************************************
                                    BEGIN FORM ACTION
    **********************************************************************************************************************************************/
    this.doPopulateForm = function(data, form){
        if(!form || !data){
            return false;
        }
        var fields  = form.find('.form-group');
        for(var i=0; i<fields.length; i++){
            var field       = $(fields[i]),
                inputs      = field.find('[dataField]'),
                input       = null,
                fieldName   = null,
                value       = null;
            for(var j=0; j<inputs.length; j++){
                input = inputs[j];
                if(input && input.getAttribute('dataField')){
                    fieldName = input.getAttribute('dataField');
                }
                if(fieldName){
                    if(input.type == 'checkbox'){
                        if(data[fieldName] && (data[fieldName] == true || data[fieldName] == 'true')){
//                            input.setAttribute('checked', true);
                            input.checked = true;
                        }else{
                            input.removeAttribute('checked');
                            input.checked = false;
                        }
                    }else if(input.tagName && input.tagName.toLowerCase() == 'span'){
                        $(input).html(data[fieldName] || '');
                    }else{
                        $(input).val(data[fieldName]);
                    }
                    $(input).triggerHandler('change');
                }
            }
        }
    };
    this.doRetrieveDataFromForm = function(form){
        if(!form){
            return {};
        }
        var result  = {};
            fields  = form.find('.form-group');
        for(var i=0; i<fields.length; i++){
            var field       = $(fields[i]),
                inputs      = field.find('[dataField]'),
                input       = null,
                fieldName   = null,
                value       = null;
            for(var j=0; j<inputs.length; j++){
                input = inputs[j];
                if(input && input.getAttribute('dataField')){
                    fieldName = input.getAttribute('dataField');
                }
                if(fieldName){
                    if(input.type == 'checkbox'){
                        value = input.checked;
                    }else if(input.tagName && input.tagName.toLowerCase() == 'span'){
                        value = $(input).html() || '';
                    }else{
                        value = $(input).val() || '';
                    }
                    result[fieldName] = value;
                }
            }
        }
        return result;
    };
    /********************************************************************************************************************************************
                                    END FORM ACTION
    **********************************************************************************************************************************************/
    this.getCookies = function(application, field){
        var i,x,y;
        var documentCookies = document.cookie.split(";");
        for (i=0;i<documentCookies.length;i++){
            x = documentCookies[i].substr(0,documentCookies[i].indexOf("="));
            y = documentCookies[i].substr(documentCookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            var temp = x.split(".");
            if(temp.length == 3){
                if (temp[1] == application && temp[2] == field){
                    return unescape(y);
                }
            }else if(temp.length == 2){
                if (temp[0] == application && temp[1] == field){
                    return unescape(y);
                }
            }
        }
    };

    /********************************************************************************************************************************************
                                    BEGIN LIST ACTION
    **********************************************************************************************************************************************/
    $('select[filterOptionFor]').change(function(){
        var cmp         = $(this),
            filterCmp   = cmp.parents('.filter-cmp'),
            filterInput = filterCmp.find('input[filterInputFor]');
        filterInput.val('');
        filterInput.triggerHandler('keyup');
    });
    $('input[filterInputFor]').keyup(function(){
        var filterCmp   = $(this).parents('.filter-cmp'),
            filterForCmp    = $('#' + this.getAttribute('filterInputFor'));
        if(filterForCmp && filterForCmp.length > 0
            && filterCmp && filterCmp.length > 0){
            SBI.doFilterList(filterCmp, filterForCmp);
        }
    });
    $('.glyphicon-remove[removeFilterFor]').click(function(){
        var cmp         = $(this),
            filterCmp   = cmp.parents('.filter-cmp'),
            filterInput = filterCmp.find('input[filterInputFor]'),
            countCmp    = filterCmp.find('[countFilterFor]');
        filterInput.val('');
        filterInput.triggerHandler('keyup');
        countCmp.html('');
    });

    this.doFilterList = function(filterCmp, filterForCmp){
        var filterOption    = filterCmp.find('select[filterOptionFor]'),
            filterInput     = filterCmp.find('input[filterInputFor]'),
            tbody           = filterForCmp.find('tbody'),
            rows            = tbody.find('tr'),
            filterValue     = filterInput.val() || '',
            countCmp        = filterCmp.find('[countFilterFor]'),
            count           = 0;
        filterValue = filterValue.toLowerCase();
        for(var i=0; i<rows.length; i++){
            var row = $(rows[i]),
                col = null;
            if(filterValue.trim().length == 0){
                row.css('display', 'table-row');
                count++;
            }else{
                col = row.find('td[name=' + filterOption.val() + ']');
                if(col && col.length > 0 && col.attr('value')){
                    var idx = col.attr('value').toLowerCase().indexOf(filterValue);
                    row.css('display', idx == 0 ? 'table-row' : 'none');
                    if(idx == 0){
                        count++;
                    }
                }else{
                    row.css('display', 'none');
                }
            }
        }
        countCmp.html((count == 0 || filterValue.trim().length == 0) ? '' : '(' + count + ')');
    };

    $('th[sortField]').click(function(){
        var dt = new Date();
        var cmp             = $(this),
            fieldName       = this.getAttribute('sortField'),
            thead           = cmp.parents('thead'),
            table           = cmp.parents('table'),
            tbody           = table.find('tbody'),
            rows            = [],
            obj             = {},
            prefix          = 1,
            newContent      = '',
            sortedField     = table.attr('sortedField'),
            sortedDirection = table.attr('sortedDirection');
        if(fieldName && thead){
            thead.find('.glyphicon').removeClass('glyphicon-chevron-up glyphicon-chevron-down');
            if(sortedField == fieldName){
                sortedDirection = sortedDirection == 'ASC' ? 'DESC' : 'ASC';
            }else{
                sortedDirection = 'DESC';
            }
            sortedField = fieldName;
            table.attr('sortedField', sortedField);
            table.attr('sortedDirection', sortedDirection);

            cmp.find('.glyphicon').addClass(sortedDirection == 'DESC' ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down');
            rows = tbody.find('tr');
            prefix = (sortedDirection == 'DESC' ? 1 : -1);
            var sortedRows = rows.sort(function(row1,row2){
                var result  = 0,
                    td1     = $(row1).find('td[name=' + sortedField + ']'),
                    td2     = $(row2).find('td[name=' + sortedField + ']'),
                    o1      = td1.attr('value'),
                    o2      = td2.attr('value'),
                    val1    = SBI.isNumeric(o1) ? +o1 : o1,
                    val2    = SBI.isNumeric(o2) ? +o2 : o2;
                if(val1 > val2){
                    result = 1;
                }else if(val1 < val2){
                    result = -1;
                }
                return result * prefix;
            });
            tbody.html('');
            for(var i=0; i<sortedRows.length; i++){
                tbody.append(sortedRows[i]);
            }
            console.log('time taken to sort %o with %o direction: %o', sortedField, sortedDirection, (new Date() - dt));
        }
    });
    /********************************************************************************************************************************************
                                    END LIST ACTION
    **********************************************************************************************************************************************/

    this.pieColors = [{
        color:"#F7464A",
        highlight: "#FF5A5E"
    },{
        color: "#46BFBD",
        highlight: "#5AD3D1"
    },{
        color: "#FDB45C",
        highlight: "#FFC870",
    },{
        color: "#949FB1",
        highlight: "#A8B3C5",
    },{
        color: "#4D5360",
        highlight: "#616774",
    }];

    /********************************************************************************************************************************************
                                    BEGIN PATIENT INFO FORM
    **********************************************************************************************************************************************/
    this.patientFormTpl = '$SEPARATOR' +
                     '<form class="form-horizontal patient-info-form $APPOINTMENT_STATUS" role="form">' +
                        '<input class="agent-call-log-id $LINE" style="display:none"></input>' +
                        '<input class="appt-call-log-id $LINE" style="display:none"></input>' +
                        '<div class="form-group">' +
                            '<label class="col-sm-3 control-label">Patient ID&nbsp;' +
                                '<span style="display:none;" class="text-danger validation-cmp" data-toggle="tooltip" field-name="Patient ID" data-placement="right">*</span>' +
                            '</label>' +
                            '<div class="col-sm-7">' +
                                '<input type="text" class="form-control input-sm patient-id-input $LINE" placeholder="Patient ID"/>' +
                            '</div>' +
                            '$REMOVE_OPTION' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-sm-3 control-label">Facility ID&nbsp;' +
                                '<span style="display:none;" class="text-danger validation-cmp" data-toggle="tooltip" field-name="Facility ID" data-placement="right">*</span>' +
                            '</label>' +
                            '<div class="col-sm-7">' +
                                '<input type="text" class="form-control input-sm facility-id-input $LINE" placeholder="Facility ID" data-type="number" length=5/>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="col-sm-3 control-label">Appointment&nbsp;' +
                                '<span style="display:none;" class="text-danger validation-cmp" data-toggle="tooltip" field-name="Appointment" data-placement="right">*</span>' +
                            '</label>' +
                            '<div class="col-sm-4">' +
                                '<input type="text" class="form-control appointment-date-time input-sm patient-date-input patient-appointment-datepicker-$LINE $LINE" placeholder="Date" name="datepicker"/>' +
                            '</div>' +
                            '<div class="col-sm-5 form-inline">' +
                                '<select class="form-control input-sm appointment-date-time patient-appointment-hour $LINE">$HOURS_OPTIONS</select>' +
                                '<select class="form-control input-sm appointment-date-time patient-appointment-minute $LINE">$MINUTES_OPTIONS</select>' +
                                '<select class="form-control input-sm appointment-date-time patient-appointment-ampm $LINE">' +
                                    '<option value="AM">AM</option>' +
                                    '<option value="PM">PM</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group" style="margin-bottom: 0px;">' +
                            '<label class="col-sm-3 control-label">Email Captured?</label>' +
                            '<label class="col-sm-2" style="text-align: left;">' +
                                '<input type="checkbox" class="input-sm patient-email-captured $LINE" style="width: 20px;"></input>' +
                            '</label>' +
                            '<label class="col-sm-4 control-label">Waiting On Insurance?</label>' +
                            '<label class="col-sm-2" style="text-align: left;">' +
                                '<input type="checkbox" class="input-sm patient-insurance-waiting $LINE" style="width: 20px;"></input>' +
                            '</label>' +
                        '</div>' +
                     '</form>';

    this.addPatientForm = function(patient, body, canRemove){
        var patientForm     = this.patientFormTpl,
            hourOptions     = '',
            minuteOptions   = '',
            numberOfForm    = body.find('.patient-info-form').length,
            random          = Math.random().toString().substr(2),
            removeCmp       = '<span class="glyphicon glyphicon-minus remove-patient-info-$LINE" style="margin-top:10px; cursor:pointer" data-toggle="tooltip" data-placement="right" title="Remove Patient" line="' + random +'"/>';
        for(var i=1; i<=12; i++){
            hourOptions += '<option value="' + i + '"' + (i==8? ' selected' : '') +'>' + ('0'+i).slice(-2) + '</option>';
        }
        for(var i=0; i<59; i=i+5){
            minuteOptions += '<option value="' + i + '">' + ('0'+i).slice(-2) + '</option>';
        }
        patientForm = patientForm.replace(/\$HOURS_OPTIONS/g, hourOptions);
        patientForm = patientForm.replace(/\$MINUTES_OPTIONS/g, minuteOptions);
        patientForm = patientForm.replace(/\$SEPARATOR/g, numberOfForm > 0 ? '<hr class="line-' + random +'"/>' : '');
        patientForm = patientForm.replace(/\$REMOVE_OPTION/g, canRemove ? removeCmp : '');
        patientForm = patientForm.replace(/\$LINE/g, random);
        if(patient){
            if(patient.appointmentStatus == 'ACTIVE'){
                patientForm = patientForm.replace(/\$APPOINTMENT_STATUS/g,'verified');
            }else{
                patientForm = patientForm.replace(/\$APPOINTMENT_STATUS/g,'unverified');
            }
        }else{
            patientForm = patientForm.replace(/\$APPOINTMENT_STATUS/g,'');
        }

        body.append(patientForm);
        $('.patient-appointment-datepicker-' + random).datepicker();
        $('input.' + random).change(this.validatePatientForm);
        $('select.' + random).change(this.validatePatientForm);

        if(patient){
            $('.patient-id-input.' + random).val(patient.patientId);
            $('.facility-id-input.' + random).val(patient.facilityId);
            $('.agent-call-log-id.' + random).val(patient.callLogId);
            $('.appt-call-log-id.' + random).val(patient.appointmentCallLogId);

            $('.patient-email-captured.' + random)[0].checked = patient.emailCaptured && (patient.emailCaptured == 'true' || patient.emailCaptured == true);
            $('.patient-insurance-waiting.' + random)[0].checked = patient.insuranceWaiting && (patient.insuranceWaiting == 'true' || patient.insuranceWaiting == true);
            var appointmentDate = patient.nextAppointmentDate ? new Date(patient.nextAppointmentDate) : null,    //patient.nextAppointmentDate is represented as 'M-D-Y
                appointmentTime = patient.nextAppointmentTime,              //patient.nextAppointmentTime is represented as 'HHMM'
                appointmentHour = appointmentTime ? appointmentTime.substr(0, 2) : 8
                appointmentMinute   = appointmentTime ? appointmentTime.substr(2, 2) : 0;
            if(appointmentDate){
                $('.patient-appointment-datepicker-' + random).datepicker('setDate', appointmentDate);
                $('.patient-appointment-hour.' + random).val(appointmentHour - (appointmentHour > 12 ? 12 : 0));
                $('.patient-appointment-minute.' + random).val(appointmentMinute);
                $('.patient-appointment-ampm.' + random).val(appointmentHour >= 12 ? 'PM' : 'AM');
            }
        }

        if(numberOfForm > 0){
            $('.remove-patient-info-' + random).click(function(){
                var cmp         = $(this),
                    form        = cmp.parents('.patient-info-form'),
                    lineNumber  = this.getAttribute('line');
                if(form){
                    form.detach();
                    $('hr.line-' + lineNumber).detach();
                }
            });
        }
        return patientForm;
    }

    this.validatePatientForm = function(){
        var cmp             = $(this),
            parent          = cmp.parents('.form-group'),
            form            = cmp.parents('.patient-info-form'),
            patientId       = $(form.find('.patient-id-input')),
            facilityId      = $(form.find('.facility-id-input')),
            appointmentDate = $(form.find('.patient-date-input')),
            hourCmp         = $(form.find('.patient-appointment-hour')),
            minuteCmp       = $(form.find('.patient-appointment-minute')),
            amPmCmp         = $(form.find('.patient-appointment-ampm')),
            callLogId       = $(form.find('.agent-call-log-id'));
        if(!callLogId.val() && !patientId.val() && !facilityId.val() && !appointmentDate.val()){
            SBI.updateValidationComponent(patientId, '.form-group', '.validation-cmp', '');
            SBI.updateValidationComponent(facilityId, '.form-group', '.validation-cmp', '');
            SBI.updateValidationComponent(appointmentDate, '.form-group', '.validation-cmp', '');
        }else{
            if(!patientId.val()){
                SBI.updateValidationComponent(patientId, '.form-group', '.validation-cmp', 'is required');
            }else{
                SBI.updateValidationComponent(patientId, '.form-group', '.validation-cmp', SBI.validatePatientID(patientId.val()));
            }
            if(!facilityId.val()){
                SBI.updateValidationComponent(facilityId, '.form-group', '.validation-cmp', 'is required');
            }else{
                SBI.updateValidationComponent(facilityId, '.form-group', '.validation-cmp', SBI.validateFacilityID(facilityId.val()));
            }
            if(!appointmentDate.val()){
                SBI.updateValidationComponent(appointmentDate, '.form-group', '.validation-cmp', 'is required');
            }else{
                SBI.updateValidationComponent(appointmentDate, '.form-group', '.validation-cmp',SBI.validateAppointmentDate(appointmentDate.datepicker('getDate'), hourCmp.val(), minuteCmp.val(), amPmCmp.val()));
            }
        }
    };

    /********************************************************************************************************************************************
                                    BEGIN PATIENT INFO FORM
    **********************************************************************************************************************************************/

};
SBI = new SBI();
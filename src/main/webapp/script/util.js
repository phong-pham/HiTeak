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

var HiTeak = function(){
    this.HITEAK_KEY_ARROW_UP = 38;
    this.HITEAK_KEY_ARROW_DOWN = 40;
    this.HITEAK_KEY_ENTER = 13;
    this.HITEAK_KEY_SPACE = 32;

    this.validateForm = function(form){
        var isValid     = true,
            inputs      = form.find('input'),
            input       = null,
            error       = '',
            val         = null,
            inputType   = null;
        inputs.push.apply(inputs, form.find('textarea'));
        for(var i=0; i<inputs.length; i++){
            error = '';
            input = $(inputs[i]);
            inputType = input.attr('type');
            val =  inputType == 'checkbox' ? input.attr('checked') : input.val();
            if(input.hasClass('required') && (val === undefined || val === null || !val)){
                error = 'is required.';
            }else if(input.attr('data-type') == 'number' && !isNumeric(val)){
                error = 'must be a number.';
            }
            this.updateValidationComponent(input, '.form-group', '.validation-cmp', error);
            isValid = isValid && !error;
        }
        return isValid;
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
                    + this.SHORT_MONTH[month-1] + '-'
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

    this.updateValidationComponent = function(cmp, parentCls, validationCls, errorMsg, hideValidationCmp){
        var parent          = cmp.parents(parentCls),
            validationCmp   = parent.find(validationCls);
        if(validationCmp.length > 0){
            if(errorMsg){
                validationCmp.css('display', 'inline-block');
                validationCmp[0].setAttribute('data-original-title', validationCmp[0].getAttribute('field-name') + ' ' + errorMsg.trim() + '.');
            }else if(hideValidationCmp){
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
    this.HITEAK_ALERT_LEVEL_SUCCESS = 0;
    this.HITEAK_ALERT_LEVEL_MESSAGE = 1;
    this.HITEAK_ALERT_LEVEL_WARNING = 2;
    this.HITEAK_ALERT_LEVEL_ERROR = 3;
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
            if(alertLevel == this.HITEAK_ALERT_LEVEL_SUCCESS){
                alertHeader.addClass('success');
            }else if(alertLevel == this.HITEAK_ALERT_LEVEL_MESSAGE){
                alertHeader.addClass('message');
            }else if(alertLevel == this.HITEAK_ALERT_LEVEL_WARNING){
                alertHeader.addClass('warning');
            }else if(alertLevel == this.HITEAK_ALERT_LEVEL_ERROR){
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
            this.doFilterList(filterCmp, filterForCmp);
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
                    val1    = this.isNumeric(o1) ? +o1 : o1,
                    val2    = this.isNumeric(o2) ? +o2 : o2;
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
};
HiTeak = new HiTeak();
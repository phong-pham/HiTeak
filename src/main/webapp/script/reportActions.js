$(document).ready(function() {
    var dt = new Date();
    var canSynCallLog = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_SYNC_CALL_LOG');
    if(canSynCallLog == null || canSynCallLog == 'false'){
//        $('.sync-call-log').detach();
    }else{
        $('button.sync-call-log').click(function(){
            var btn     = $(this),
                date    = $('[name=datepicker]').datepicker('getDate'),
                dateFormat  = SBI.formatDateTime(date, 'm-d-Y');
            if(dateFormat){
                SBI.showDialog('Confirm', 'Are you sure you would like to sync call log for ' + dateFormat + '?', SBI.SBI_ALERT_LEVEL_MESSAGE, 'No', null, 'Yes', doSyncCallLog);
            }

        });
    }
    var doSyncCallLog = function(){
        var btn         = $('button.sync-call-log'),
            date        = $('[name=datepicker]').datepicker('getDate'),
            dateFormat  = SBI.formatDateTime(date, 'm-d-Y');
        btn.attr('disabled', true);
        $('.report-progress').css('display', 'block');
        $('.report-progress').find('span.progress-message').html('Please wait while syncing Agent Call with Call Log...');
        $.getJSON(
            '/callcenter/secure/sync-call-log',
            {
                date: dateFormat
            },
            function(json){
                if(json.success){
                    SBI.showDialog('Message', json.message, SBI.SBI_ALERT_LEVEL_MESSAGE, 'Close', reloadPage);
                }else{
                    SBI.showDialog('ERROR', json.message, SBI.SBI_ALERT_LEVEL_ERROR, 'Close', reloadPage);
                }
            }
        );
    };
    var reloadPage = function(){
        location.href = location.href;
    };

    var reportDate = $('#reportDate').val()
    $('[name=datepicker]').datepicker();
    $('[name=datepicker]').datepicker('option', 'maxDate', 0);
    $('[name=datepicker]').datepicker('setDate', reportDate ? new Date(reportDate) : new Date());

    var mainTable = $('table.main');
    if(mainTable.length > 0){
        var mainHeader = $('.container.main').find('.panel-title');
        if(mainHeader.length > 0){
            mainHeader.html(mainHeader.html() + ' (' + mainTable.find('tbody tr').length + ' records)');
        }
    }

    $('.agent-call-date').change(function(){
        console.log('data change: ' + $(this).val());
        var cmp             = $(this),
            selectedDate    = cmp.datepicker('getDate'),
            formatDate      = SBI.formatDateTime(selectedDate, 'm-d-Y'),
            canAccessReport = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_ACCESS_CALL_CENTER_REPORT'),
            agentId         = SBI.getCookies('APPTRACKER', 'EMPLOYEE_NUMBER');
        if(formatDate){
            if(canAccessReport){
                agentId = '';
            }else if(agentId){
                agentId = 'agentId=' + agentId;
            }else{
                agentId = '';
            }
            location.href = location.pathname + '?date=' + formatDate + '&' + agentId;
        }
    });

    $('body').on('click', '.patient-schedule', function(){
        var cmp     = $(this),
            tr      = cmp.parents('tr'),
            emp     = tr.find('td[name=employeeNumber]'),
            agentId = emp.attr('value'),
            uuid    = tr.find('td[name=uuid]'),
            ani     = tr.find('td[name=ani]');
        console.log('about to load patient appointments for %o with uuid [%o]', emp.attr('value'), uuid.attr('value'));
        $.getJSON(
            '/callcenter/secure/agent-appointment-search',
            {
                agentId : agentId,
                uuid    : uuid.attr('value')
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
                    $('#appointmentSearchModalLabel').text('Appointment(s) for Agent ' + agentId + ' with ANI ' + SBI.formatPhoneNumber(ani.attr('value')));
                    $('#appointmentSearch').modal();
                }
            }
        );
    });

    var inboundCallSummaryList  = $('#inboundCallSummaryList'),
        inboundCallSummary      = {},
        volumeChart             = null,
        callCenterChart         = null;
    if(inboundCallSummaryList && inboundCallSummaryList.length > 0){
        var rows            = inboundCallSummaryList.find('tr'),
            summaryBody     = $('.call-center-volume').find('tbody');

        var populateExtraInfo = function(row, extraInfo, extraReportField, extraReportKey, extraReportValue){
            var eventCounts = row.find('td[eventCount=true]');
            extraInfo = extraInfo || {};
                for(var i=0; i<eventCounts.length; i++){
                    var event       = $(eventCounts[i]),
                        displayName = event.attr('displayName'),
                        countValue  = +event.attr('value');
                    countValue = isNaN(countValue) ? 0 : countValue;
                    if(extraInfo[event.attr('displayName')] == undefined){
                        extraInfo[event.attr('displayName')] = countValue
                    }else{
                        extraInfo[event.attr('displayName')] += countValue
                    }
                }
                if(!extraInfo[extraReportField]){
                    extraInfo[extraReportField] = {};
                    extraInfo[extraReportField][extraReportKey] = extraReportValue;
                }else{
                    if(extraInfo[extraReportField][extraReportKey]){
                        extraInfo[extraReportField][extraReportKey] += extraReportValue
                    }else{
                        extraInfo[extraReportField][extraReportKey] = extraReportValue;
                    }
                }
           return extraInfo;
        };
        for(var i=0; i<rows.length; i++){
            var row             = $(rows[i]),
                phoneTypeCmp    = row.find('td[name=phoneType]'),
                phoneType       = phoneTypeCmp.attr('value'),
                menuPressCmp    = row.find('td[name=menuPress]'),
                menuPress       = menuPressCmp.attr('value'),
                callCountCmp    = row.find('td[name=callCount]'),
                callCount       = +callCountCmp.attr('value'),
                callCenterName  = row.attr('callCenterName'),
                callCenterObj   = inboundCallSummary[callCenterName];
            if(callCenterName){
                if(!callCenterObj){
                    callCenterObj = {
                        count       : callCount,
                        phoneType   : {},
                        numberPress : {},
                        isCombined  : callCenterName == 'Combined'
                    };
                }else{
                    callCenterObj.count += callCount;
                }
                if(callCenterObj.phoneType[phoneType]){
                    callCenterObj.phoneType[phoneType].count += callCount;
                    callCenterObj.phoneType[phoneType].extra = populateExtraInfo(row, callCenterObj.phoneType[phoneType].extra, 'Number Press', menuPress, callCount);
                }else{
                    callCenterObj.phoneType[phoneType] = {
                        count   : callCount,
                        extra   : populateExtraInfo(row, null, 'Number Press', menuPress, callCount)
                    }
                }

                if(callCenterObj.numberPress[menuPress]){
                    callCenterObj.numberPress[menuPress].count  += callCount;
                    callCenterObj.numberPress[menuPress].extra  = populateExtraInfo(row, callCenterObj.numberPress[menuPress].extra, 'Phone Type', phoneType, callCount);
                }else{
                    callCenterObj.numberPress[menuPress] = {
                        count   : callCount,
                        extra   : populateExtraInfo(row, null, 'Phone Type', phoneType, callCount)
                    }
                }

                inboundCallSummary[callCenterName] = callCenterObj;
            }
        }
        console.log('inboundCallSummary: %o', inboundCallSummary);
        var callCenterNames = Object.keys(inboundCallSummary);
        callCenterNames =callCenterNames.sort(function(n1, n2){
            if(n1 == 'Combined' && n2 != 'Combined'){
                return 1;
            }else if(n1 != 'Combined' && n2 == 'Combined'){
                return -1;
            }else if(n1 == 'Combined' && n2 == 'Combined'){
                return 0;
            }else{
                if(n1 > n2){
                    return 1;
                }else if(n1 < n2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
        var newBody     = '',
            chartData   = [];
        for(var i=0; i<callCenterNames.length; i++){
            var name    = callCenterNames[i],
                tr      = '<tr value="' + name + '" class="call-center-name pointer ';
            if(name == 'Combined'){
                tr += 'bold h4">';
            }else{
                tr += '">';
                var color = SBI.pieColors[i%SBI.pieColors.length];
                chartData.push({
                    label       : name,
                    value       : inboundCallSummary[name].count,
                    color       : color.color,
                    highlight   : color.highlight
                });
            }
            tr += '<td>' + name + '</td>';
            tr += '<td class="text-align-right">' + inboundCallSummary[name].count + '</td>';
            tr += '</tr>';
            newBody += tr;
        }
        if(!newBody){
            newBody = '<tr><td colspan="2" style="text-align: center;">No Data</td></tr>';
        }
        summaryBody.html(newBody);
        inboundCallSummaryList.detach();
        if(chartData.length > 0){
            var chartCanvas = $('.call-center-volume-chart').find('canvas')[0];
            if(chartCanvas){
                var ctx = chartCanvas.getContext('2d');
                window.pieChart = new Chart(ctx).Pie(chartData);
            }
        }
    }
    $('body').on('click', '.call-center-name', function(){
        var tr              = $(this),
            name            = tr.attr('value'),
            selectedReport  = $('.call-center-report-control button.btn-primary').attr('reportType');
        tr.parents('tbody').find('tr').removeClass('info');
        tr.addClass('info');
        console.log('display detail for call center ' + name);
        populateReportDetail(name, selectedReport);
    });
    $('button.report').click(function(){
        var selectedCallCenter = $('.call-center-name.info').attr('value');
        populateReportDetail(selectedCallCenter, $(this).attr('reportType'));
    });

    var populateReportDetail = function(callCenter, reportType){
        var reportControls  = $('.call-center-report-control button'),
            selectedReport  = $('.call-center-report-control button[reportType=' + reportType + ']'),
            reportView      = $('.call-center-report-detail table'),
            detailValue     = '',
            callCenterData  = inboundCallSummary ? inboundCallSummary[callCenter] : null,
            hasSelectedReport = selectedReport.length > 0,
            extraField      = '',
            reportField     = '';

        reportControls.removeClass('btn-primary');
        if(hasSelectedReport){
            selectedReport.addClass('btn-primary');
        }else{
            reportType = $(reportControls[0]).attr('reportType');
            if(callCenterData && callCenterData[reportType]){
                $(reportControls[0]).addClass('btn-primary');
                hasSelectedReport = true;
            }
        }

        if(callCenterData && hasSelectedReport){
            $('.call-center-report-control').css('display', 'block');
            if(reportType == 'phoneType'){
                extraField = 'Number Press';
                reportField = 'Phone Type - ';
            }else if(reportType == 'numberPress'){
                extraField = 'Phone Type';
                reportField = 'Number Press - ';
            }
            var data        = callCenterData[reportType],
                keys        = Object.keys(data),
                sum         = 0,
                count       = 0,
                extra       = null,
                chartData   = [],
                color       = null;
            keys = keys.sort();

            for(var i=0; i<keys.length; i++){
                color = SBI.pieColors[i%SBI.pieColors.length];
                count = data[keys[i]].count;
                extra = data[keys[i]].extra;
                detailValue += '<tr>' ;
                detailValue += '<td>' + keys[i] + '</td>';
                detailValue += '<td class="text-align-right">' + data[keys[i]].count + '</td>';
                chartData.push({
                    label       : reportField + keys[i],
                    value       : data[keys[i]].count,
                    color       : color.color,
                    highlight   : color.highlight
                });
                if(extra){
                    var extraInfo   = '<div class=\'row\'>',
                        extraKeys   = [],
                        extraKey    = '',
                        extraData   = null;
                    if(extra[extraField]){
                        extraData   = extra[extraField];
                        extraKeys   = Object.keys(extraData);
                        extraKeys = extraKeys.sort();
                        if(extraKeys.length > 0){
                            extraInfo += '<div class=\'col-md-3 width-200\'><table class=\'table table-striped\' style=\'font-family: sans-serif;\'>';
                            extraInfo += '<thead><th>' + extraField + '</th><th>Count</th></thead><tbody>';
                            for(var j=0; j<extraKeys.length; j++){
                                extraInfo += '<tr><td>' + extraKeys[j] + '</td><td class=\'text-align-right\'>' + extraData[extraKeys[j]] + '</td></tr>';
                            }
                            extraInfo += '</tbody></table></div>';
                        }
                    }
                    extraKeys = Object.keys(extra);
                    if(extraKeys.length > 0){
                        extraInfo += '<div class=\'col-md-3 width-250\'><table class=\'table table-striped\' style=\'font-family: sans-serif;\'>';
                        extraInfo += '<thead><th>Event</th><th>Count</th></thead><tbody>';
                        for(var j=0; j<extraKeys.length; j++){
                            extraKey = extraKeys[j];
                            if(extraKey != extraField){
                                extraInfo += '<tr><td>' + extraKey + '</td><td class=\'text-align-right\'>' + extra[extraKey] + '</td></tr>';
                            }
                        }
                        extraInfo += '</tbody></table></div>';
                        extraInfo += '</div>';
                    }
                    detailValue += '<td style="width: 30px;"><span class="pointer fr padding-left-5 glyphicon glyphicon-arrow-right line-report-detail" data-toggle="popover" data-html=true data-content="' + extraInfo +'" data-container=".line-report-detail"></span></td>';
                }
                detailValue += '</tr>';
                sum += count;
            }
            if(keys.length > 0){
                detailValue += '<tr><td></td><td class="bold h5 text-align-right">' + sum + '</td><td></td></tr>';
            }
            if(chartData.length > 0){
                if(callCenterChart){
                    callCenterChart.segments.length = 0;
                    for(var i=0; i<chartData.length; i++){
                        callCenterChart.addData(chartData[i], 0, true);
                    }
                    callCenterChart.reflow();
                    callCenterChart.update();
                }else{
                    var canvas = $('.call-center-detail-chart').find('canvas')[0];
                    if(canvas){
                        callCenterChart = new Chart(canvas.getContext('2d')).Pie(chartData);
                    }
                }
            }else if(callCenterChart){
                callCenterChart.segments.length = 0;
                callCenterChart.reflow();
                callCenterChart.update();
            }
        }
        reportView.html(detailValue);
    };


    $('body').on('click', '.line-report-detail', function(){
        var cmp         = $(this),
            tr          = cmp.parents('tr'),
            existingPop = $('.line-report-detail').not(this);
        if(tr.hasClass('info')){
            tr.removeClass('info');
            $(this).popover('hide');
        }else{
            tr.parents('tbody').find('tr').removeClass('info');
            tr.addClass('info');
            if(existingPop.length > 0){
                existingPop.popover('hide');
            }
            $(this).popover('show');
        }
    });

    $('#agentCallLogLink').click(function(){
        var reportPop       = $('#agentReportPop'),
            reportTile      = $('#agentReportModalLabel'),
            agentInput      = reportPop.find('#agentId'),
            canAccessReport = SBI.getCookies('CALL_CENTER_SUPPORT', 'CAN_ACCESS_CALL_CENTER_REPORT'),
            agentId         = SBI.getCookies('APPTRACKER', 'EMPLOYEE_NUMBER');
        reportTile.html('Agent Call Log Report');
        reportPop.attr('reportType', 'agentCallLog');
        agentInput.parents('.form-group').css('display', 'block');
        if(canAccessReport == null || canAccessReport == 'false'){
            agentInput.attr('disabled', true);
            agentInput.val(agentId);
        }else if(!agentInput.val()){
            agentInput.val(agentId);
        }
        reportPop.modal();
        return false;
    });

    $('#callLogLink').click(function(){
        var reportPop       = $('#agentReportPop'),
            reportTile      = $('#agentReportModalLabel'),
            agentInput      = reportPop.find('#agentId');
        agentInput.parents('.form-group').css('display', 'none');
        reportTile.html('Call Log Report');
        reportPop.attr('reportType', 'callLog');
        reportPop.modal();
        return false;
    });

    $('#getReportBtn').click(function(){
        var reportPop   = $('#agentReportPop'),
            agentId     = reportPop.find('#agentId').val(),
            from        = reportPop.find('.fromInput').datepicker('getDate'),
            to          = reportPop.find('.toInput').datepicker('getDate'),
            url         = '';
        if(reportPop.attr('reportType') == 'agentCallLog' && agentId){
            url = 'http://liberty.bnd.corp/pentaho/content/reporting/reportviewer/report.html?solution=SB+Reporting&path=&name=Agent+Call+Log.prpt&locale=en_US&userid=joe&password=password&showParameters=false&renderMode=PARAMETER';
            url += '&p_agent_id=' + agentId;
            $('#agentReportView').find('.modal-title').html('Agent Call Log Report for ' + agentId);
        }else if(reportPop.attr('reportType') == 'callLog'){
            url = 'http://liberty.bnd.corp/pentaho/content/reporting/reportviewer/report.html?solution=SB+Reporting&path=&name=Call+Log+Detail.prpt&locale=en_US&userid=joe&password=password&showParameters=false&renderMode=PARAMETER';
        }
        if(url){
            url += '&p_start_date=' + SBI.formatDateTime(from, 'd-M-Y');
            url += '&p_end_date=' + SBI.formatDateTime(to, 'd-M-Y');
            window.open(url, '_blank');
//            downloadURL(url);
        }

    });
    var iframe = $('#reportIframe');
    iframe.on('load', function(){
        console.log('on iframe load');
        $('#agentReportView').modal();
    });
    var reportView = $('#agentReportView').find('.modal-dialog');
    if(reportView && reportView.length){
        console.log('before: %ox%o', reportView.css('width'), reportView.css('height'));
        reportView.css('width', $(document).width() * 0.6 + 'px');
        reportView.css('height', $(document).height() * 0.8 + 'px');
        console.log('after: %ox%o', reportView.css('width'), reportView.css('height'));
    }

    var downloadURL = function downloadURL(url) {
//        var iframe = $('#reportIframe');
//        if(url){
//            iframe.attr('src', url);
//        }
        var hiddenIFrameID = 'hiddenDownloader',
            iframe = $('#reportIframe');
        if(iframe.length == 0){
            iframe = $('#' + hiddenIFrameID);
        }
        if (iframe.length == 0) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.src = url;
        }else if(url){
            iframe.attr('src', url);
        }

    };

    /********************************************************************************************************************************************
                    BEGIN CALL LOG ACTION
    **********************************************************************************************************************************************/
    var facilityIdSelect = $('#facilityIDs');
    SBI.facilityIdsList = [];
    if(facilityIdSelect.length > 0){
        var facIds = facilityIdSelect.find('option');
        for(var i=0; i<facIds.length; i++){
            SBI.facilityIdsList.push(facIds[i].value);
        };
        facilityIdSelect.remove();
    }

    $('.add-call-log').click(function(){
        doOpenCallLogDetail(this, 'Add');
    });
    $('.edit-call-log').click(function(){
        doOpenCallLogDetail(this, 'Edit');
    });

    var doOpenCallLogDetail = function(link, action){
        var cmp             = $(link),
            tr              = cmp.parents('tr'),
            table           = cmp.parents('table'),
            trs             = table.find('tr[agentType=psr][uuid=' + $(tr).attr('uuid') + '][employeeNumber=' + tr.attr('employeeNumber') + ']'),
            tds             = [],
            callLog         = {},
            callLogView     = $('#agentCallLogPop'),
            title           = callLogView.find('.modal-title'),
            uuid            = callLogView.find('#uuid'),
            employeeNumber  = callLogView.find('#employeeNumberInput');
        $('#patientInfoBody').html('');
        for(var i=0; i<trs.length; i++){
            tr = $(trs[i]);
            tds = tr.find('td')
            callLog = {};
            for(var j=0; j<tds.length; j++){
                callLog[$(tds[j]).attr('name')] = $(tds[j]).attr('value');
            }
            var apptDateTime    = callLog.appointmentDateTime,
                apptDate        = apptDateTime ? apptDateTime.split(' ')[0] : '',
                apptTime        = apptDateTime ? apptDateTime.split(' ')[1] : '';
            callLog['nextAppointmentDate']  = apptDate;
            callLog['nextAppointmentTime']  = apptTime.split(':').join('');
            callLog['patientId'] = callLog['tempPatientId'];

            SBI.addPatientForm(callLog, $('#patientInfoBody'), false);
        }

        uuid.val(callLog.uuid);
        employeeNumber.val(callLog.employeeNumber);

        title.html(action + ' call log');
        callLogView.modal();
    };

    $('#addPatientInfoBtn').click(function(){
        var body = $('#patientInfoBody');
        SBI.addPatientForm(null, body, true);
    });

    $('#saveCallLog').click(function(){
        var callLogView     = $('#agentCallLogPop'),
            uuid            = callLogView.find('#uuid'),
            employeeNumber  = callLogView.find('#employeeNumberInput'),
            patientInfoBody = callLogView.find('#patientInfoBody'),
            forms           = patientInfoBody.find('.patient-info-form'),
            callLog         = {},
            patients        = [];
        if(patientInfoBody.find('.has-error').length > 0){
            SBI.showDialog('Error', 'Form is invalid.', SBI.SBI_ALERT_LEVEL_ERROR);
        }else{
            callLog = {
                uuid            : uuid.val(),
                employeeNumber  : employeeNumber.val()
            };
            for(var i=0; i<forms.length; i++){
                var form            = $(forms[i]),
                    patientId       = form.find('.patient-id-input'),
                    apptDate        = $(form.find('.patient-date-input')[0]),
                    date            = apptDate.datepicker('getDate'),
                    apptTimeHour    = $(form.find('.patient-appointment-hour')[0]),
                    apptTimeMinute  = $(form.find('.patient-appointment-minute')[0]),
                    apptTimeAmPm    = $(form.find('.patient-appointment-ampm')[0]);;
                if(patientId.val()){
                    patients.push({
                        agentCallLogId          : form.find('.agent-call-log-id').val(),
                        apptCallLogId           : form.find('.appt-call-log-id').val(),
                        patientId               : patientId.val(),
                        facilityId              : form.find('.facility-id-input').val(),
                        nextAppointmentDateTime : SBI.formatDateTime(SBI.setTimeFromCmp(date, apptTimeHour.val(), apptTimeMinute.val(), apptTimeAmPm.val())),
                        emailCaptured           : form.find('.patient-email-captured')[0].checked,
                        insuranceWaiting        : form.find('.patient-insurance-waiting')[0].checked
                    });
                }
            }
            callLog['patients'] = patients;
            SBI.showDialog('Message', 'Are you sure you would like to update call log?', SBI.SBI_ALERT_LEVEL_WARNING, 'No', null, 'Yes', doSaveCallLog, callLog);
        }
    });

    var doSaveCallLog = function(e){
        var callLog = e.data;
        console.log('about to save call log: %o', callLog);
        if(callLog){
            $.postJSON(
                '/callcenter/secure/update-call-log',
                 callLog,
                 function(json){
                    if(json.success){
                        SBI.showDialog('Message', json.message, SBI.SBI_ALERT_LEVEL_MESSAGE, 'Close', reloadPage);
                    }else{
                        SBI.showDialog('Error', json.message, SBI.SBI_ALERT_LEVEL_ERROR, 'Close', null);
                    }
                 }
            );
        }
    };

    /********************************************************************************************************************************************
                    END CALL LOG ACTION
    **********************************************************************************************************************************************/
    var downloadCookie = "";
    $('#exportBtn').click(function(){
        var btn             = $(this),
            reportDate      = $('.report-date'),
            selectedDate    = reportDate.datepicker('getDate'),
            formatDate      = SBI.formatDateTime(selectedDate, 'm-d-Y'),
            agentId         = $('#agentId').val(),
            reportType      = $('#reportType').val(),
            url             = '/callcenter/secure/export/',
            downloadId      = reportType + '-' + new Date().getTime();
        if(reportType && !isNaN(reportType)){
            url += reportType + '?downloadId=' + downloadId;
            if(agentId){
                url += '&agentId=' + agentId;
            }
            if(formatDate){
                url += '&date=' + formatDate;
            }
            btn.attr('disabled', true);
            setupWaiting(downloadId);
            downloadURL(url);
        }else{
            SBI.showDialog('Error', 'Cannot determine what type of report to be exported.');
        }
    });
    var checkingCount = 0;
    var setupWaiting = function(downloadId){
        checkingCount = 0;
        $('.report-progress').css('display', 'block');
        $('.report-progress').find('span.progress-message').html('Please wait while pulling report...');
        this.checkDownloadInterval = setInterval(function(){
            checkingCount++;
            if(checkingCount == 10){
                stopWaiting();
            }else{
                $.getJSON(
                    '/callcenter/secure/check-download-status/' + downloadId,
                    function(json){
                        if(json.success){
                            stopWaiting();
                        }
                    }
                );
            }
        },1000);
    };

    var stopWaiting = function(){
        clearInterval(this.checkDownloadInterval);
        $('#exportBtn').removeAttr('disabled');
        $('.report-progress').css('display', 'none');
    };
    console.log('time taken in reportAction.js: %o', (new Date().getTime()-dt.getTime()));
})
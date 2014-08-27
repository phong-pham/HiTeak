/** JQuery Actions. **/
$(document).ready(function() {

    /** Execute on Load. **/
    $.getJSON(
        "callAction",
        {
            action: "load",
            facilityId: $('#fid').text(),
            uniqueCallId: getURLParameter("uniqueCallId"),
            employeeNumber: getURLParameter("employeeNumber")
        },
        function(json) { console.log(json); }
    );

    var alreadyAttemptToClose = false;
    var alreadySetUnload = false;
    var nextHREF = "";

    window.onbeforeunload = function(e) {

        if(nextHREF == "" && !alreadySetUnload)
        {
            logUnloadDateTime();

            if(dialog != null && dialog.length > 0)
            {
               if(dialog.dialog('isOpen'))
               {
                    return false;
               }
               else if(alreadyAttemptToClose == false)
               {
                   if($('#resolutionBtn').val() != 'Update Resolution')
                   {
                       alreadyAttemptToClose = true;
                       $(".ui-dialog-titlebar-close").hide();
                       dialog.dialog( "option", "buttons", [okBtnForDialog]);
                       dialog.dialog("open");
                       return false;
                   }

               }
            }
        }

    };

    function logUnloadDateTime()
    {
      $.getJSON(
        "callAction",
        {
           action: "unload",
           facilityId: $('#fid').text(),
           uniqueCallId: getURLParameter("uniqueCallId"),
           employeeNumber: getURLParameter("employeeNumber")
        },
        function(json) {
            console.log(json);

             if(nextHREF != "")
             {
                window.location = nextHREF;
             }
        }
      );
    }

    var okBtnForDialog =  {
         text: "OK",
         click: function()
         {
            $.getJSON(
               "callAction",
               {
                   action: alreadyAttemptToClose ? "unload" : "resolution",
                   resolutionCode: $('#resolutionOptions').val() == '' ? $('#resolutionOptions').options[0].value : $('#resolutionOptions').val(),
                   reasonCode: $('#reasonOptions').val() == '' ? $('#reasonOptions').options[0].value : $('#reasonOptions').val(),
                   facilityId: $('#fid').text(),
                   uniqueCallId: getURLParameter("uniqueCallId"),
                   employeeNumber: getURLParameter("employeeNumber")
               },
               function(json) {
                     console.log(json);
                     dialog.dialog("close");
                     if(alreadyAttemptToClose)
                     {
                        alreadySetUnload = true;
                        window.close();
                     }
                     else
                     {
                        $('#resolutionBtn').val('Update Resolution');
                     }
               }
           );
         }
    };

    var cancelBtnForDialog = {
        text: "Cancel",
        click: function()
        {
            $(this).dialog("close");
        }
    };

    var dialog = $('#resolution_code_dialog');
    if(dialog != null && dialog.length > 0)
    {
        dialog.dialog(
            {
                autoOpen: false,
                width: 450,
                modal: true,
                resizable: false,
                closeOnEscape: false
            }
        );
    }

    var officesDialog = $('#office_by_zip_dialog');
    if(officesDialog != null && officesDialog.length > 0)
    {
        officesDialog.dialog(
            {
                autoOpen: false,
                width: 500,
                modal: true,
                resizable: false,
                buttons:{
                    Cancel: function(){
                        $(this).dialog('close');
                    }
                }
            }
        );
    }

    $('.otherSite').click(function(e){

        alreadyAttemptToClose = true;
        e.preventDefault();
        nextHREF = e.currentTarget.href;
        if($('#resolutionBtn').val() == 'Update Resolution')
        {
            logUnloadDateTime();
            alreadySetUnload = true;
        }
        else
        {
            $.getJSON(
               "callAction",
               {
                   action: "unload",
                   resolutionCode: "GO TO NEIGHBOR OFFICE",
                   reasonCode: "NONE",
                   facilityId: $('#fid').text(),
                   uniqueCallId: getURLParameter("uniqueCallId"),
                   employeeNumber: getURLParameter("employeeNumber")
               },
               function(json) {
                    alreadySetUnload = true;
                    window.location = nextHREF;
               }
           )
        }
    });

    $(function() {
        $("#datepicker").datepicker();
    });

    $('#resolutionBtn').click(function(){

        dialog.dialog( "option", "buttons", [okBtnForDialog, cancelBtnForDialog]);
        $(".ui-dialog-titlebar-close").show();
        dialog.dialog("open");
    });

    function validatePatientID(pid)
    {
        if(pid == null || $.trim(pid).length == 0)
        {
            alert('Please enter Patient ID.')
            return false;
        }
        else
        {
            pid = $.trim(pid);
            if(!isNumeric(pid))
            {
                alert('Patient ID must be a number') ;
                return false;
            }
            else if(pid.charAt(pid.length - 1) != '0')
            {
                alert('Patient ID must end with 0.');
                return false;
            }else{
                return true;
            }
        }
    }

    function isNumeric(n)
    {
        return !isNaN(parseInt(n)) && parseInt(n) == n && n.indexOf('.') == -1;
    }

    /**
    ** BEGIN LINK PATIENT
    **/

    $('.link').click(function () {
        $('.actions').css("display", "none");
        $('.link-container').css("display", "block");
    });

    /** When linked to a QSI patient **/
    $('#linkQsiPatient').click(function () {

        var pid = $('#pid').val();
        var fid = $('#fid').text();

        var validatePID =  validatePatientID(pid);
        if(validatePID)
        {
            $.getJSON(
                "callAction",
                {
                    action: "link",
                    patientId: pid,
                    facilityId: fid,
                    uniqueCallId: getURLParameter("uniqueCallId"),
                    employeeNumber: getURLParameter("employeeNumber")
                },
                function(json) {
                    console.log(json);
                    if (json.success) {
                        $('.actions').css("display", "block");
                        $('.link-container').css("display", "none");

                        $('#patientName').text(json.name);
                    } else {
                        console.log("Failed !!! ");
                    }
                }
            );
        }

        return false;
    });

    $('#cancelLinkPatient').click(function(){
        $('.actions').css("display", "block");
        $('.link-container').css("display", "none");
        return false;
    });

    /**
    ** END LINK PATIENT
    **/

    /**
    ** BEGIN PATIENT EMAIL
    **/

    $('.email').click(function () {
        console.log("Load Email window with template to be edited.");
        $('.actions').css("display", "none");
        $('.link-container').css("display", "none");
        $('.email-container').css("display", "block");
        $('#parentTopDiv').css("height",150)
        return false;
    });

    /** When Email QSI patient is clicked **/
    $('#emailPatient').click(function () {

        var email = $('#patientEmail').val();

        var appointmentTime = $('#apptTime').val();
        var day1;
        var appointmentDate;


        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        if(email == null || $.trim(email).length == 0)
        {
            alert('Please specify patient\'s email.');
        }
        else if(!emailReg.test(email))
        {
            alert('Invalid email address.');
        }
        else if($("#datepicker").datepicker('getDate') == null)
        {
            alert('Please select appointment date.');
        }
        else
        {
            day1 = $("#datepicker").datepicker('getDate').getDate();
            var month1 = $("#datepicker").datepicker('getDate').getMonth() + 1;
            var year1 = $("#datepicker").datepicker('getDate').getFullYear();
            appointmentDate = year1 + "-" + month1 + "-" + day1 + "T" + appointmentTime;
            console.log(email + " " + appointmentDate);

            $.getJSON(
                "callAction",
                {
                    action: "email",
                    emailAddress: email,
                    patientName: $('#patientName').text(),
                    appointment: appointmentDate,
                    dnis: getURLParameter("dnis"),
                    facilityId: $('#fid').text(),
                    uniqueCallId: getURLParameter("uniqueCallId"),
                    employeeNumber: getURLParameter("employeeNumber")
                },
                function(json) {
                    console.log(json);
                    if (json.success) {
                        slideTopDivUp();
                    } else {
                        console.log("Failed !!! ");
                        alert('Failed to send email to patient.')
                    }
                }
            );
        }
        return false;
    });

    $('#cancelEmailPatient').click(function () {

        slideTopDivUp();
        return false;
    });

    function slideTopDivUp()
    {
        $('.actions').css("display", "block");
        $('.link-container').css("display", "none");
        $('.email-container').css("display", "none");
        $('.phone-container').css("display", "none");
        $('#parentTopDiv').css("height",18);
    }

    /**
    ** END PATIENT EMAIL
    **/

    /**
    ** BEGIN PATIENT PHONE
    **/

    $('.phone').click(function(){
        $('.actions').css("display", "none");
        $('.phone-container').css("display", "block");
    });

    $('#cancelPatientPhone').click(function () {
        $('.actions').css("display", "block");
        $('.phone-container').css("display", "none");
        return false;
    });

    $('#submitPatientPhone').click(function(){
        var patientPhone = $('#patientPhone').val();
        if(patientPhone == null || $.trim(patientPhone).length == 0){
            alert('Please enter patient phone.');
        }else if(patientPhone && $.trim(patientPhone).length > 14){
            alert('Patient phone is too long (max length is 14).');
        }else{
            $.getJSON(
                "callAction",
                {
                    action: "link-phone",
                    patientPhone: patientPhone,
                    dnis: getURLParameter("dnis"),
                    facilityId: $('#fid').text(),
                    uniqueCallId: getURLParameter("uniqueCallId"),
                    employeeNumber: getURLParameter("employeeNumber")
                },
                function(json) {
                    if (json.success) {
                        $('.actions').css("display", "block");
                        $('.phone-container').css("display", "none");
                    } else {
                        console.log("Failed !!! ");
                        alert('Failed to set patient phone.')
                    }
                }
            );
        }
        return false;
    });

    /**
    ** END PATIENT PHONE
    **/

    $('#searchByZipcodeBtn').click(function(){

        var zip = $('#zipInput').val();
        if(zip == null || $.trim(zip).length ==0)
        {
            alert('Please enter zip code.');
        }
        else if(!isNumeric(zip))
        {
            alert('Zip code must be whole number.');
        }
        else if(zip.length != 5)
        {
            alert('Please enter 5 digits for zip code.');
        }
        else
        {
            var uuid            = getURLParameter("uniqueCallId"),
                employeeNumber  = getURLParameter("employeeNumber");
            $.getJSON(
              "closest-facilities.json",
              {
                   zip              : zip,
                   uuid             : uuid,
                   employeeNumber   : employeeNumber
              },
              function(json)
              {
                console.log(json);
                if(json.success)
                {
                    var result = "";
                    var list = json.data;
                    officesDialog.dialog( "option", "title", list.length + " closest offices for zip code " + zip );
                    for(var i=0; i<list.length; i++)
                    {
                        var office  = list[i],
                            url     = 'load-screen-pop/psr/' + uuid + '/' + employeeNumber + '/en/2/' + office.facilityId;
                        result+= "<li><span class='label fl'>Site name:</span><a href='" + url + "'><span class='content fr title'>" + office.name + "</span></a></li>";
                        result += "<li><span class='label fl'>  Address:</span><span class='content fr'>" + office.fullAddress + "</span></li>"
                        result += "<li><span class='label fl'> Distance:</span><span class='content fr phone-sp'>" + office.distance + " miles (" + $.trim(office.time)+ " minutes)</span></li>"
                        if(i < list.length - 1)
                            result += "<li><div style='height:10px;border-top: 1px solid #bdbdbd;'></div></li>";
                    }
                    $('#display_list').html(result);
                    officesDialog.dialog('open');
                }
                else
                {
                    alert(json.message);
                }
              }
            );
        }
        return false;
    });

    function getURLParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    };

});
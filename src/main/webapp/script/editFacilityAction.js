/** JQuery Actions. **/
$(document).ready(function() {

    if($('#editor1').length > 0)
    {
        var editor = CKEDITOR.replace( 'editor1',
                    {
                        resize_enabled: false,
                        toolbar:[

                            { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript' ] },
                            { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] }
                        ]
                    });
    }
    var canUpdateMongoDB = getCookies('CALL_CENTER_SUPPORT','CAN_UPDATE_MONGODB');
    if(canUpdateMongoDB == "false")
    {
        $('#updateDBBtn').remove();
        $('#pipeBeforeMongo').remove();
        $('#progressBar').remove();
    }


/** Search Facility by Facility ID **/
    $('#searchByFIDBtn').click(function () {

        var fid = $('#fid').val();
        if(fid == "" || fid == null)
        {
           //alert('Please enter Site ID.');
           showDialog('Error', 'Please enter Site ID.', null, null, 'OK')
        }
        else
        {
           searchFacilityByID(fid);
        }
        return false;
    });

    function searchFacilityByID(fid)
    {
        $.getJSON(
            "facilityEdit",
            {
                action: "load",
                entity: "call_center_support",
                facilityId: fid
            },
            function(json) {
                console.log('hello world');
                if(json.success ==  false)
                {
                    //alert(json.message);
                    showDialog('Error', json.message, null, null, 'OK');
                }
                else
                {
                   populateView(json);
                }
            }
        );
    }

    function populateView(json)
    {
       $('#facilityDetail').css("display", "block");
       $('#siteIDlbl').text(json.facilityId);
       $('#siteNameLbl').text(json.name);
       $('#addresslbl').text(json.address);
       $('#phoneNum').val(json.mainNumber);
       $('#faxNum').val(json.faxNumber);
       $('#transferNum').val(json.transferNumber);
       $('#callCenter').val(json.callCenter);
       $('#callCenterQueue').val(json.callCenterQueue);
       if(json.callCenterSupport == 'TRUE')
       {
            $('#yesCCSupported').prop('checked',true);
       }
       else
       {
            $('#noCCSupported').prop('checked',true)
       }

       var dnisVals = json.dnisVals;
       var arr = dnisVals.split(",");
       var options = '';
       var selectedIndex = json.selectedIndex;
       for(var i=0; i<arr.length; i++)
       {
            options += '<option value="' + arr[i] + '"';
            if(i == selectedIndex)
                options += ' selected="selected"';
            options += '>' + arr[i] + '</option>';
       }
       $('#dnisOptions').html(options);
    }

    $('#updateDBBtn').click(function(){


        manipulateButtons(false);
        $('#progressBar').css('display','inline');

        $.getJSON(
            "facilityEdit",
            {
                action: "update-mongoDB"
            },
            function(json) {
                $('#progressBar').css('display','none');
                manipulateButtons(true);
                console.log(json);
                if (json.success)
                {
                    //alert('Mongo DB is successfully updated.')
                    showDialog('Message', 'Mongo DB is successfully updated.', null, null, 'OK')
                }

            }
        );
        return false;

    });

    var doAddNewFacility = false;
    var doAddNewDNIS = false;

    var dialogBox = $('#dialog_box');
    if(dialogBox != null && dialogBox.length > 0)
    {
        dialogBox.dialog(
            {
                autoOpen: false,
                width: 380,
                modal: true,
                resizable: false
            }
        );
    }

    var okBtnForDialog =  {
         text: "OK",
         click: function()
         {

         }
    };

    var cancelBtnForDialog = {
        text: "Cancel",
        click: function()
        {
            $(this).dialog("close");
        }
    };

    function showDialog(title,message,okHandler, okBtnLabel, cancelBtnLabel)
    {
        dialogBox.dialog('option','title', title);
        $('#dialog_message').html(message);
        cancelBtnForDialog.text = cancelBtnLabel;
        if(okHandler != null)
        {
            okBtnForDialog.text = okBtnLabel;
            okBtnForDialog.click = okHandler;
            dialogBox.dialog('option', 'buttons', [okBtnForDialog,cancelBtnForDialog]);
        }
        else
        {
            dialogBox.dialog('option', 'buttons', [cancelBtnForDialog]);
        }

        dialogBox.dialog('open');
    }

    function deleteDNIS()
    {
        dialogBox.dialog('close');
       $.getJSON(
          "facilityEdit",
          {
              action: 'delete-dnis',
              dnis: $('#dnisOptions').val(),
              facilityId: $('#siteIDlbl').text(),
          },
          function(json) {
                console.log(json);
                if(json.success)
                {
                    //dialog.dialog("close");
                    var message = json.message;
                    if(message == null)
                    {
                        populateView(json);
                    }
                    else
                    {
                        showDialog('Message', message, null, null, 'OK');
                        $('#facilityDetail').css('display', 'none');
                    }

                }
                else
                {
                    showDialog('Error',json.message,null,null, 'OK');
                }
          }
       );
    }

    function manipulateButtons(enable)
    {
        var buttons = $(':submit');
        for(var i=0; i < buttons.length; i++)
        {
            var button = buttons[i];
            if(enable)
            {
                $('#'+ button.id).removeAttr('disabled');
                $('#'+ button.id).css('background','url("../images/icon-bg.jpg") repeat-x');
            }
            else
            {
                if(button.id == 'saveBtn' && (doAddNewDNIS  || doAddNewFacility))
                {

                }
                else if(button.id == 'cancelBtn' && (doAddNewDNIS  || doAddNewFacility))
                {

                }
                else
                {
                    $('#'+ button.id).attr('disabled','disabled');
                    $('#'+ button.id).css('background', 'none');
                }
            }
        }
    }
    $('#dnisOptions').change(function () {
        var dnis    = $('#dnisOptions').val(),
            fid     = $('#siteIDlbl').text();

        if (dnis !== null && dnis !== '') {
            $.getJSON(
                "facilityEdit", {
                    action      : "load",
                    entity      : "call_center_support",
                    facilityId  : fid,
                    dnis        : dnis
                },
                function (json) {
                    if (json.success) {
                        populateView(json);
                    } else {
                        //alert('Cannot load information for ' + dnis);
                        showDialog('Error','Cannot load information for ' + dnis + '.', null, null, 'OK');
                        $('#facilityDetail').css("display", "none");
                    }
                }
            );
       }
       return false;
    });

    $('#addNewFacilityBtn').click(function () {
        doAddNewFacility = true;

        modifyViewForAdd(true);
        manipulateButtons(false);

        $('#facilityDetail').css("display", "block");

        $('#siteNameLbl').text('');
        $('#addresslbl').text('');
        $('#fidInput').val('');
        $('#dnisInput').val('');
        $('#phoneNum').val('');
        $('#faxNum').val('');
        $('#transferNum').val('');
        $('#callCenter').val('');
        $('#callCenterQueue').val('');

        $('#yesCCSupported').prop('checked', true);
        $('#noLSupported').prop('checked', true);

        return false;
    });

    function isNumeric(n) {
        return !isNaN(parseInt(n)) && parseInt(n) === +n && n.indexOf('.') === -1;
    }

    $('#saveBtn').click(function () {
        var dnis                = (doAddNewFacility || doAddNewDNIS) ? $('#dnisInput').val() : $('#dnisOptions').val(),
            fid                 = (doAddNewFacility) ? $('#fidInput').val() : $('#siteIDlbl').text(),
            phoneNumber         = $('#phoneNum').val(),
            faxNumber           = $('#faxNum').val(),
            transferNumber      = $('#transferNum').val(),
            callCenter          = $('#callCenter').val(),
            callCenterQueue     = $('#callCenterQueue').val(),
            callCenterSupported = $("input:radio[name=ccSupported]:checked").val() == 'Yes' ? 'Y' : 'N',
            libertySupported    = $("input:radio[name=lSupported]:checked").val() == 'Yes' ? "TRUE" : "FALSE",
            action              = 'edit-facility';

        dnis = $.trim(dnis);
        fid = $.trim(fid);
        if (doAddNewFacility) {
            action = 'add-facility';
        } else if (doAddNewDNIS) {
            action = 'add-dnis';
        }

        if (fid === null || $.trim(fid).length === 0) {
            //alert('Please enter Site ID.');
            showDialog('Error','Please enter Site ID.', null, null, 'OK');
        } else if (dnis === null || $.trim(dnis).length === 0) {
            //alert('Please enter DNIS.');
            showDialog('Error','Please enter DNIS.', null, null, 'OK');
        } else if (!isNumeric(dnis)) {
            showDialog('Error', 'DNIS must be whole number.');
        } else if (dnis.length > 10) {
            showDialog('Error', 'DNIS cannot be longer than 10 digits');
        } else if (phoneNumber === null || $.trim(phoneNumber).length === 0) {
            //alert('Main Number cannot be empty');
            showDialog('Error','Main Number cannot be empty.', null, null, 'OK');
        } else if (callCenter.length > 25) {
            //alert('Call Center cannot be longer than 25 characters.')
            showDialog('Error','Call Center cannot be longer than 25 characters.', null, null, 'OK');
        } else if (callCenterQueue.length > 25) {
            //alert('Call Center Queue cannot be longer than 25 characters.')
            showDialog('Error','Call Center Queue cannot be longer than 25 characters.', null, null, 'OK');
        } else {
            $.getJSON(
                "facilityEdit", {
                    action              : action,
                    facilityId          : fid,
                    dnis                : dnis,
                    phoneNumber         : phoneNumber,
                    faxNumber           : faxNumber,
                    transferNumber      : transferNumber,
                    callCenter          : callCenter,
                    callCenterQueue     : callCenterQueue,
                    callCenterSupported : callCenterSupported,
                    libertySupported    : libertySupported
                },
                function (json) {
                    console.log(json);
                    //alert(json.message);
                    if (json.success) {
                        if (action === 'add-facility' || action === 'add-dnis') {
                            doAddNewDNIS = false;
                            doAddNewFacility = false;
                            populateView(json);
                            modifyViewForAdd(false);
                            manipulateButtons(true);
                        }
                    } else {
                        showDialog('Error', json.message, null, null, 'OK');
                    }
                }
            );
        }
        return false;
    });

    $('#cancelBtn').click(function(){

        doAddNewDNIS = false;
        doAddNewFacility = false;

        modifyViewForAdd(false);
        manipulateButtons(true);

        var fid = $('#siteIDlbl').text();
        if(fid != null && fid != '')
        {
            searchFacilityByID(fid);
        }
        else
        {
           $('#facilityDetail').css("display", "none");
        }
        return false;
    });

    function modifyViewForAdd(doAdd)
    {
        $('#cancelBtn').css('display',doAdd ? 'inline' : 'none');

        $('#siteNameLI').css('display',doAddNewFacility ? 'none' : 'block');
        $('#siteIDLI').css('display',doAddNewFacility ? 'none' : 'block');
        $('#addressLI').css('display',doAddNewFacility ? 'none' : 'block');
        $('#dnisLI').css('display',doAdd ? 'none' : 'block');

        $('#fidInputLI').css('display',doAddNewFacility ? 'block' : 'none');
        $('#dnisInputLI').css('display',doAdd ? 'block' : 'none');
    }

    $('#addDNISLink').click(function()    {

        doAddNewDNIS = true;

        manipulateButtons(false);
        modifyViewForAdd(true);
        $('#dnisInput').val('');
        return false;
    });

    $('#deleteDNISLink').click(function(){

        var dnis = $('#dnisOptions').val();
        var extraMsg = $('#dnisOptions option').length == 1 ? ' This is the only DNIS associates with this Facility.' : '';
        showDialog('Confirm', 'Are you sure you would like to delete DNIS ' + dnis + "?" + extraMsg, deleteDNIS,'Yes', 'No');
        return false;
    });

    $('#searchNotesByFIDBtn').click(function () {

        var fid = $('#fid').val();
        if(fid == "" || fid == null)
        {
           //alert('Please enter Site ID.');
           showDialog('Error','Please enter Site ID.', null, null, 'OK');
        }
        else
        {
            $.getJSON(
                "facility.json",
                {
                    uuid            : 'abc123',
                    facilityId      : fid,
                    employeeNumber  : 102029
                },
                function(json) {
                    if(json.success ==  false)
                    {
                        //alert(json.message);
                        showDialog('Error',json.message, null, null, 'OK');
                    }
                    else
                    {
                        var data = json.data || {}
                        $('#facilityNotes').css("display", "block");
                        $('#siteIDlbl').text(data.facilityId);
                        $('#siteNameLbl').text(data.name);
                        $('#addresslbl').text(data.fullAddress)
                        SetContents(data.message);
                    }
                }
            );
        }
        return false;
    });

    $('#saveNoteBtn').click(function(){

        var notes = GetContents();
        var fid = $('#siteIDlbl').text();
        if(notes.length > 2000)
        {
            //alert('Notes cannot be longer than 2,000 characters.');
            showDialog('Error','Notes cannot be longer than 2,000 characters.', null, null, 'OK');
        }
        else
        {
           $.postJSON(
             "facility-message-update/" + fid,
             {
                notes: notes
             },
             function(json){
                console.log(json);
                //alert(json.message);
                showDialog(json.success? 'Message' : 'Error',json.message, null, null, 'OK');
             }
           );
        }
        return false;
    });

    function SetContents(value)
    {
    	// Get the editor instance that we want to interact with.
    	var oEditor = CKEDITOR.instances.editor1;

    	// Set editor contents (replace current contents).
    	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#setData
    	oEditor.setData( value );
    }

    function GetContents()
    {
    	// Get the editor instance that you want to interact with.
    	var oEditor = CKEDITOR.instances.editor1;

    	// Get editor contents
    	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#getData
    	var content = oEditor.getData();
    	console.log( oEditor.getData() );
    	return content;
    }

});

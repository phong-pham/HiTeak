$(document).ready(function() {
    $('#submitCatalogRequest').click(function(){
        var requestForm = $('#requestCatalogForm');
        if(HiTeak.validateForm(requestForm)){
            console.log('about to post catalog request');
        }
    });
});
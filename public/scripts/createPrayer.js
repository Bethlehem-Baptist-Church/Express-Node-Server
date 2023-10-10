const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    let spanTag = `<svg style="width: 50px; height: 50px; padding-top: 20px; display: inline;" class="bi shrink-0 me-1" role="img" aria-label="Info:"><use xlink:href="#check-circle-fill"/></svg>`;
    if(type === 'danger') {
        spanTag = `<svg style="width: 50px; height: 50px; padding-top: 20px; display: inline;" class="bi shrink-0 me-1" role="img" aria-label="Info:"><use xlink:href="#exclamation-triangle-fill"/></svg>`;
    }
    wrapper.innerHTML = [
        `<div id="alertNotification" class="alert alert-${type} alert-dismissible animate__animated animate__slideInLeft myAlert-top" style="margin: 0px; height: 100px;" role="alert">`,
        `<div style="display: inline;">${spanTag}</div>`,
        `<div style="font-size: xx-large; display: inline; padding-top: 10px;">${message}</div>`,
        '<button type="button" onclick="$(\'#overlayAlert\').fadeOut()" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="margin-top: 25px; margin-right: 10px;"></button>',
        '</div>'
    ].join('');
    alertPlaceholder.append(wrapper);
}
const alertTrigger = document.getElementById('submitButton');
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        const alertList = document.querySelectorAll('.alert');
        const alerts = [...alertList].map(element => new bootstrap.Alert(element));
        alerts.forEach(alert => alert.close());
        const payload = {
            //"title": $('#title').val(),
            "category": $('#category option:selected').text(),
            "prayerRequest": $('#prayerRequest').val()
        };
        if(null == payload.category || payload.category.length < 1){$('#overlayAlert').fadeIn();appendAlert('Error', 'danger');document.getElementById('liveAlertPlaceholder').scrollIntoView();$('#category').css("border", "5px solid red");return;}else{$('#category').css("border", "3px solid green");}
        //if(null == payload.title || payload.title.length < 1){appendAlert('Title is required.', 'danger');document.getElementById('alertNotification').scrollIntoView();$('#title').css("border", "5px solid red");return;}else{$('#title').css("border", "3px solid green");}
        if(null == payload.prayerRequest || payload.prayerRequest.length < 1){$('#overlayAlert').fadeIn();appendAlert('Error', 'danger');document.getElementById('liveAlertPlaceholder').scrollIntoView();$('#prayerRequest').css("border", "5px solid red");return;}else{$('#prayerRequest').css("border", "3px solid green");}
        $('#overlay').fadeIn();
        $.ajax({
            url: '/prayer/submit',
            type: 'POST',
            data : payload,
            success: function(ajaxResponse){
                //$('#title').val('');
                $('#category').val('1').change();
                $('#prayerRequest').val('');
                //$('#title').css("border", "0px solid black");
                $('#category').css("border", "0px solid black");
                $('#prayerRequest').css("border", "0px solid black");
                $('#overlayAlert').fadeIn();
                appendAlert('Success', 'success');
                document.getElementById('liveAlertPlaceholder').scrollIntoView();
                $('#overlay').fadeOut();
            },
            error: function(err){
                console.log(err);
                $('#overlayAlert').fadeIn();
                appendAlert('Error', 'danger');
                document.getElementById('liveAlertPlaceholder').scrollIntoView();
                $('#overlay').fadeOut();
            }
        });
    })
}
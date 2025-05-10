function fetchData() {
    var apiUrl = "https://bplo-admin.keridelivery.com/requests/trackingid/"
    var trackingId = document.getElementById("trackingInput").value;
    const indicator = [...document.querySelectorAll('.li')];
    var currentStep;

    fetch(apiUrl + trackingId)
    .then(response => {
        if(!response.ok) {
            document.querySelector('#status').innerHTML = '<span>--</span>'
            document.querySelector('#trackingId').innerHTML = `<span>Enter Valid Tracking ID</span>` 
            for(var i = 0; i < indicator.length; i++) {
                if(indicator[i].classList.contains('complete')) {
                    indicator[i].classList.remove('complete');
                }
            }
            throw Error("Error!");
        }

        for(var i = 0; i < indicator.length; i++) {
            if(indicator[i].classList.contains('complete')) {
                indicator[i].classList.remove('complete');
            }
        }
        return response.json();
    })
    .then(data => {
        if(data.status_override == true) {
            if(data.actual_status == "For Pickup") { currentStep = 0; }
            if(data.actual_status == "In Transit to BPLO") { currentStep = 1; document.querySelector('#status').innerHTML = `<span>In Transit</span>`} 
            if(data.actual_status == "Under Verification") { currentStep = 2; }
            if(data.actual_status == "BPLO Processing") { currentStep = 3; document.querySelector('#status').innerHTML = `<span>Processing</span>`  }
            if(data.actual_status == "For Delivery") { currentStep = 4;  }
            if(data.actual_status == "In Transit to Client") { currentStep = 5;  }
            if(data.actual_status == "Delivered") {  currentStep = 6;  }

            document.querySelector('#status').innerHTML = `<span>${data.actual_status}</span>` 
            document.querySelector('#trackingId').innerHTML = `<span>${data.tracking_id}</span>` 
            for(var i = currentStep; i < indicator.length && i > -1; i--) {
                const currentStatus = indicator[i];
                currentStatus.classList.add('complete');
            }
        }

        else if (data.status_override == false) {
            if(data.status == "For Pickup") { currentStep = 0; }
            if(data.status == "In Transit to BPLO") { currentStep = 1; document.querySelector('#status').innerHTML = `<span>In Transit</span>`}
            if(data.status == "Under Verification") { currentStep = 2; }
            if(data.status == "BPLO Processing") { currentStep = 3; document.querySelector('#status').innerHTML = `<span>Processing</span>`}
            if(data.status == "For Delivery") { currentStep = 4;  }
            if(data.status == "In Transit to Client") { currentStep = 5;  }
            if(data.status == "Delivered") {  currentStep = 6;  }

            document.querySelector('#status').innerHTML = `<span>${data.status}</span>` 
            // document.querySelector('#trackingId').innerHTML = `<span>${data.tracking_id}</span>` 
            for(var i = currentStep; i < indicator.length && i > -1; i--) {
                const currentStatus = indicator[i];
                currentStatus.classList.add('complete');
            }
        }
    })
    .catch(error => {
        console.log(error)
    })
}

$('#trackerModal').on('hidden.bs.modal', function() {
    $('#trackingInput').val('');
    fetchData();
})
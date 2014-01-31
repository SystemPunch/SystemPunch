function submitContactForm() {
    $("#nameGroup").removeClass("has-error");
    $("#emailGroup").removeClass("has-error");
    $("#messageGroup").removeClass("has-error");

    var hasError = false;

    if ($("#contactName").val()) {
        var $name = $("#contactName").val();
        $("#contactName").tooltip("hide");
    } else {
        $("#nameGroup").addClass("has-error has-feedback");
        $("#nameGroup").append("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
        $("#contactName").tooltip({
            placement: "left",
            title: "You must enter a name!",
            trigger: "manual"
        });
        $("#contactName").tooltip("show");
        hasError = true;
    }

    if ($("#contactEmail").val()) {
        var $email = $("#contactEmail").val();
        $("#contactEmail").tooltip("hide");
    } else {
        $("#emailGroup").addClass("has-error has-feedback");
        $("#emailGroup").append("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
        $("#contactEmail").tooltip({
            placement: "left",
            title: "You must enter a valid email!",
            trigger: "manual"
        });
        $("#contactEmail").tooltip("show");
        hasError = true;
    }

    if ($("#contactMessage").val().length >= 30) {
        var $message = $("#contactMessage").val();
        $("#contactMessage").tooltip("hide");
    } else {
        $("#messageGroup").addClass("has-error has-feedback");
        $("#messageGroup").append("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
        $("#contactMessage").tooltip({
            placement: "left",
            title: "You must enter "+ (30-$("#contactMessage").val().length) +" more character(s)!",
            trigger: "manual"
        })
            .attr("data-original-title", "You must enter "+ (30-$("#contactMessage").val().length) +" more character(s)!")
            .tooltip("fixTitle");
        $("#contactMessage").tooltip("show");
        hasError = true;
    }

    if(!hasError) {
        var dataString = "contactName=" + $name + "&contactEmail=" + $email + "&contactMessage=" + $message;

        $("#contactSubmit").prop("disabled", true);

        var request = $.ajax({
            url: "/resources/php/contact.php",
            type: "post",
            data: dataString,
            dataType: "json",
            success: function (d) {
                $("#statusMessage").html(d.message);
                if (d.status !== "success") $("#contactSubmit").prop("disabled", false);
            }
        });
    }
}
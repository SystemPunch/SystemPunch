<?php
    function spamcheck($field) {
        $field = filter_var($field, FILTER_SANITIZE_EMAIL);

        if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
            return TRUE;
        }
        else {
            return FALSE;
        }
    }

    if(isset($_POST["contactEmail"])) {
        $mailcheck = spamcheck($_POST["contactEmail"]);
        if($mailcheck == FALSE) {
            $statusMessage = "There was something wrong with your email. Please double check it to make sure it is complete and valid.";
            $statusArray = array(
                "status"=>"failed"
            );
        }
        else {
            $name = $_POST["contactName"];
            $email = $_POST["contactEmail"];
            $message = $_POST["contactMessage"];
            $subject = "Message from SystemPunch Contact Form";
            $body = "Name: $name\r\n\r\nEmail: $email\r\n\r\nMessage:\r\n$message";

            mail("Jesse@SystemPunch.com",$subject,$body,"From: SystemPunch");

            $statusMessage = "Your message was sent successfully!";
            $statusArray = array(
                "status"=>"success"
            );
        }
    }
    else {
        $statusMessage = "You somehow managed to submit the form without an email address! Please fill one in.";
        $statusArray = array(
            "status"=>"failed"
        );
    }

    $statusArray["message"] = $statusMessage;
    echo json_encode($statusArray);
?>
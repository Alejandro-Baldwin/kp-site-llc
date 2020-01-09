<?php

if (isset($_POST['submit'])) {
$name = $_POST['name'];
$subject = $_POST['subject'];
$mailFrom = $_POST['email'];
$date = $_POST['date'];
$message = $_POST['email-message'];

$mailTo = "info@kopoproductions.com";
$headers = "From: ".$mailFrom;
$txt = "You have received an e-mail from ".$name.".\n\n"."For the date(s) of: ".$date.".\n\n".$message;

mail($mailTo, $subject, $txt, $headers);
header("Location: contact-us.html?mailsend");
}
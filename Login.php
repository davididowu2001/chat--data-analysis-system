<!DOCTYPE html>
<?php require 'generalPHP.php'; ?>
<?php
	$msg = "";

	if (isset($_POST['submit'])) {
		$email = $_POST['email'];
		$password = $_POST['password'];
		$trimEmail = trim($email);
		$msg = login($trimEmail,$password);
		
	}
?>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="general.css">
  </head>
  <body>
  <!-- Make-IT-All logo -->
	<div id="banner"><img src="makeitallLogo.png"></div>
	<!-- Container for web page contents -->
    <div class="container">
		<!-- Wrapper to contain form contents -->
		<div class="wrapper">
			<!-- Title of form -->
			<div class="title"><span>Login</span></div>
			<br>
			<div class= "desc">
			Please enter your registered email and password to login.
			</div>
			<!-- Error message -->
			<div align="center" style = "color: #cc3300; font-size: 13px;" >
			<?php if ($msg != "") echo $msg . "<br>"; ?>
			</div>
			<!-- Form -->
			<form method="post" action="Login.php" class = "login-form">
			  <div class="row">
				<input type="text" name="email" placeholder="Email" maxlength="80" required>
			  </div>
			  <div class="row">
				<input type="password" name="password" placeholder="Password" maxlength="100" required>
			  </div>
			  <div class="row">
			  <a href="ForgotPsw.php" style="color: #bc8128; float: right;">Forgot password?</a>
			  </div>
			  <div class="row">
			  <div class="row button">
				<input type="submit" name = "submit" value="Login" id="login-form-submit">
			  </div>
			</form>
      </div>
    </div>
  </body>
</html>
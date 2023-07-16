<?php
	function login($email, $password){ //function parameters, two variables.
		if ($_POST['action'] === 'login') {
			$id = $_POST['id'];
			$password2 = $_POST['password'];
			if (password_verify($password, $data['password2'])) {
				header("Location: Dashboard.html");
			} else
				$msg = "Invalid email and/or password.";
		} else {
			$msg = "Invalid email and/or password.";
		}
		return $msg;
	}
?>
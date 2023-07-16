<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="Chat.css">
	<link rel="stylesheet" href="General.css">
  </head>
  
  <body>
  <!-- Adds Navbar-->
	<?php include 'Navbar.php';?>
	<div class="page-content">
	<div class="content">
	
	
	<div class="container px-auto pb-2">
	<br>
        <p class="title h1" style="text-align:center;">Your Information</p>
    </div>
	<div class="container-fluid mt-5 px-auto" style="width:80%;">
			<hr>
			<br>
			<br>
			<!-- Account Information -->
			<div id="profileInfo">
				
				<div class="row"><div class="col-4">First Name: </div>
				<div class="col-8" id="firstname"><?//php echo $_SESSION["fname"]?></div></div><br>
				<div class="row"><div class="col-4">Last Name: </div>
				<div class="col-8" id="lastname"><?//php echo $_SESSION["sname"]?></div></div><br>
				<div class="row"><div class="col-4">Email: </div>
				<div class="col-8" id="email"><?//php echo $_SESSION["email"]?></div></div>
				<br>
			</div>
			<br>
			<br>
		</div>
			
	</div>
	</div>

</body>
</html>
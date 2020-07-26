<div id="app" class="center">
	<h2>Please provide the following information</h2>
	
	<br>

	<input id="pluginName" type="text" placeholder="Plugin Name"></input><br><br>
	<input id="pluginDesc" type="text" placeholder="Plugin Description"></input><br><br>
	
	<select id="pluginVersion">
		<option value="1.8">1.8</option>
		<option value="1.9">1.9</option>
		<option value="1.10">1.10</option>
		<option value="1.11">1.11</option>
		<option value="1.12">1.12</option>
		<option value="1.13">1.13</option>
		<option value="1.14">1.14</option>
		<option value="1.15">1.15</option>
		<option value="1.16">1.16</option>
	</select>
	
	<br><br>

	<button id="pluginCreateButton" class="button">Create Plugin</button>
</div>

<script>
	document.getElementById("pluginCreateButton").onclick = function() {
		var pluginName = document.getElementById("pluginName").value;
		var pluginDesc = document.getElementById("pluginDesc").value;
		var pluginVersion = document.getElementById("pluginVersion").value;
		
		app = new App(pluginName, pluginDesc, pluginVersion);
		app.loadPage("./builder.php", function() {
			app.load();
		});
	}
</script>

<script src="./js/app.js?time=<?php echo time(); ?>"></script>

<link rel="stylesheet" type="text/css" href="./css/create.css">
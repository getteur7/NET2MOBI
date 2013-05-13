<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>net2mobi - database test (+mvc)</title>
</head>

<body>
	<h1>Database test</h1>
	<?php
		$this->load->model('site_model');
		
		//Les champs de la table site : nom_site, code, type_site
		//save
		//$this->site_model->save('mon_site', 'test');
		
		//update
		//$data = array();
		//$data['nom_site'] = 'ma_site';
		//$this->site_model->update(10, $data);
		
		//delete
		//$this->site_model->delete(10);
	?>
	
	<?php foreach($sites as $row): ?>
		<p><?php echo $row->nom_site; ?></p>
	<?php endforeach; ?>
</body>
</html>

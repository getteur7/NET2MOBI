<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Net2mobi extends CI_Controller
{
	const PATH_SUBDOMAINS = '/var/vhosts/net2.mobi/'; //Sous linux, on met un / au d�but
	
	public function index()
	{
		//On ne peut acc�der directement a la page s�curis�e
		//si la session est expir�e
		$login = $this->session->userdata('nm_login');
		$pwd = $this->session->userdata('nm_pwd');
		$res = $this->profil_model->authentify($login, $pwd);
                if($res)
		{
			//$this->load->view('ci_header');
			$this->load->view('net2mobi');
		}
		else
		{
			$data = array();
			$data['err_msg'] = 'Vous devez vous authentifier';
			
			$this->load->view('welcome', $data);
		}
	}
	
	public function logout()
	{
		$this->session->sess_destroy();
		$this->load->view('welcome');
	}
	
	public function check_domain_name()
	{
		$domain_name = $this->input->post('dname');
		
		$this->load->model('site_model');

		if(!$this->site_model->checkDomainNameGrammar($domain_name))
			echo "res_invalid_dname";
		else
		{	
			if($this->site_model->checkDomainNameIfExists($domain_name))
				echo "res_dname_exists";
			else
				echo "res_valid_dname";
		}
	}
	
	//public function create_domain()
//	{
//		$domain_name = $this->input->post('domain_name');
//		if($domain_name == "") return;
//		
//		//$path = self::PATH_SUBDOMAINS.$domain_name; //Sous windows
//		$path = '/'.self::PATH_SUBDOMAINS.$domain_name; //Sous linux
//		
//		if(file_exists($path))
//		{
//			echo 'res_err';
//			return;
//		}
//		
//		//Si le r�pertoire n'�xiste pas, alors logiquement le fichier n'�xiste pas
//		$res = mkdir($path, 0777);
//		
//		$filename = $path.'/index.html';
//		$template_name = '../../assets/templates/index_mobi.html';
//		
//		$tags = array();
//		$tags['tag_title'] = "Votre nouveau nom de domaine";
//		$tags['tag_welcome_tag'] = "Votre nom de domaine ".$domain_name." est disponible";
//		
//		$this->load->library('fileutilities');
//		$res = $this->fileutilities->createIndexFromTemplate($template_name, $filename, $tags);
//		
//		if($res) echo "http://www.".$domain_name.".net2.mobi";
//	}
	
	public function create_domain()
	{
		$domain_name = $this->input->post('domain_name');
		if($domain_name == "") return;

		$path = '/var/vhosts/net2.mobi/'.$domain_name; //Sous linux
		//$path = 'var/vhosts/net2.mobi/'.$domain_name; //Sous windows
		
		if(file_exists($path))
		{
			echo 'res_err';
			return;
		}
		
		//Si le r�pertoire n'�xiste pas, alors logiquement le fichier n'�xiste pas
		$res = mkdir($path, 0777);
				
		$filename = $path.'/index.html';
		$fp = fopen($filename, 'w');
		fputs($fp, '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');fputs($fp, "\n");
		fputs($fp, '<html xmlns="http://www.w3.org/1999/xhtml">');fputs($fp, "\n");
		fputs($fp, '<head>');fputs($fp, "\n");
		fputs($fp, '<meta http-equiv="Content-Type" content="text/html;" charset="utf_8" />');fputs($fp, "\n");
		fputs($fp, "<title>Votre nom de domaine - $domain_name</title>");fputs($fp, "\n");
		fputs($fp, '</head>');fputs($fp, "\n");
		fputs($fp, '<body>');fputs($fp, "\n");
		fputs($fp, "<h1>Votre nom de domaine www.$domain_name.net2.mobi est disponible</h1>");fputs($fp, "\n");
		fputs($fp, "<strong>Veuillez enregistrer vitre site sur</strong> <a href='".base_url()."'>ce lien</a> <strong>pour l'activer</strong>");fputs($fp, "\n");
		fputs($fp, '</body>');fputs($fp, "\n");
		fputs($fp, '</html>');
		fclose($fp);
			
		//retourne le nom de domaine nouvellement cr��
		echo "http://www.".$domain_name.".net2.mobi";
	}
}
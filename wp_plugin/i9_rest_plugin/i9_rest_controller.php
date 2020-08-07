<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Plugin Name: i9 REST Controller 
 * Plugin URI: http://meta.eti.br
 * Description: i9 REST
 * Author: cloud9.dev.br
 * Version: 0.0.8
 * License: LGPL version 2.1
 * Network: True
 */

/*
* 0.0.1  - Criação - https://developer.wordpress.org/rest-api/extending-the-rest-api/controller-classes/
*/




/*


sudo apt-get install php7.4-xml





*/


define('i9_REST_MUST_BE_LOGGED_IN',FALSE); // false, qquer um lÃª o REST


// ##########################################################
// ###  INICIO Bloqueia todos os acessos REST a quem nÃ£o estÃ¡ logado.
// ###  OK, testado para somente leitura tb e com oAuth ativo.
// #####
add_filter( 'rest_authentication_errors', function( $result ) {
    if ( ! empty( $result ) ) {
        return $result;
    }

    if ( ! i9_REST_MUST_BE_LOGGED_IN) return;

        if ( ! is_user_logged_in() ) {
            return new WP_Error( '401', 'Desculpe, Ã© preciso estar logado para esse tipo de requisiÃ§Ã£o.(Global Blocker)', array( 'status' => 401 ) );
        }
        return $result;
    }
);


class i9_rest_class_controller {

	public function __construct() {
		$this->namespace            = 'i9/v1';
		$this->resource_youtube        = 'youtube_canal';
		// $this->resource_password    = 'dyn_senha';
		// $this->resource_category    = 'dyn_categorias';
		// $this->resource_convenios   = 'dyn_convenios';
		// $this->resource_convenio    = 'dyn_convenio';
		// $this->resource_geolocation = 'dyn_geolocation';
		// $this->resource_geodistance = 'dyn_geodistance';
		// $this->resource_faleconosco = 'dyn_faleconosco';
		// $this->resource_irregular   = 'dyn_irregular';
		// $this->resource_post_publico= 'dyn_public_posts';
		// $this->api_version          = '0.4.0';
		// $this->dirLeituraGravacao   = ABSPATH . 'dynamus_autoapi/dyn_cache_dir';
		// $this->arqLog               = ABSPATH . 'dynamus_autoapi/logs/log_rest_controller.log';
		// $this->debug                = true;
		$this->timeStart            = microtime( true );

    }
    

	// Register our routes.
	public function register_routes() {


		register_rest_route( $this->namespace, '/' . $this->resource_youtube, array(
            array(
                    'methods'   => 'GET',
                    'callback'  => array( $this, 'get_youtube' ),
        // CAN READ			'permission_callback' => array( $this, 'get_items_permissions_check' ),
            ),
            // Register our schema callback.
            'schema' => array( $this, 'get_item_schema' ),
	    ) );


        register_rest_field('page','content', array(
            array(
                   'get_callback'    => 'compasshb_do_shortcodes',
                   'update_callback' => null,
            ),
                   'schema'          => array( $this, 'get_item_schema' ),// null,
            
        ));
  

	}
///////////////////////////


    public function compasshb_do_shortcodes( $object, $field_name, $request )
    {
    WPBMap::addAllMappedShortcodes(); // This does all the work

    global $post;
    $post = get_post ($object['id']);
    $output['rendered'] = apply_filters( 'the_content', $post->post_content );

    return $output;
    }



    /////////////////////////

    public function get_youtube( $request ) {

        // Carrega os dados do cache
        /*
		$dataLoaded = $this->dynamus_cache_get('mobile_cache', $this->dirLeituraGravacao);


		$mobileOutput
		= array (
				'status'           => 'Success',
				'message'          => '',
				'ver'              => $this->api_version,
				'exec_time_sec'    => 0,
				'loaded'           => $dataLoaded ? "true" : "false",
				'img_logado'       => get_user_meta ( 1, 'roles_app_img_logado', true ),
				'img_cartao_top'   => get_user_meta ( 1, 'roles_app_img_cartao_top', true ),
				'img_cartao_dyn'   => get_user_meta ( 1, 'roles_app_img_cartao_dyn', true ),
				'texto_cartao'     => get_user_meta ( 1, 'roles_app_texto_cartao', true ),
				'categorias'       => array()
				
		);

        */

    // erro ao usar    header('Content-type: application/xml');
        $respXML =  file_get_contents('https://www.youtube.com/feeds/videos.xml?channel_id=UCexdKUQ25mhIv42KS6nVgLQ');

		$resposta = trim( $respXML );

        //Convert the XML string into an SimpleXMLElement object.
        $xmlObject = simplexml_load_string($respXML);

        //Encode the SimpleXMLElement object into a JSON string.
        $jsonString = json_encode($xmlObject);

        //Convert it back into an associative array for
        //the purposes of testing.
        $jsonArray = json_decode($jsonString, true);

        //var_dump out the $jsonArray, just so we can
        //see what the end result looks like
        //var_dump($jsonArray);

/*
		$categoryArray = (array)$dataLoaded['categories'];
		// print_r ( $categoryArray['categories'] );

		$position = 0;

		foreach ($categoryArray as  $categoryID => $categoryRaw){

			$categoryData = (array) $categoryRaw;

			$mobileOutput['categorias'][$position++] =
			array ('term_id' => $categoryData['term_id'],
				   'name'    => $categoryData['name'],
				   'slug'    => $categoryData['slug']
			);

		}
*/

		// Return all of our comment response data.
// erro		$jsonString['exec_time_sec'] = microtime( true ) - $this->timeStart;


        // erro return $jsonArray;
        // 
		// 
		// return rest_ensure_response( $jsonArray ); // JSON
		// return rest_ensure_response( $respXML ); //  // string gigante, nao le
		// return rest_ensure_response( $resposta ); // string gigante, nao le
		
		
		return rest_ensure_response( $xmlObject ); // JSON
		
	}


    // OK
    public function i9create_api_pages_meta_field() {

        // register_rest_field ( 'name-of-post-type', 'name-of-field-to-return', array-of-callbacks-and-schema() )
        register_rest_field( 'page', 'i9page_meta_fields', 
            array(
                'get_callback' => array( $this, 'i9get_page_meta_for_api'), 
                'schema' => null,
            )
        );

    }

    public function i9get_page_meta_for_api( $object ) {
        //get the id of the post object array
        $post_id = $object['id'];

        //return the page meta
        return get_post_meta( $post_id );
    }

} //class


function i9_initialize_controller(){
    
    $controller = new i9_rest_class_controller();
    $controller->i9create_api_pages_meta_field();
    $controller->register_routes();

}

add_action( 'rest_api_init', 'i9_initialize_controller' );


/*  OK

// meta dados de posts

add_action( 'rest_api_init', 'i9create_api_posts_meta_field' );

function i9create_api_posts_meta_field() {

    // register_rest_field ( 'name-of-post-type', 'name-of-field-to-return', array-of-callbacks-and-schema() )
    register_rest_field( 'post', 'post-meta-fields', 
        array(
            'get_callback' => 'i9get_post_meta_for_api',
            'schema' => null,
        )
    );

}

function i9get_post_meta_for_api( $object ) {
    //get the id of the post object array
    $post_id = $object['id'];

    //return the post meta
    return get_post_meta( $post_id );
}


*/
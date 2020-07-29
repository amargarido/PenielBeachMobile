<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Plugin Name: i9 REST Controller 
 * Plugin URI: http://meta.eti.br
 * Description: i9 REST
 * Author: Alberto Margarido
 * Version: 1.2.0
 * License: LGPL version 2.1
 * Network: True
 */

/*
* 0.0.1  - Criação - https://developer.wordpress.org/rest-api/extending-the-rest-api/controller-classes/
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
        // $this->namespace     = '/my-namespace/v1';
        // $this->resource_name = 'posts';
    }

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
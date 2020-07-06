<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Plugin Name: i9 REST
 * Plugin URI: http://meta.eti.br
 * Description: ExtenÃ§Ãµes REST usando um Controller.
 * Author: Alberto Margarido
 * Version: 0.1.0
 * License: LGPL version 2.1
 * Network: True
 */

/*
* 0.0.1  - criaÃ§Ã£o - https://developer.wordpress.org/rest-api/extending-the-rest-api/controller-classes/
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

/*  ACF plugin
$post_type = "post";
function i9_rest_prepare_post($data, $post, $request) {
    $_data = $data->data;
    $fields = get_fields($post->ID);
    foreach ($fields as $key => $value) {
        $_data[$key] = get_field($key, $post->ID);
	}
	//The helper function acf_photo_gallery contains array. Append this array to your data array
	$_data['acf_photo_gallery'] = acf_photo_gallery('ACF_FIELD_NAME', $post->ID);
    $data->data = $_data;
    return $data;
}
add_filter("rest_prepare_{$post_type}", 'i9_rest_prepare_post', 10, 3);
*/

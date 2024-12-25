<?php
// 判斷目前是否處於開發環境
if (file_exists(get_template_directory() . '/env-config.php')) {
  require_once get_template_directory() . '/env-config.php';
}
$node_env = !empty($ENV['NODE_ENV']) ? $ENV['NODE_ENV'] : 'production';

define('VITE_ENV', $node_env);
define('VITE_DEV_SERVER', 'http://localhost:3000');

/**
 * vite 開發環境設定
 */
function vite_development_dev_script()
{
  if (
    !defined('VITE_ENV') ||
    !defined('VITE_DEV_SERVER') ||
    constant('VITE_ENV') !== 'development'
  ) {
    return;
  }

  // 註冊 vite 的客戶端腳本
  $clientCore = constant('VITE_DEV_SERVER') . '/@vite/client';
  wp_enqueue_script('vite-client', $clientCore, array(), null, true);

  // 註冊 vite 入口文件腳本
  $entry_file = constant('VITE_DEV_SERVER') . get_template_directory() . '/src/vite.entry.js';
  wp_enqueue_script('vite-entry', $entry_file, array('vite-client'), null, true);

  // 添加 type="module" 属性
  add_filter('wp_script_attributes', 'add_type_attribute', 10, 1);
}

add_action('wp_head', 'vite_development_dev_script');


/**
 * 添加 type="module" 属性
 */
function add_type_attribute($attributes)
{
  // 在特定腳本中插入 module 屬性
  if (isset($attributes['id'])) {
    switch ($attributes['id']) {
      case 'vite-entry-js':
      case 'vite-client-js':
        $attributes['type'] = 'module';
        break;
    }
  }
  return $attributes;
}

/**
 * 產品環境引入腳本設定
 */
function vite_production_dev_script()
{
  if (
    !defined('VITE_ENV') ||
    !defined('VITE_DEV_SERVER') ||
    constant('VITE_ENV') !== 'production'
  ) {
    return;
  }

  $file_path = get_template_directory() . "/dist";
  $css_file_name = "main-bundle.css";
  $js_file_name = "main-bundle.js";

  $script_tag = "";

  // 全域 js / css
  wp_enqueue_style('vite-main', get_template_directory_uri() . "/dist/css/$css_file_name", array(), filemtime("$file_path/css/$css_file_name"));
  wp_enqueue_script('vite-main', get_template_directory_uri() . "/dist/js/$js_file_name", array(), filemtime("$file_path/js/$js_file_name"), true);


  if (is_page()) {

  }

  if (is_archive()) {

  }

  if ($script_tag !== '') {
    // wp_enqueue_script($script_tag, get_template_directory_uri() . "/assets/js/$js_file_path", array(), filemtime("$file_path/js/$js_file_name"), true);
  }

  // 若有 js 需要添加 type="module" 属性，可加入，並在 add_type_attribute 中加入判斷條件
  add_filter('wp_script_attributes', 'add_type_attribute', 10, 1);
}
add_action('wp_enqueue_scripts', 'vite_production_dev_script');
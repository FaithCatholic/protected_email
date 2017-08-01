<?php

namespace Drupal\protected_email\Controller;

use Drupal\Core\Controller\ControllerBase;

class ProtectedEmailReveal extends ControllerBase {

  public function view() {
    \Drupal::service('page_cache_kill_switch')->trigger();
    return [
     '#markup' => '',
     '#cache' => ['max-age' => 0],
    ];
  }

}

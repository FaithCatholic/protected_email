<?php

namespace Drupal\protected_email\Form;

use Drupal\Core\Url;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ProtectedEmailCaptcha extends FormBase {

  protected $id;

  public function __construct($id = 0) {
    $this->id = $id;
  }

  public function getFormId() {
    return 'protected_email_captcha_' . $this->id;
  }

  public function buildForm(array $form, FormStateInterface $form_state) {

    $data = $form_state->getBuildInfo();

    $form['#attributes']['class'][] = 'protected-email-captcha-form';
    $form['#attributes']['class'][] = 'hide';

    $form['#cache'] = ['max-age' => 0];

    $form['entity_id'] = [
      '#type' => 'hidden',
      '#value' => $data['args'][0],
    ];

    $form['entity_type'] = [
      '#type' => 'hidden',
      '#value' => $data['args'][1],
    ];

    $form['entity_field'] = [
      '#type' => 'hidden',
      '#value' => $data['args'][2],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('»'),
    ];

    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    $params['query'] = [
      'protected_email_id' => $values['entity_id'],
      'protected_email_type' => $values['entity_type'],
      'protected_email_field' => $values['entity_field'],
      'protected_email_value' => \Drupal::entityTypeManager()->getStorage($values['entity_type'])->load($values['entity_id'])->get($values['entity_field'])->value,
    ];

    $url = Url::fromUri('internal:/protected-email-value?_format=json', $params);
    $form_state->setRedirectUrl($url);
  }

}

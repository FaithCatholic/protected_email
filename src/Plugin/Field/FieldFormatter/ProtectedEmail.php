<?php

namespace Drupal\protected_email\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * @FieldFormatter(
 *   id = "protected_email",
 *   label = @Translation("Protected email"),
 *   field_types = {
 *     "email"
 *   }
 * )
 */
class ProtectedEmail extends FormatterBase {

  public static function defaultSettings() {
    return [] + parent::defaultSettings();
  }

  public function settingsForm(array $form, FormStateInterface $form_state) {
    return [] + parent::settingsForm($form, $form_state);
  }

  public function settingsSummary() {
    $summary = [];
    return $summary;
  }

  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'protected_email',
        '#data' => $this->viewValue($item),
        '#attached' => array('library'=> array('protected_email/protected_email')),
      ];
    }
    return $elements;
  }

  protected function viewValue(FieldItemInterface $item) {
    $entity = $item->getEntity();
    return [
      'field' => $item->getFieldDefinition()->getName(),
      'type' => $entity->getEntityType()->get('id'),
      'id' => $entity->id(),
    ];
  }

}

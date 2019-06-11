/*
 * ActionPage Messages
 *
 * This contains all the text for the ActionPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.ActionPage.title',
    defaultMessage: 'Action',
  },
  instanceName: {
    id: 'app.containers.ActionPage.instanceName',
    defaultMessage: 'action',
  },
  createSubtitle: {
    id: 'app.containers.ActionPage.createSubtitle',
    defaultMessage: 'Create',
  },
  actionFormTitle: {
    id: 'app.containers.ActionPage.component.ActionForm.actionFormTitle',
    defaultMessage: 'Action',
  },
  actionFormDescription: {
    id: 'app.containers.ActionPage.component.ActionForm.actionFormDescription',
    defaultMessage:
      'Actions are in charge of helping your agent with the conversation management. You can link user sayings to actions, therefore, your agent will learn from this and will be able to talk back with your users.',
  },
  help: {
    id: 'app.containers.ActionPage..help',
    defaultMessage: 'Help?',
  },
  playHelpAlt: {
    id: 'app.containers.ActionPage.playHelpAlt',
    defaultMessage: 'Play video off how to add/edit the keywords',
  },
  finishButton: {
    id: 'app.containers.ActionPage.component.ActionButtons.finishButton',
    defaultMessage: 'Save',
  },
  nextButton: {
    id: 'app.containers.ActionPage.component.ActionButtons.nextButton',
    defaultMessage: 'Next >',
  },
  action: {
    id: 'app.containers.ActionPage.component.MainTab.action',
    defaultMessage: 'Action: ',
  },
  webhook: {
    id: 'app.containers.ActionPage.component.MainTab.webhook',
    defaultMessage: 'Webhook',
  },
  response: {
    id: 'app.containers.ActionPage.component.MainTab.response',
    defaultMessage: 'Response',
  },
  requiredField: {
    id: 'app.containers.ActionPage.requiredField',
    defaultMessage: '*Required',
  },
  actionNameTextField: {
    id: 'app.containers.ActionPage.component.ActionForm.actionNameTextField',
    defaultMessage: 'Action Name:',
  },
  actionNameTextFieldPlaceholder: {
    id:
      'app.containers.ActionPage.component.ActionForm.actionNameTextFieldPlaceholder',
    defaultMessage: 'Add a name for your action',
  },
  backButton: {
    id: 'app.containers.ActionPage.backButton',
    defaultMessage: 'Exit',
  },
  textpromptTextField: {
    id: 'app.containers.ActionPage.components.SlotForm.textpromptTextField',
    defaultMessage: 'Slot Prompts:',
  },
  newSlotTab: {
    id: 'app.containers.ActionPage.component.SlotsForm.newSlotTab',
    defaultMessage: '+ Add Slot',
  },
  keywordSelect: {
    id: 'app.containers.ActionPage.component.SlotForm.keywordSelect',
    defaultMessage: 'Keyword',
  },
  webhookFormTitle: {
    id: 'app.containers.ActionPage.component.WebhookForm.webhookFormTitle',
    defaultMessage: 'Webhook',
  },
  webhookFormDescription: {
    id:
      'app.containers.ActionPage.component.WebhookForm.webhookFormDescription',
    defaultMessage:
      'This is a local webhook that will be called when the ML engine resolves that this action is being triggered by the user.',
  },
  responseFormTitle: {
    id: 'app.containers.ActionPage.component.ResponseForm.responseFormTitle',
    defaultMessage: 'Response',
  },
  responseFormDescription: {
    id:
      'app.containers.ActionPage.component.ResponseForm.responseFormDescription',
    defaultMessage:
      'Whenever you talk with your agent you may want to have additional data in your response beside the text. Here you can enable this settings to add more data to your /converse endpoint.',
  },
  responseTextField: {
    id: 'app.containers.ActionPage.components.ResponseForm.responseTextField',
    defaultMessage: 'Agent Response:',
  },
  responseTextFieldPlaceholder: {
    id:
      'app.containers.ActionPage.components.ResponseForm.responseTextFieldPlaceholder',
    defaultMessage: "Write bot's response when this actions is triggered",
  },
  responseHelperText: {
    id: 'app.containers.ActionPage.component.ResponseForm.responseHelperText',
    defaultMessage: '*Please add at least one response',
  },
  postFormatTitle: {
    id: 'app.containers.ActionPage.component.ResponseForm.postFormatTitle',
    defaultMessage: 'Response Format:',
  },
  noName: {
    id: 'app.containers.ActionPage.component.MainTab.noName',
    defaultMessage: 'No name',
  },
  slotsFormTitle: {
    id: 'app.containers.ActionPage.component.ActionForm.slotsFormTitle',
    defaultMessage: 'Slots',
  },
  slots: {
    id: 'app.containers.ActionPage.component.MainTab.slots',
    defaultMessage: 'Slots',
  },
  textpromptTextFieldPlaceholder: {
    id:
      'app.containers.ActionPage.component.SlotForm.textpromptTextFieldPlaceholder',
    defaultMessage:
      "Write bot's response when this slot is required and it is missing",
  },
  textpromptHelperText: {
    id: 'app.containers.ActionPage.component.SlotForm.textpromptHelperText',
    defaultMessage:
      '*Please add at least one text prompt if the slot is required',
  },
  slotNameTextField: {
    id: 'app.containers.ActionPage.component.SlotForm.slotNameTextField',
    defaultMessage: 'Slot Name',
  },
  slotNameTextFieldPlaceholder: {
    id:
      'app.containers.ActionPage.component.SlotForm.slotNameTextFieldPlaceholder',
    defaultMessage: 'Set a name to reference the slot in your responses',
  },
  slotNameTextFieldHelp: {
    id: 'app.containers.ActionPage.component.SlotForm.slotNameTextFieldHelp',
    defaultMessage: '0 for Infinity. Empty to avoid being remembered.',
  },
  remainingLifeTextField: {
    id: 'app.containers.ActionPage.component.SlotForm.remainingLifeTextField',
    defaultMessage: 'Remaining Life:',
  },
  remainingLifeTextFieldPlaceholder: {
    id:
      'app.containers.ActionPage.component.SlotForm.remainingLifeTextFieldPlaceholder',
    defaultMessage:
      'Set the number of messages that the agent will remember the assigned value',
  },
  slotIsRequired: {
    id: 'app.containers.ActionPage.component.SlotForm.slotIsRequired',
    defaultMessage: 'Is Required?',
  },
  slotIsList: {
    id: 'app.containers.ActionPage.component.SlotForm.slotIsList',
    defaultMessage: 'Is List?',
  },
  copyResponses: {
    id: 'app.containers.ActionPage.component.ResponseRow.copyResponses',
    defaultMessage: 'Copy response in the response input',
  },
});

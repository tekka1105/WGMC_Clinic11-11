// Immediately invoked function expression to avoid leaking variables globally.
(function () {
  // Exit early if the DOM APIs are not available (e.g., server-side rendering).
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  // Prevent duplicate widgets if this script is included more than once.
  if (document.getElementById('wgmc-chatbot-toggle')) return;

  // Detect the first two letters of the current page language.
  var documentLanguage = (document.documentElement.lang || 'en').toString().slice(0, 2).toLowerCase();
  // Determine if we should show Spanish copy.
  var isSpanish = documentLanguage === 'es';
  // Preformatted clinic phone number for readable display.
  var CLINIC_PHONE_DISPLAY = '(815) 726-3377';
  // tel: link for click-to-call behavior.
  var CLINIC_PHONE_LINK = 'tel:+18157263377';
  // Clinic street address for visitors.
  var CLINIC_ADDRESS = '213 East Cass Street, Joliet, IL 60432';
  // English hours string.
  var CLINIC_HOURS_EN =
    'Monday–Thursday: 9:00 a.m. – 5:00 p.m.; Saturday clinics twice monthly: 9:00 a.m. – 2:00 p.m. (by appointment)';
  // Spanish hours string.
  var CLINIC_HOURS_ES =
    'Lunes a jueves: 9:00 a. m. – 5:00 p. m.; Clínicas de sábado dos veces al mes: 9:00 a. m. – 2:00 p. m. (con cita previa)';
  // Public Google Maps URL for the clinic.
  var MAP_URL = 'https://maps.google.com/?q=213+E+Cass+St,+Joliet,+IL+60432';
  // Volunteer form link.
  var VOLUNTEER_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSdX4u4lDzLiGlgGowQ53N0wAnrK_RlHxDpqgTbyi_cbiDdU-g/viewform';
  // Donation form link.
  var DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=QB3XVPDN3EBDJ';
  // Patient info page with the same language preserved.
  var PATIENTS_URL = 'patients.html?lang=' + documentLanguage;

  // Localized copy for the widget UI.
  var strings = isSpanish
    ? {
        toggleLabel: '¿Necesita ayuda?', // Button label.
        headerTitle: 'Ayuda de WGMC', // Panel heading.
        welcome:
          'Hola, soy un asistente virtual de WGMC. Puedo ayudarle a encontrar información sobre cómo recibir atención, horarios, ubicaciones y voluntariado. Esto no es para emergencias.', // Greeting text.
        emergency:
          'Si se trata de una emergencia médica, llame al 911 o vaya a la sala de emergencias más cercana.', // Emergency warning.
        askQuestion:
          'Puede hacer una pregunta en sus propias palabras o usar los botones rápidos de abajo.', // Prompt for chat use.
        placeholder: 'Escriba su pregunta…', // Input placeholder.
        sendLabel: 'Enviar', // Send button label.
        quickEligibility: '¿Soy elegible?', // Quick question label.
        quickHours: 'Horario', // Quick question label.
        quickDirections: 'Obtener direcciones', // Quick question label.
        quickCall: 'Llamar a la clínica', // Quick question label.
        quickVolunteer: 'Ser voluntario', // Quick question label.
        quickDonate: 'Donar', // Quick question label.
        answerEligibility:
          'WGMC atiende a adultos sin seguro o con seguro insuficiente en los condados de Will y Grundy. Revise los requisitos en la <a href="' +
          PATIENTS_URL +
          '">página de información para pacientes</a> o llámenos al <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.', // Eligibility response.
        answerHours:
          'Nuestra clínica principal está en <strong>' +
          CLINIC_ADDRESS +
          '</strong>.<br/>' +
          'Horario: ' +
          CLINIC_HOURS_ES +
          '<br/><a href="' +
          MAP_URL +
          '" target="_blank" rel="noreferrer">Abrir direcciones en Google Maps</a><br/>También puede llamarnos al <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.', // Hours and directions response.
        answerCall:
          'Llame a la clínica al <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a> para hablar con nuestro equipo.', // Call response.
        answerVolunteer:
          'Nos encantaría contar con usted como voluntario. Complete el formulario aquí: <a href="' +
          VOLUNTEER_URL +
          '" target="_blank" rel="noreferrer">Formulario de voluntarios</a>.', // Volunteer response.
        answerDonate:
          'Puede apoyar la atención gratuita donando en línea: <a href="' +
          DONATE_URL +
          '" target="_blank" rel="noreferrer">Donar ahora</a>.', // Donation response.
        defaultAnswer:
          'Puedo ayudar con elegibilidad, horarios, direcciones, voluntariado o donaciones. También puede llamarnos al <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.' // Fallback response.
      }
    : {
        toggleLabel: 'Need help?', // Button label.
        headerTitle: 'WGMC Help', // Panel heading.
        welcome:
          'Hi, I am a virtual assistant for WGMC. I can help you find information about getting care, hours, locations, volunteering, and donations. This is not for emergencies.', // Greeting text.
        emergency:
          'If this is a medical emergency, please call 911 or go to the nearest emergency room.', // Emergency warning.
        askQuestion:
          'You can ask a question in your own words, or tap one of the quick buttons below.', // Prompt.
        placeholder: 'Type your question…', // Input placeholder.
        sendLabel: 'Send', // Send label.
        quickEligibility: 'Am I eligible?', // Quick question label.
        quickHours: 'Clinic hours', // Quick question label.
        quickDirections: 'Get directions', // Quick question label.
        quickCall: 'Call the clinic', // Quick question label.
        quickVolunteer: 'Volunteer', // Quick question label.
        quickDonate: 'Donate', // Quick question label.
        answerEligibility:
          'WGMC serves uninsured and underinsured adults in Will & Grundy Counties. Review requirements on the <a href="' +
          PATIENTS_URL +
          '">patient information page</a> or call us at <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.', // Eligibility response.
        answerHours:
          'Our main clinic is located at <strong>' +
          CLINIC_ADDRESS +
          '</strong>.<br/>' +
          'Hours: ' +
          CLINIC_HOURS_EN +
          '<br/><a href="' +
          MAP_URL +
          '" target="_blank" rel="noreferrer">Open directions in Google Maps</a><br/>You can also call us at <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.', // Hours and directions response.
        answerCall:
          'Please call us at <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a> for immediate help.', // Call response.
        answerVolunteer:
          'We would love to have you volunteer. Apply here: <a href="' +
          VOLUNTEER_URL +
          '" target="_blank" rel="noreferrer">Volunteer form</a>.', // Volunteer response.
        answerDonate:
          'Support free care by donating securely online: <a href="' +
          DONATE_URL +
          '" target="_blank" rel="noreferrer">Donate now</a>.', // Donation response.
        defaultAnswer:
          'I can help with eligibility, hours, directions, volunteering, or donations. You can also call us at <a href="' +
          CLINIC_PHONE_LINK +
          '">' +
          CLINIC_PHONE_DISPLAY +
          '</a>.' // Fallback response.
      };

  // Placeholder for the floating panel element.
  var panelElement;
  // Container for all chat messages.
  var messagesElement;
  // Reference to the text input.
  var inputElement;
  // Current quick button container so we can refresh it near the latest message.
  var quickButtonsElement;

  // Helper to send analytics events safely.
  function track(eventName, properties) {
    try {
      if (window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track(eventName, properties || {});
      }
    } catch (error) {
      // Swallow analytics failures silently.
    }
  }

  // Render a user bubble in the chat stream.
  function appendUserMessage(text) {
    if (!messagesElement) return; // Guard if panel not ready.
    var wrapper = document.createElement('div'); // Container for the message row.
    wrapper.className = 'chatbot-message chatbot-message-user'; // Style user bubble.
    var bubble = document.createElement('span'); // Actual bubble element.
    bubble.textContent = text; // Store raw user text.
    wrapper.appendChild(bubble); // Append bubble to row.
    messagesElement.appendChild(wrapper); // Insert row into chat log.
    scrollMessagesToBottom(); // Keep newest message in view.
  }

  // Render a bot bubble that can include HTML (for links).
  function appendBotMessage(html) {
    if (!messagesElement) return; // Guard if panel missing.
    var wrapper = document.createElement('div'); // Container row.
    wrapper.className = 'chatbot-message chatbot-message-bot'; // Style bot bubble.
    var bubble = document.createElement('span'); // Actual bubble span.
    bubble.innerHTML = html; // Allow markup for links/bold text.
    wrapper.appendChild(bubble); // Append bubble to row.
    messagesElement.appendChild(wrapper); // Insert into transcript.
    scrollMessagesToBottom(); // Scroll to newest content.
  }

  // Always keep the chat view pinned to the latest message.
  function scrollMessagesToBottom() {
    try {
      messagesElement.scrollTop = messagesElement.scrollHeight; // Scroll container to max height.
    } catch (error) {
      // Ignore if messagesElement is not scrollable yet.
    }
  }

  // Decide which canned response best matches the user input.
  function getBotReply(message) {
    var safeMessage = (message || '').toString(); // Normalize input to string.
    var lower = safeMessage.toLowerCase(); // Case-insensitive comparison.
    if (!lower) return strings.defaultAnswer; // Empty inputs get default response.

    // Helper to see if any keyword appears in the input.
    function includesAny(list) {
      return list.some(function (term) {
        return lower.indexOf(term) !== -1;
      });
    }

    if (includesAny(['emerg'])) return strings.emergency; // Prioritize emergencies.

    // Keyword buckets for routing.
    var locationKeywords = ['where', 'address', 'location', 'directions', 'map', 'route', 'ubic', 'direcci', 'dónde', 'donde'];
    var hoursKeywords = ['hour', 'open', 'when', 'schedule', 'horario', 'horas', 'abren', 'cuándo', 'cuando'];
    var callKeywords = ['call', 'phone', 'tel', 'telefono', 'teléfono', 'llamar', 'numero', 'número', 'contact'];
    var volunteerKeywords = ['volunteer', 'volunt', 'servir', 'ayudar'];
    var donateKeywords = ['donate', 'donation', 'donar', 'donación', 'donacion', 'apoy', 'support'];
    var eligibilityKeywords = [
      'eligib',
      'qualif',
      'eligible',
      'qualify',
      'calific',
      'document',
      'bring',
      'papel',
      'documento',
      'patient',
      'paciente',
      'registro'
    ];

    if (includesAny(locationKeywords) || includesAny(hoursKeywords)) {
      return strings.answerHours; // Provide hours/directions if user asked.
    }
    if (includesAny(callKeywords)) {
      return strings.answerCall; // Provide phone number.
    }
    if (includesAny(volunteerKeywords)) {
      return strings.answerVolunteer; // Provide volunteer info.
    }
    if (includesAny(donateKeywords)) {
      return strings.answerDonate; // Provide donation info.
    }
    if (includesAny(eligibilityKeywords)) {
      return strings.answerEligibility; // Provide eligibility instructions.
    }

    return strings.defaultAnswer; // Fallback if nothing matches.
  }

  // Handle sending a message typed by the user.
  function handleSubmit() {
    if (!inputElement) return; // Guard.
    var value = inputElement.value.trim(); // Get trimmed text.
    if (!value) return; // Ignore empty submissions.
    inputElement.value = ''; // Clear field.
    removeQuickButtons(); // Move quick options to reappear after the reply.
    appendUserMessage(value); // Echo user text.
    track('chat_message', { source: 'widget' }); // Analytics event.
    window.setTimeout(function () {
      var response = getBotReply(value); // Determine reply.
      appendBotMessage(response); // Show assistant response.
      insertQuickButtons(); // Ensure quick actions reappear beneath the latest reply.
    }, 200); // Small delay for readability.
  }

  // Build the row of quick action buttons.
  function renderQuickButtons(container) {
    var quickItems = [
      { label: strings.quickEligibility, question: strings.quickEligibility },
      { label: strings.quickHours, question: strings.quickHours },
      { label: strings.quickDirections, question: strings.quickDirections },
      { label: strings.quickCall, question: strings.quickCall },
      { label: strings.quickVolunteer, question: strings.quickVolunteer },
      { label: strings.quickDonate, question: strings.quickDonate }
    ];
    quickItems.forEach(function (item) {
      var buttonElement = document.createElement('button'); // Create button.
      buttonElement.type = 'button'; // Prevent form submission.
      buttonElement.textContent = item.label; // Show label text.
      buttonElement.addEventListener('click', function () {
        removeQuickButtons(); // Refresh quick options after the bot responds.
        appendUserMessage(item.question); // Show the selected shortcut.
        var reply = getBotReply(item.question); // Compute canned reply.
        window.setTimeout(function () {
          appendBotMessage(reply); // Display reply.
          insertQuickButtons(); // Re-add the quick buttons at the end.
        }, 150); // Slight delay for readability.
        track('chat_quick_question', { label: item.label }); // Analytics event.
      });
      container.appendChild(buttonElement); // Add to button grid.
    });
  }

  // Remove the current quick button block so it can be re-rendered later.
  function removeQuickButtons() {
    if (quickButtonsElement && quickButtonsElement.parentNode) {
      quickButtonsElement.parentNode.removeChild(quickButtonsElement);
    }
    quickButtonsElement = null;
  }

  // Append a fresh quick button block near the latest messages.
  function insertQuickButtons() {
    if (!messagesElement) return;
    removeQuickButtons();
    quickButtonsElement = document.createElement('div');
    quickButtonsElement.className = 'chatbot-quick-buttons';
    messagesElement.appendChild(quickButtonsElement);
    renderQuickButtons(quickButtonsElement);
    scrollMessagesToBottom();
  }

  // Build the floating chat panel DOM.
  function createPanel() {
    panelElement = document.createElement('div'); // Root panel.
    panelElement.id = 'wgmc-chatbot-panel'; // ID for reference.
    panelElement.className = 'chatbot-panel'; // Styling class.
    panelElement.setAttribute('role', 'dialog'); // Accessibility role.
    panelElement.setAttribute('aria-label', strings.headerTitle); // Accessible name.
    panelElement.style.display = 'none'; // Hidden until opened.

    var headerElement = document.createElement('div'); // Header bar.
    headerElement.className = 'chatbot-header'; // Style header.

    var titleElement = document.createElement('div'); // Header title.
    titleElement.textContent = strings.headerTitle; // Set localized title.

    var closeButton = document.createElement('button'); // Close button.
    closeButton.type = 'button'; // Non-submitting.
    closeButton.className = 'chatbot-close'; // Style class.
    closeButton.setAttribute('aria-label', 'Close chat'); // Accessible label.
    closeButton.textContent = '✕'; // Visual icon.
    closeButton.addEventListener('click', function () {
      togglePanel(false); // Close panel on click.
    });

    headerElement.appendChild(titleElement); // Insert title.
    headerElement.appendChild(closeButton); // Insert close button.

    messagesElement = document.createElement('div'); // Chat log.
    messagesElement.className = 'chatbot-messages'; // Style log.

    appendBotMessage(strings.welcome + '<br/><br/>' + strings.emergency + '<br/><br/>' + strings.askQuestion); // Seed conversation.

    insertQuickButtons(); // Show quick actions beneath the greeting.

    var inputWrapper = document.createElement('div'); // Footer input row.
    inputWrapper.className = 'chatbot-input'; // Style row.

    inputElement = document.createElement('input'); // Text field.
    inputElement.type = 'text'; // Input type.
    inputElement.placeholder = strings.placeholder; // Placeholder text.
    inputElement.setAttribute('aria-label', strings.placeholder); // Accessible label.

    inputElement.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent submitting parent forms.
        handleSubmit(); // Send message.
      }
    });

    var sendButton = document.createElement('button'); // Send button.
    sendButton.type = 'button'; // Avoid submitting forms.
    sendButton.textContent = strings.sendLabel; // Localized label.
    sendButton.addEventListener('click', handleSubmit); // Send when clicked.

    inputWrapper.appendChild(inputElement); // Add text field.
    inputWrapper.appendChild(sendButton); // Add send button.

    panelElement.appendChild(headerElement); // Insert header.
    panelElement.appendChild(messagesElement); // Insert messages.
    panelElement.appendChild(inputWrapper); // Insert input row.

    document.body.appendChild(panelElement); // Mount panel in DOM.
  }

  // Show or hide the panel and keep the toggle button state in sync.
  function togglePanel(show) {
    if (!panelElement) return; // Guard if panel not created.
    var toggleButton = document.getElementById('wgmc-chatbot-toggle'); // Locate toggle button.
    var shouldShow = typeof show === 'boolean' ? show : panelElement.style.display === 'none'; // Determine target state.
    panelElement.style.display = shouldShow ? 'flex' : 'none'; // Show or hide panel.
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', shouldShow ? 'true' : 'false'); // Update ARIA state.
      toggleButton.style.opacity = shouldShow ? '0' : '1'; // Fade toggle when panel open.
      toggleButton.style.pointerEvents = shouldShow ? 'none' : 'auto'; // Disable toggle clicks while panel open.
    }
    if (shouldShow) {
      track('chat_open', { from: 'widget' }); // Analytics event.
      window.setTimeout(function () {
        if (inputElement) {
          inputElement.focus(); // Auto-focus input when opening.
        }
      }, 150);
    } else {
      track('chat_close', { from: 'widget' }); // Analytics event for closing.
    }
  }

  // Create the floating toggle button that opens the chat panel.
  function createToggle() {
    var toggleButton = document.createElement('button'); // Button element.
    toggleButton.id = 'wgmc-chatbot-toggle'; // Assign ID.
    toggleButton.type = 'button'; // Non-submitting.
    toggleButton.className = 'chatbot-toggle'; // Style button.
    toggleButton.setAttribute('aria-haspopup', 'dialog'); // Screen-reader hint.
    toggleButton.setAttribute('aria-expanded', 'false'); // Initial ARIA state.
    toggleButton.innerHTML =
      '<div class="chatbot-toggle-icon">💬</div><span>' + strings.toggleLabel + '</span>'; // Icon + label markup.
    toggleButton.addEventListener('click', function () {
      togglePanel(); // Toggle panel when clicked.
    });
    document.body.appendChild(toggleButton); // Mount toggle.
  }

  // Initialize both toggle button and panel.
  function init() {
    createToggle(); // Add floating button.
    createPanel(); // Build hidden panel.
  }

  // Run init immediately if DOM is ready; otherwise wait for DOMContentLoaded.
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})(); // End of IIFE wrapper.

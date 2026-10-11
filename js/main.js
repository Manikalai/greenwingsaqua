document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navPanel = document.querySelector('.nav-panel');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  if (navPanel) {
    navPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const WHATSAPP_NUMBER = '919944560234';

  // The enquiry also lands in the staff dashboard as a lead, so a visitor who
  // never presses Send in WhatsApp still gets a call back. The key is the public
  // "anon" key: it can do nothing except call submit_enquiry, which accepts one
  // enquiry and reads nothing back.
  const ENQUIRY_URL = 'https://hgprjbmelbmawnewsawh.supabase.co/rest/v1/rpc/submit_enquiry';
  const ENQUIRY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHJqYm1lbGJtYXduZXdzYXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5ODY0NjAsImV4cCI6MjEwMzU2MjQ2MH0.SPx2SqTQXaIqniA5DoVaQmv5zb1VLJIXjnORZCV85rc';

  const saveEnquiry = (fields) => fetch(ENQUIRY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: ENQUIRY_KEY,
      Authorization: `Bearer ${ENQUIRY_KEY}`,
    },
    body: JSON.stringify(fields),
  });

  const form = document.getElementById('enquiry-form');
  if (form) {
    const status = document.getElementById('enquiry-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const service = form.service.value;
      const address = form.address.value.trim();
      const message = form.message.value.trim();

      const lines = [
        'New enquiry from greenwingsaqua.com',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service needed: ${service}`,
      ];
      if (address) lines.push(`Address: ${address}`);
      if (message) lines.push(`Details: ${message}`);

      // WhatsApp opens first: a popup opened after waiting on the network is
      // blocked by most browsers, because it no longer counts as the user's tap.
      const text = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');

      if (form.company_url.value) return;
      saveEnquiry({ p_name: name, p_phone: phone, p_service: service,
        p_area: address || null, p_message: message || null })
        .then(async (res) => {
          if (!status) return;
          if (res.ok) {
            status.textContent = 'Thank you — we have your enquiry and will call you back soon.';
            status.className = 'form-status ok';
            form.reset();
          } else {
            // The database explains a bad phone number in words the visitor can act on.
            const body = await res.json().catch(() => ({}));
            status.textContent = body.message || 'We could not save your enquiry. Please send it on WhatsApp or call us.';
            status.className = 'form-status error';
          }
          status.hidden = false;
        })
        .catch(() => {
          if (!status) return;
          status.textContent = 'We could not save your enquiry. Please send it on WhatsApp or call us.';
          status.className = 'form-status error';
          status.hidden = false;
        });
    });
  }
});

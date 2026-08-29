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
  const form = document.getElementById('enquiry-form');
  if (form) {
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

      const text = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    });
  }
});

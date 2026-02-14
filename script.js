// Small interactivity for portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Sections that should behave like tabs (only one visible at a time)
  const managedSectionIds = ['about', 'skills', 'certificates', 'projects', 'contact'];
  const managedSections = managedSectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const showOnlySection = (targetId) => {
    managedSections.forEach((section) => {
      section.hidden = section.id !== targetId;
    });
  };

  const showAllSections = () => {
    managedSections.forEach((section) => {
      section.hidden = false;
    });
  };

  // Handle internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.length <= 1) {
        return;
      }

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();

      if (managedSectionIds.includes(targetId)) {
        showOnlySection(targetId);
      } else if (link.closest('.nav-links')) {
        // If you later add non-managed nav targets (like Home), reset sections.
        showAllSections();
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Faux contact submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thanks! Message captured locally - replace with your email handler.');
      form.reset();
    });
  }

  // Certificate click tip
  const tipTimers = new WeakMap();
  const certificateCards = Array.from(document.querySelectorAll('.certificate-card'));
  certificateCards.forEach((card) => {
    const media = card.querySelector('.certificate-media');
    if (!media) {
      return;
    }

    media.addEventListener('click', (event) => {
      event.preventDefault();
      card.classList.add('show-tip');

      const existingTimer = tipTimers.get(card);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(() => {
        card.classList.remove('show-tip');
        tipTimers.delete(card);
      }, 1600);

      tipTimers.set(card, timer);
    });
  });

  // Certificate lightbox
  const lightbox = document.getElementById('certificate-lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt || 'Certificate preview';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    if (lightboxCaption) {
      lightboxCaption.textContent = '';
    }
  };

  if (lightbox) {
    certificateCards.forEach((card) => {
      const media = card.querySelector('.certificate-media');
      const image = card.querySelector('.certificate-image');
      if (!media || !image) {
        return;
      }
      media.addEventListener('click', () => {
        openLightbox(image.src, image.alt);
      });
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    lightboxClose?.addEventListener('click', () => {
      closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // Project details modal
  const projectDetails = {
    'user-profile':
      'The User Profile and Networking System is a full-stack web application developed to provide a structured platform where users can create, manage, and showcase their personal or professional profiles while establishing meaningful connections with other users. The application simulates the core functionality of modern networking platforms by focusing on user identity management, connectivity, and secure information exchange.',
    'agro-mentor':
      'Agro Mentor is a web-based application designed to support farmers by providing reliable agricultural guidance through digital technology. The project aims to bridge the gap between farmers and expert knowledge by offering crop-related information, best farming practices, and decision-making support in an easy-to-use platform.',
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalDescription = document.getElementById('project-modal-description');
  const projectModalClose = projectModal?.querySelector('.project-modal-close');

  const openProjectModal = (title, description) => {
    if (!projectModal || !projectModalTitle || !projectModalDescription) {
      return;
    }
    projectModalTitle.textContent = title;
    projectModalDescription.textContent = description;
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
  };

  const closeProjectModal = () => {
    if (!projectModal) {
      return;
    }
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.project-details').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-project');
      if (!key || !projectDetails[key]) {
        return;
      }
      const card = button.closest('.feature-card');
      const title = card?.querySelector('h3')?.textContent?.trim() || 'Project Details';
      openProjectModal(title, projectDetails[key]);
    });
  });

  if (projectModal) {
    projectModal.addEventListener('click', (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });

    projectModalClose?.addEventListener('click', () => {
      closeProjectModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && projectModal.classList.contains('is-open')) {
        closeProjectModal();
      }
    });
  }
});

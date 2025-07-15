/* =====================================================
   ThinkBit Edge Corp. – JavaScript (Fixed)
   ===================================================== */

// Application data (from provided JSON)
const data = {
  programs: [
    {
      name: "AI Foundations",
      description: "Introduction to artificial intelligence concepts, machine learning basics, and ethical AI practices designed for beginners.",
      ageGroup: "13-18 years",
      duration: "12 weeks",
      skills: ["AI Concepts", "Machine Learning", "Ethics in AI", "Problem Solving"],
      icon: "fa-brain"
    },
    {
      name: "Code & Create",
      description: "Learn programming fundamentals through creative projects in web development, game design, and app creation.",
      ageGroup: "10-18 years",
      duration: "16 weeks",
      skills: ["Programming", "Web Development", "Game Design", "Creative Coding"],
      icon: "fa-code"
    },
    {
      name: "Digital Literacy",
      description: "Essential computer skills, internet safety, and digital citizenship for navigating the modern world.",
      ageGroup: "8-16 years",
      duration: "8 weeks",
      skills: ["Computer Basics", "Internet Safety", "Digital Tools", "Online Communication"],
      icon: "fa-desktop"
    },
    {
      name: "Tech Leadership",
      description: "Developing leadership skills and confidence for underrepresented youth in technology fields.",
      ageGroup: "15-21 years",
      duration: "20 weeks",
      skills: ["Leadership", "Public Speaking", "Project Management", "Team Collaboration"],
      icon: "fa-chalkboard-user"
    },
    {
      name: "Innovation Labs",
      description: "Hands-on exploration of robotics, IoT, 3D printing, and other emerging technologies.",
      ageGroup: "12-18 years",
      duration: "Ongoing",
      skills: ["Robotics", "IoT", "3D Design", "Innovation"],
      icon: "fa-robot"
    },
    {
      name: "Career Pathways",
      description: "Connecting students with internships, mentorships, and career opportunities in the tech industry.",
      ageGroup: "16-24 years",
      duration: "Flexible",
      skills: ["Career Planning", "Networking", "Interview Skills", "Industry Connections"],
      icon: "fa-road"
    }
  ],
  testimonials: [
    {
      name: "Maya Johnson",
      program: "AI Foundations",
      quote: "ThinkBit Edge opened my eyes to possibilities I never knew existed. Now I'm planning to study computer science in college!"
    },
    {
      name: "Carlos Rodriguez",
      program: "Code & Create",
      quote: "I created my first app and it's helping my community find local resources. This program changed my life."
    },
    {
      name: "Aisha Patel",
      program: "Career Pathways",
      quote: "Thanks to ThinkBit Edge, I landed an internship at a tech company. They believed in me when I didn't believe in myself."
    }
  ]
};

/* ----------------------------------------------------
   Smooth Scrolling Navigation
---------------------------------------------------- */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
      }
    });
  });
}

/* ----------------------------------------------------
   Program Cards & Modal
---------------------------------------------------- */
function createProgramCard(program) {
  const card = document.createElement("div");
  card.className = "card program-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${program.name} – Learn more`);

  const cardBody = document.createElement("div");
  cardBody.className = "card__body flex flex-col items-center";

  const icon = document.createElement("span");
  icon.className = `program-icon fas ${program.icon}`;
  cardBody.appendChild(icon);

  const title = document.createElement("h4");
  title.textContent = program.name;
  cardBody.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "text-sm mt-8";
  desc.textContent = program.description;
  cardBody.appendChild(desc);

  const age = document.createElement("p");
  age.className = "text-sm mt-8 status status--info";
  age.textContent = program.ageGroup;
  cardBody.appendChild(age);

  const btn = document.createElement("button");
  btn.className = "btn btn--primary btn--sm mt-8";
  btn.textContent = "Learn More";
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openProgramModal(program);
  });
  cardBody.appendChild(btn);

  card.appendChild(cardBody);
  card.addEventListener("click", () => openProgramModal(program));
  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProgramModal(program);
    }
  });
  return card;
}

function renderPrograms() {
  const programCardsContainer = document.getElementById("programCards");
  if (!programCardsContainer) return;
  
  data.programs.forEach((p) => {
    programCardsContainer.appendChild(createProgramCard(p));
  });
}

function openProgramModal(program) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.tabIndex = -1;

  const header = document.createElement("div");
  header.className = "modal-header";

  const title = document.createElement("h3");
  title.textContent = program.name;
  header.appendChild(title);

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("aria-label", "Close modal");
  closeBtn.addEventListener("click", closeModal);
  header.appendChild(closeBtn);

  const bodyDiv = document.createElement("div");
  bodyDiv.className = "modal-body";
  bodyDiv.innerHTML = `
    <p>${program.description}</p>
    <p><strong>Age Group:</strong> ${program.ageGroup}</p>
    <p><strong>Duration:</strong> ${program.duration}</p>
    <p><strong>Skills Gained:</strong></p>
    <ul>${program.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
    <div class="mt-8">
      <a href="#contact" class="btn btn--primary btn--sm">Enroll Now</a>
    </div>
  `;

  modal.appendChild(header);
  modal.appendChild(bodyDiv);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Focus the modal for accessibility
  setTimeout(() => modal.focus(), 100);

  // Handle escape key
  function handleEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  document.addEventListener('keydown', handleEscape);

  function closeModal() {
    document.removeEventListener('keydown', handleEscape);
    overlay.remove();
  }
}

/* ----------------------------------------------------
   Navbar toggle (mobile)
---------------------------------------------------- */
function initNavbarToggle() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ----------------------------------------------------
   Animated Stats Counter
---------------------------------------------------- */
function initStatsCounter() {
  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".stat-number").forEach((el) => statObserver.observe(el));
}

function animateStat(el) {
  const target = Number(el.dataset.target);
  let start = 0;
  const duration = 1500;
  const increment = target > 100 ? Math.ceil(target / 50) : 1;

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      el.textContent = start.toLocaleString();
    }
  }, 30);
}

/* ----------------------------------------------------
   Impact Chart (Chart.js)
---------------------------------------------------- */
function buildImpactChart() {
  const ctx = document.getElementById("impactChart");
  if (!ctx || !window.Chart) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Students Reached",
          data: [400, 1200, 2300, 3500, 5000],
          borderColor: "#1FB8CD",
          backgroundColor: "rgba(31, 184, 205, 0.2)",
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* ----------------------------------------------------
   Testimonials Carousel
---------------------------------------------------- */
function createTestimonials() {
  const container = document.getElementById("testimonialCarousel");
  if (!container) return;

  data.testimonials.forEach((t, index) => {
    const slide = document.createElement("div");
    slide.className = "testimonial-slide";
    if (index === 0) slide.classList.add("active");
    slide.innerHTML = `
      <p class="testimonial-quote">"${t.quote}"</p>
      <p class="text-sm">— ${t.name}, <em>${t.program}</em></p>
    `;
    container.appendChild(slide);
  });

  let current = 0;
  setInterval(() => {
    const slides = container.querySelectorAll(".testimonial-slide");
    if (slides.length > 1) {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }
  }, 6000);
}

/* ----------------------------------------------------
   Accessibility Features
---------------------------------------------------- */
function initAccessibilityFeatures() {
  const contrastToggle = document.getElementById("contrastToggle");
  contrastToggle?.addEventListener("click", () => {
    document.documentElement.classList.toggle("high-contrast");
    const pressed = contrastToggle.getAttribute("aria-pressed") === "true";
    contrastToggle.setAttribute("aria-pressed", String(!pressed));
  });

  const fontIncrease = document.getElementById("fontIncrease");
  const fontDecrease = document.getElementById("fontDecrease");
  let currentFontSize = 100;
  
  function updateFontSize() {
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  }
  
  fontIncrease?.addEventListener("click", () => {
    currentFontSize = Math.min(currentFontSize + 10, 160);
    updateFontSize();
  });
  
  fontDecrease?.addEventListener("click", () => {
    currentFontSize = Math.max(currentFontSize - 10, 80);
    updateFontSize();
  });
}

/* ----------------------------------------------------
   Forms Handling
---------------------------------------------------- */
function initFormHandling() {
  function handleFormSubmission(formId, statusId) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    
    if (!form || !status) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.classList.remove("hidden");
      form.reset();
      setTimeout(() => status.classList.add("hidden"), 5000);
    });
  }

  handleFormSubmission("contactForm", "formStatus");
  handleFormSubmission("newsletterForm", "newsletterStatus");
  handleFormSubmission("footerNewsletter", "footerStatus");
}

/* ----------------------------------------------------
   Chat Widget
---------------------------------------------------- */
function initChatWidget() {
  const chatToggle = document.getElementById("chatToggle");
  const chatWidget = document.getElementById("chatWidget");
  const chatClose = document.getElementById("chatClose");
  
  chatToggle?.addEventListener("click", () => {
    chatWidget?.classList.toggle("hidden");
  });
  
  chatClose?.addEventListener("click", () => {
    chatWidget?.classList.add("hidden");
  });
}

/* ----------------------------------------------------
   Initialize All Components
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initSmoothScrolling();
  initNavbarToggle();
  initStatsCounter();
  initAccessibilityFeatures();
  initFormHandling();
  initChatWidget();
  
  // Render dynamic content
  renderPrograms();
  createTestimonials();
  
  // Initialize chart after small delay to ensure DOM is ready
  setTimeout(() => {
    buildImpactChart();
  }, 100);
});
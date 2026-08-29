import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('education');
  const [skillsActive, setSkillsActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');


  useEffect(() => {
    // Trigger skills bar animation after component mount
    const timer = setTimeout(() => setSkillsActive(true), 400);

    // Scroll reveal logic using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));

    // Scroll listener for scrolled header background and active section indicator
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      revealElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // SVGs definition
  const svgIcons = {
    code: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    email: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    location: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    education: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    ),
    certifications: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 11 11 13 15 9"></polyline>
      </svg>
    ),
    achievements: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
        <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path>
      </svg>
    ),
    terminal: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
    cpu: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="15" x2="23" y2="15"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="15" x2="4" y2="15"></line>
      </svg>
    ),
    web: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    )
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Ambient background light orbs */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-glow-orb orb-3"></div>

      {/* Navigation Header */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <a href="#hero" className="logo text-gradient">
            {svgIcons.code}
            <span>ROHITH V</span>
          </a>
          
          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li>
              <a 
                href="#hero" 
                className={activeSection === 'hero' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className={activeSection === 'experience' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#education" 
                className={activeSection === 'education' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Academics
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="section container" style={{ paddingBottom: '40px' }}>
        <div className="hero-wrapper fade-in-up">
          <div className="hero-content">
            <span className="hero-subtitle">High-Performance Backend</span>
            <h1 className="hero-title">
              Crafting Scalable <br />
              <span className="text-gradient">.NET Architectures</span>
            </h1>
            <p className="hero-desc">
              I am a dedicated .NET Backend Developer specializing in engineering RESTful APIs, 
              optimizing databases, and writing clean, scalable code with C#, Entity Framework Core, and SQL Server.
            </p>
            <div className="hero-cta">
              <a href="#about" className="btn btn-primary">Read Profile</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>

          <div className="hero-graphic">
            <div className="net-cube">
              <div className="net-cube-wireframe"></div>
              <div className="net-cube-wireframe cyan"></div>
              <div className="net-logo-glow">.NET</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section container reveal">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text" style={{ textAlign: 'left' }}>
            <p>
              Hi, I'm Rohith V. I am a detail-oriented backend specialist with a passion for designing 
              robust systems and clean relational data layouts. With a professional background in ASP.NET Core, 
              EF Core, and database query optimization, I transform business workflows into secure, high-performance web services.
            </p>
            <p>
              Based in Tamil Nadu, India, I hold a Bachelor of Engineering in Computer Science and Engineering. 
              I follow Agile methodologies, write clean enterprise-grade code, and am always eager to learn modern engineering patterns.
            </p>
            <div className="about-highlights">
              <div className="glass-panel highlight-box">
                <div className="highlight-num text-gradient">1+</div>
                <div className="highlight-label">Year Experience</div>
              </div>
              <div className="glass-panel highlight-box">
                <div className="highlight-num text-gradient">100%</div>
                <div className="highlight-label">REST Compliant APIs</div>
              </div>
            </div>
          </div>
          
          <div>
            <ul className="quick-details glass-panel" style={{ padding: '30px', textAlign: 'left' }}>
              <li>
                <span className="detail-label">Designation</span>
                <span className="detail-val">.NET Backend Developer</span>
              </li>
              <li>
                <span className="detail-label">Current Company</span>
                <span className="detail-val">BME Solutions</span>
              </li>
              <li>
                <span className="detail-label">Location</span>
                <span className="detail-val">Karur, Tamil Nadu</span>
              </li>
              <li>
                <span className="detail-label">Email</span>
                <span className="detail-val">rohithviswanathan30@gmail.com</span>
              </li>
              <li>
                <span className="detail-label">LinkedIn</span>
                <span className="detail-val" style={{ display: 'flex', alignItems: 'center' }}>
                  <a href="https://www.linkedin.com/in/rohith-v-28b065228/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                    Rohit V
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="section container reveal">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          
          <div className="timeline-item right">
            <div className="timeline-dot"></div>
            <div className="timeline-card glass-panel">
              <span className="timeline-date">Aug 2025 – Present</span>
              <h3 className="timeline-title">.NET Backend Developer</h3>
              <span className="timeline-company">BME Solutions, Erode</span>
              <div className="timeline-desc">
                <ul>
                  <li>Developed and maintained highly scalable RESTful Web APIs using ASP.NET Core and C#.</li>
                  <li>Designed and optimized SQL Server database schema, queries, indexing, and stored procedures to improve latency.</li>
                  <li>Implemented EF Core and Dapper to handle efficient database mappings and lightning-fast read pipelines.</li>
                  <li>Integrated third-party payment, SMS, and auth gateways using standard OAuth protocols.</li>
                  <li>Documented all core endpoints using Swagger / OpenAPI specs, enabling smooth frontend integration.</li>
                  <li>Collaborated closely with cross-functional teams in Agile sprints and code reviews.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-dot"></div>
            <div className="timeline-card glass-panel">
              <span className="timeline-date">Jul 2025 (1 Month)</span>
              <h3 className="timeline-title">Web Development Intern</h3>
              <span className="timeline-company">Spinspider Technology</span>
              <div className="timeline-desc">
                <ul>
                  <li>Gained practical exposure in JavaScript-based Web Development.</li>
                  <li>Built responsive client-side UI components and integrated public data feeds.</li>
                  <li>Collaborated in debugging and deploying static websites.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="section container reveal">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          
          <div className="skills-category glass-panel">
            <h3><span>Languages</span> <span className="text-gradient">C#</span></h3>
            <div className="skills-list">
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">C# (.NET Core)</span>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '90%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">SQL</span>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '85%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">JavaScript</span>
                  <span className="skill-percent">75%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '75%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Java</span>
                  <span className="skill-percent">70%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '70%' : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-category glass-panel">
            <h3><span>Frameworks</span> <span className="text-gradient">ASP.NET</span></h3>
            <div className="skills-list">
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">ASP.NET Core Web API</span>
                  <span className="skill-percent">92%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '92%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Entity Framework Core</span>
                  <span className="skill-percent">88%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '88%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Dapper ORM</span>
                  <span className="skill-percent">80%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '80%' : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-category glass-panel">
            <h3><span>Tools & Database</span> <span className="text-gradient">Data</span></h3>
            <div className="skills-list">
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">SQL Server</span>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '85%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Swagger / OpenAPI</span>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '90%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Postman</span>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '85%' : '0%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">Git & GitHub</span>
                  <span className="skill-percent">88%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsActive ? '88%' : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Education, Certifications & Achievements Tabbed Section */}
      <section id="education" className="section container reveal">
        <h2 className="section-title">Academics & Credentials</h2>
        
        <div className="edu-cert-tabs">
          <button 
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'education' && (
            <div className="edu-grid">
              <div className="edu-card glass-panel">
                <span className="edu-year">2019 – 2023</span>
                <h3 className="edu-degree">Bachelor of Engineering (CSE)</h3>
                <p className="edu-school">Kongunadu College of Engineering and Technology, Trichy</p>
                <span className="edu-score">CGPA: 8.5 / 10</span>
              </div>
              <div className="edu-card glass-panel">
                <span className="edu-year">Graduated 2019</span>
                <h3 className="edu-degree">Higher Secondary School (HSC)</h3>
                <p className="edu-school">KSV Higher Secondary School</p>
                <span className="edu-score">Score: 67.6%</span>
              </div>
              <div className="edu-card glass-panel">
                <span className="edu-year">Graduated 2017</span>
                <h3 className="edu-degree">SSLC</h3>
                <p className="edu-school">St. Theresa's Matric Higher Secondary School</p>
                <span className="edu-score">Score: 69.8%</span>
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <ul className="list-items">
              <li className="list-item glass-panel">
                <div className="list-item-icon">{svgIcons.code}</div>
                <div className="list-item-content">
                  <h4>Java Full Stack</h4>
                  <p>Besant Technologies - Intensive training in full-stack architecture, object-oriented concepts, and relational models.</p>
                </div>
              </li>
              <li className="list-item glass-panel">
                <div className="list-item-icon">{svgIcons.terminal}</div>
                <div className="list-item-content">
                  <h4>C & C++ Programming</h4>
                  <p>Technical Educational Society - Foundational certificate emphasizing low-level memory management, pointers, and data structures.</p>
                </div>
              </li>
            </ul>
          )}

          {activeTab === 'achievements' && (
            <ul className="list-items">
              <li className="list-item glass-panel">
                <div className="list-item-icon">{svgIcons.cpu}</div>
                <div className="list-item-content">
                  <h4>Virtual Programming for Arduino (Robotics)</h4>
                  <p>Participated in hands-on Virtual Programming and embedded firmware development for Arduino microcontrollers conducted by Kongunadu College of Engineering and Technology.</p>
                </div>
              </li>
              <li className="list-item glass-panel">
                <div className="list-item-icon">{svgIcons.web}</div>
                <div className="list-item-content">
                  <h4>Web Development Internship</h4>
                  <p>Completed a month-long web internship at Spinspider Technology specializing in JavaScript engineering and front-end setups.</p>
                </div>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container reveal">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-wrapper">
          
          <div className="contact-info">
            <div className="contact-card glass-panel" style={{ padding: '24px 32px', minWidth: '280px' }}>
              <div className="contact-icon">{svgIcons.email}</div>
              <div className="contact-text">
                <h4>Email</h4>
                <p><a href="mailto:rohithviswanathan30@gmail.com">rohithviswanathan30@gmail.com</a></p>
              </div>
            </div>
            <div className="contact-card glass-panel" style={{ padding: '24px 32px', minWidth: '280px' }}>
              <div className="contact-icon">{svgIcons.linkedin}</div>
              <div className="contact-text">
                <h4>LinkedIn</h4>
                <p>
                  <a href="https://www.linkedin.com/in/rohith-v-28b065228/" target="_blank" rel="noopener noreferrer">
                    Rohit V
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-card glass-panel" style={{ padding: '24px 32px', minWidth: '280px' }}>
              <div className="contact-icon">{svgIcons.location}</div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Karur, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>ROHITH V</p>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>.NET Backend Developer Portfolio</p>
          </div>
          <p>© {new Date().getFullYear()} Rohith V. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/Rohith2468" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              {svgIcons.github}
            </a>
            <a href="https://www.linkedin.com/in/rohith-v-28b065228/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              {svgIcons.linkedin}
            </a>
            <a href="mailto:rohithviswanathan30@gmail.com" className="social-link" title="Email">
              {svgIcons.email}
            </a>
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

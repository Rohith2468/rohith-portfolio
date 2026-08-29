import React, { useState, useEffect } from 'react';
import ApiPlayground from './components/ApiPlayground';

export default function App() {
  const [activeTab, setActiveTab] = useState('education');
  const [skillsActive, setSkillsActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error'

  useEffect(() => {
    // Trigger skills bar animation after component mount
    const timer = setTimeout(() => setSkillsActive(true), 400);
    
    // Header scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', text: 'All form fields are required.' });
      return;
    }
    setFormStatus({ type: 'success', text: 'Thank you! Your message has been received.' });
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => setFormStatus(null), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            ROHITH V<span className="logo-dot"></span>
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
            <li><a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#playground" onClick={() => setMobileMenuOpen(false)}>API Sandbox</a></li>
            <li><a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a></li>
            <li><a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#education" onClick={() => setMobileMenuOpen(false)}>Academics</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
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
              <a href="#playground" className="btn btn-primary">Try API Console</a>
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
      <section id="about" className="section container">
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
                <span className="detail-label">Phone</span>
                <span className="detail-val">+91 95663 58733</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive REST API Sandbox */}
      <section id="playground" className="section container" style={{ background: 'rgba(10, 8, 20, 0.4)', borderRadius: '24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 50px auto' }}>
          <h2 className="section-title">Interactive API Sandbox</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '-30px' }}>
            Test Rohith's API endpoints live! Select an endpoint from the sidebar, verify the request details, and click "Send" to trigger a simulated backend response.
          </p>
        </div>
        <ApiPlayground />
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="section container">
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
      <section id="skills" className="section container">
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
      <section id="education" className="section container">
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
                <div className="list-item-icon">☕</div>
                <div className="list-item-content">
                  <h4>Java Full Stack</h4>
                  <p>Besant Technologies - Intensive training in full-stack architecture, object-oriented concepts, and relational models.</p>
                </div>
              </li>
              <li className="list-item glass-panel">
                <div className="list-item-icon">⚙️</div>
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
                <div className="list-item-icon">🤖</div>
                <div className="list-item-content">
                  <h4>Virtual Programming for Arduino (Robotics)</h4>
                  <p>Participated in hands-on Virtual Programming and embedded firmware development for Arduino microcontrollers conducted by Kongunadu College of Engineering and Technology.</p>
                </div>
              </li>
              <li className="list-item glass-panel">
                <div className="list-item-icon">⚡</div>
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
      <section id="contact" className="section container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-wrapper">
          
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-text">
                <h4>Email</h4>
                <p><a href="mailto:rohithviswanathan30@gmail.com">rohithviswanathan30@gmail.com</a></p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div className="contact-text">
                <h4>Phone</h4>
                <p><a href="tel:+919566358733">+91 95663 58733</a></p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Karur, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          <form className="contact-form glass-panel" onSubmit={handleFormSubmit}>
            <h3 style={{ textAlign: 'left', marginBottom: '8px' }}>Send a Message</h3>
            
            {formStatus && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="form-control" 
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                className="form-control" 
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                className="form-control" 
                placeholder="Write your project details or query..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Submit Message
            </button>
          </form>

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
              🐙
            </a>
            <a href="mailto:rohithviswanathan30@gmail.com" className="social-link" title="Email">
              ✉️
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

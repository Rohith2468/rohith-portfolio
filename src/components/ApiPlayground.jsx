import React, { useState, useEffect } from 'react';

const ENDPOINTS = [
  {
    id: 'profile',
    method: 'GET',
    path: '/api/profile',
    description: 'Fetch professional summary and contact details',
    response: {
      name: "Rohith V",
      title: ".NET Backend Developer",
      experience: "1 Year",
      location: "Karur, Tamil Nadu, India",
      email: "rohithviswanathan30@gmail.com",
      phone: "+91 95663 58733",
      summary: "Motivated and detail-oriented .NET Backend Developer with 1 year of professional experience at BME Solutions in designing, developing, and maintaining scalable RESTful APIs using ASP.NET Core and C#.",
      interests: ["System Architecture", "Query Optimization", "Microservices", "Robotics"]
    }
  },
  {
    id: 'skills',
    method: 'GET',
    path: '/api/skills',
    description: 'List technologies, frameworks, and tools',
    response: {
      languages: ["C#", "SQL", "JavaScript", "Java", "C", "C++"],
      frameworks: ["ASP.NET Core Web API", "Entity Framework Core", "Dapper"],
      databases: ["SQL Server", "Relational Database Design"],
      apiAndTools: ["REST APIs", "Swagger/OpenAPI", "Postman", "IIS"],
      versionControl: ["Git", "GitHub"],
      ide: ["Visual Studio", "VS Code"],
      other: ["HTML5", "CSS3", "Arduino/Robotics"]
    }
  },
  {
    id: 'experience',
    method: 'GET',
    path: '/api/experience',
    description: 'Retrieve employment and internship timeline',
    response: [
      {
        role: ".NET Backend Developer",
        company: "BME Solutions, Erode",
        period: "August 2025 - Present",
        responsibilities: [
          "Developed and maintained scalable RESTful APIs using ASP.NET Core Web API and C#.",
          "Designed and optimized SQL Server database queries, stored procedures, and data models.",
          "Implemented Entity Framework Core and Dapper for efficient database access.",
          "Integrated third-party APIs and authentication services.",
          "Created and maintained API documentation using Swagger/OpenAPI."
        ]
      },
      {
        role: "Web Development Intern",
        company: "Spinspider Technology",
        period: "1 Month",
        details: "Completed a one-month internship focusing on JavaScript-based Web Development."
      }
    ]
  },
  {
    id: 'contact',
    method: 'POST',
    path: '/api/contact',
    description: 'Submit an inquiry or message to Rohith',
    requestBody: {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello Rohith! I saw your portfolio and would love to collaborate on a .NET API project."
    },
    response: {
      status: "Success",
      message: "Thank you for reaching out! Your message has been routed directly to Rohith V.",
      recipient: "rohithviswanathan30@gmail.com",
      payloadReceived: null, // Will be filled dynamically in logic
      timestamp: null // Will be filled dynamically
    }
  }
];

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [requestBodyInput, setRequestBodyInput] = useState(JSON.stringify(ENDPOINTS[3].requestBody, null, 2));
  const [responseOutput, setResponseOutput] = useState(null);
  const [responseMeta, setResponseMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset output when selected endpoint changes
    setResponseOutput(null);
    setResponseMeta(null);
  }, [selectedEndpoint]);

  const handleSend = () => {
    setIsLoading(true);
    setResponseOutput(null);
    
    // Simulate API network latency
    const latency = Math.floor(Math.random() * 200) + 50; // 50ms - 250ms
    
    setTimeout(() => {
      let finalResponse = selectedEndpoint.response;
      let statusCode = 200;
      let statusText = "OK";
      
      if (selectedEndpoint.method === 'POST') {
        try {
          const parsed = JSON.parse(requestBodyInput);
          if (!parsed.name || !parsed.email || !parsed.message) {
            statusCode = 400;
            statusText = "Bad Request";
            finalResponse = {
              status: "Error",
              error: "ValidationError",
              message: "The fields 'name', 'email', and 'message' are required in the request body."
            };
          } else {
            finalResponse = {
              ...selectedEndpoint.response,
              payloadReceived: parsed,
              timestamp: new Date().toISOString()
            };
          }
        } catch (e) {
          statusCode = 400;
          statusText = "Bad Request";
          finalResponse = {
            status: "Error",
            error: "JSONParseException",
            message: "Malformed JSON payload. Please review syntax."
          };
        }
      }
      
      setResponseOutput(JSON.stringify(finalResponse, null, 2));
      setResponseMeta({
        status: `${statusCode} ${statusText}`,
        time: `${latency}ms`,
        size: `${(JSON.stringify(finalResponse).length / 1024).toFixed(3)} KB`
      });
      setIsLoading(false);
    }, latency);
  };

  return (
    <div className="api-playground">
      <div className="api-browser glass-panel">
        
        {/* Endpoint Sidebar */}
        <div className="api-sidebar">
          <h4>Endpoints</h4>
          <div className="api-endpoints-list">
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep)}
                className={`api-endpoint-btn ${selectedEndpoint.id === ep.id ? 'active' : ''}`}
              >
                <span className={`api-method ${ep.method.toLowerCase()}`}>
                  {ep.method}
                </span>
                <span>{ep.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Client Viewer */}
        <div className="api-client-view">
          <div className="api-client-header">
            <div className="api-client-title">
              <span className="text-gradient">Backend REST API Console</span>
              <span>v1.0.0</span>
            </div>
            <div className="api-indicators">
              <span className="indicator-dot red"></span>
              <span className="indicator-dot yellow"></span>
              <span className="indicator-dot green"></span>
            </div>
          </div>

          {/* URL & Trigger bar */}
          <div className="api-url-bar">
            <span className={`api-method ${selectedEndpoint.method.toLowerCase()}`}>
              {selectedEndpoint.method}
            </span>
            <div className="api-url-input">
              http://localhost:5000{selectedEndpoint.path}
            </div>
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="api-send-btn"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {/* Response / Request body panel */}
          <div className="api-response-area">
            <div style={{ textAlign: 'left', marginBottom: '8px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {selectedEndpoint.description}
              </p>
            </div>

            {selectedEndpoint.method === 'POST' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  REQUEST BODY (JSON)
                </label>
                <textarea
                  value={requestBodyInput}
                  onChange={(e) => setRequestBodyInput(e.target.value)}
                  className="form-control"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    background: '#080710',
                    color: '#a78bfa',
                    minHeight: '110px',
                    borderColor: 'var(--border-light)'
                  }}
                />
              </div>
            )}

            {/* Results Panel */}
            {isLoading && (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--accent-cyan)' }}>
                <span className="text-gradient" style={{ fontFamily: 'var(--font-mono)' }}>
                  Fetching data from .NET core server...
                </span>
              </div>
            )}

            {responseOutput && !isLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="api-response-meta">
                  <span>Status: <strong className="response-status">{responseMeta.status}</strong></span>
                  <span>Time: <span className="response-time">{responseMeta.time}</span></span>
                  <span>Size: <span className="response-time">{responseMeta.size}</span></span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                    RESPONSE BODY (JSON)
                  </label>
                  <pre className="api-response-body">
                    {responseOutput}
                  </pre>
                </div>
              </div>
            )}

            {!responseOutput && !isLoading && (
              <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  Click "Send" to execute the simulated HTTP request and view the JSON response payload.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

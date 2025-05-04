// main.js - CoreWeave Credit Analysis Demo
// Last updated: 2025-05-04
// Simple version with static chart images

// Global state to prevent duplicate initializations
let demoInitialized = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Init] Document loaded, setting up demo");
  
  // Configure marked.js to allow HTML
  marked.setOptions({
    sanitize: false,
    smartypants: true,
    headerIds: true,
    gfm: true
  });
  
  const startBtn = document.getElementById("start-demo-btn");
  const titleSlide = document.getElementById("title-slide");
  const app = document.getElementById("app");
  const mdContainer = document.getElementById("markdown-content");
  
  if (!startBtn || !titleSlide || !app || !mdContainer) {
    console.error("[Init] Missing required DOM elements");
    return;
  }

  // Add the event listener to start button
  startBtn.addEventListener("click", () => {
    if (demoInitialized) {
      console.log("[Init] Demo already initialized, ignoring click");
      return;
    }
    
    console.log("[Init] Start Demo clicked");
    demoInitialized = true;
    
    // Hide title slide and show app
    titleSlide.style.display = "none";
    app.style.display = "";
    
    // Show loading indicator
    mdContainer.innerHTML = '<div class="loading">Loading analysis...</div>';
    
    // Load and render markdown
    loadAnalysis();
  });
});

// Load and render the analysis
async function loadAnalysis() {
  const mdContainer = document.getElementById("markdown-content");
  
  try {
    // 1. Load markdown content
    console.log("[Analysis] Loading markdown content");
    const res = await fetch("credit_analysis.md");
    
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    
    // 2. Parse markdown and insert into DOM
    const mdText = await res.text();
    mdContainer.innerHTML = marked.parse(mdText);
    
    // 3. Generate sidebar from H2 headings
    buildSidebar();
    
    // 4. Add static chart images to replace canvas elements
    insertStaticCharts();
    
    // 5. Add interactive app link
    addAppLink();
    
    console.log("[Analysis] Content loaded and rendered successfully");
    
  } catch (err) {
    console.error("[Analysis] Error:", err);
    mdContainer.innerHTML = `
      <div class="error">
        <h2>Error Loading Content</h2>
        <p>${err.message}</p>
        <button onclick="location.reload()">Try Again</button>
      </div>
    `;
  }
}

// Build sidebar navigation from H2 headings
function buildSidebar() {
  const sidebar = document.getElementById("sidebar-nav");
  const headings = document.querySelectorAll("#markdown-content h2");
  
  sidebar.innerHTML = "";
  
  headings.forEach((h, i) => {
    // Create ID for heading if it doesn't have one
    const id = h.id || `section-${i}`;
    h.id = id;
    
    // Create sidebar link
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = h.textContent;
    a.addEventListener("click", (e) => {
      // Smooth scroll to section
      e.preventDefault();
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    });
    
    li.appendChild(a);
    sidebar.appendChild(li);
  });
  
  console.log(`[Sidebar] Built with ${headings.length} sections`);
}

// Insert static chart images instead of canvas elements
function insertStaticCharts() {
  const chartData = [
    {
      title: "Customer Mix",
      description: "Microsoft (62%), Customer C (15%), Others (23%)",
      type: "pie"
    },
    {
      title: "Revenue Growth",
      description: "2022: $15.8M, 2023: $228.9M, 2024: $1,920M",
      type: "bar"
    },
    {
      title: "Debt Structure",
      description: "Distribution of debt maturity: $8B total across 2025-2029+",
      type: "bar"
    }
  ];
  
  chartData.forEach(chart => {
    // Try to find the heading with this title
    const headings = Array.from(document.querySelectorAll("#markdown-content h2, #markdown-content h3"));
    const heading = headings.find(h => h.textContent.trim().toLowerCase() === chart.title.toLowerCase());
    
    if (heading) {
      // Create static chart element
      const chartContainer = document.createElement("div");
      chartContainer.className = "static-chart";
      chartContainer.style.backgroundColor = "#f8f9fa";
      chartContainer.style.border = "1px solid #dee2e6";
      chartContainer.style.borderRadius = "8px";
      chartContainer.style.padding = "1rem";
      chartContainer.style.margin = "1rem 0";
      chartContainer.style.textAlign = "center";
      
      // Chart type indicator and image placeholder
      const chartType = chart.type === "pie" ? "🍩" : "📊";
      
      chartContainer.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 0.5rem;">${chart.title} Chart</div>
        <div style="font-size: 3rem; color: #3498db; margin: 1rem 0;">${chartType}</div>
        <div style="background: ${chart.type === "pie" ? "#e8f4f8" : "#f1f8e9"}; padding: 0.5rem; border-radius: 4px;">
          ${chart.description}
        </div>
      `;
      
      // Insert after heading
      heading.parentNode.insertBefore(chartContainer, heading.nextSibling);
      console.log(`[Charts] Added static chart for ${chart.title}`);
    }
  });
}

// Add link to the interactive app
function addAppLink() {
  const appLink = document.createElement("div");
  appLink.style.textAlign = "center";
  appLink.style.margin = "3rem 0 1rem 0";
  appLink.style.padding = "1rem";
  appLink.style.backgroundColor = "#f1f8e9";
  appLink.style.borderRadius = "8px";
  
  appLink.innerHTML = `
    <p>Explore our interactive agentic AI credit analysis app:</p>
    <a href="app.html" class="app-link" style="
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #2e7d32;
      color: white;
      text-decoration: none;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 0.5rem;
    ">Launch Interactive App</a>
  `;
  
  document.getElementById("markdown-content").appendChild(appLink);
}

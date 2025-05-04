/**
 * agentic.js
 * ==========
 * Core logic for the agentic credit analysis application.
 * 
 * This file handles:
 * 1. The simulated agentic build process
 * 2. Report generation based on user input
 * 3. UI transitions and rendering
 * 4. Dynamic section navigation
 * 
 * Dependencies:
 * - None (vanilla JavaScript only)
 * - Chart.js (loaded dynamically in the report template)
 * 
 * @version 1.2.0
 * @lastUpdated 2025-05-04
 */

// =======================================================
// SECTION 1: UTILITY FUNCTIONS
// =======================================================

/**
 * Global debug mode - set to true to enable debug panel and verbose logging
 */
const DEBUG_MODE = true;

/**
 * Logs status messages or errors to the UI
 * @param {string} message - The message to display in the log area
 * @param {boolean} isError - Whether this is an error message (will be styled differently)
 */
function logStatus(message, isError = false) {
    const logArea = document.getElementById('agentic-log');
    
    // Always log to console for debugging purposes
    isError 
        ? console.error(`[AgenticApp] ${message}`) 
        : console.log(`[AgenticApp] ${message}`);
    
    // Update debug status if in debug mode
    updateDebugStatus(message);
    
    // If log area doesn't exist, just return after console logging
    if (!logArea) {
        console.warn('[AgenticApp] Log area not found in DOM, but continuing with operation');
        return;
    }
    
    const p = document.createElement('p');
    p.textContent = message;
    if (isError) {
        p.className = 'error-log';
    }
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;
}

/**
 * Updates debug status panel
 * @param {string} message - Current status message
 */
function updateDebugStatus(message) {
    if (!DEBUG_MODE) return;
    
    // Enable debug mode on the body
    document.body.classList.add('debug');
    
    // Update status message
    const statusElem = document.getElementById('debug-status');
    if (statusElem) {
        statusElem.textContent = `Status: ${message.substring(0, 30)}${message.length > 30 ? '...' : ''}`;
    }
    
    // Update section and link counts
    const sectionsElem = document.getElementById('debug-sections');
    const linksElem = document.getElementById('debug-links');
    
    if (sectionsElem) {
        const sectionCount = document.querySelectorAll('.collapsible').length;
        sectionsElem.textContent = `Sections: ${sectionCount}`;
    }
    
    if (linksElem) {
        const linkCount = document.querySelectorAll('#sidebar a').length;
        linksElem.textContent = `Links: ${linkCount}`;
    }
}

/**
 * Generates a slightly randomized timing to make simulation feel more natural
 * @param {number} base - Base time in milliseconds
 * @param {number} variance - Max random variance to add (default: 300ms)
 * @returns {number} - Final timing with random variance
 */
function getRandomTiming(base, variance = 300) {
    return base + Math.floor(Math.random() * variance);
}

// =======================================================
// SECTION 2: AGENTIC BUILD PROCESS
// =======================================================

/**
 * Handles the simulated agentic build process
 * Shows a step-by-step process of "building" the agentic analysis capabilities
 */
function startAgenticBuild() {
    console.log("[AgenticApp] Starting agentic build process");
    
    // Disable button during process
    const buildBtn = document.getElementById('start-agentic-build');
    if (buildBtn) buildBtn.disabled = true;
    
    // Get the status area and clear any previous content
    const buildStatusContainer = document.querySelector('#step2 .section-content');
    if (!buildStatusContainer) {
        console.error('[AgenticApp] Build section content area not found');
        return;
    }
    
    // First, remove any existing status area
    const existingStatusArea = document.getElementById('build-status');
    if (existingStatusArea) {
        existingStatusArea.remove();
    }
    
    // Create a new status area
    const statusArea = document.createElement('div');
    statusArea.id = 'build-status';
    statusArea.className = 'status-area';
    buildStatusContainer.appendChild(statusArea);
    
    // Define the build steps
    const buildSteps = [
        { message: "Initializing agentic credit analysis system...", delay: 500 },
        { message: "Loading financial data models and credit assessment frameworks...", delay: 1200 },
        { message: "Setting up industry benchmarking capabilities...", delay: 1500 },
        { message: "Integrating financial ratio analysis modules...", delay: 1800 },
        { message: "Configuring debt structure evaluation components...", delay: 1600 },
        { message: "Building credit rating determination algorithm...", delay: 2000 },
        { message: "Setting up scenario analysis and stress testing framework...", delay: 1900 },
        { message: "Finalizing report generation capabilities...", delay: 1700 },
        { message: "Build complete! The agentic credit analysis system is ready.", delay: 1000, complete: true }
    ];
    
    // Track current step
    let currentStepIndex = 0;
    
    // Process each step
    function executeNextStep() {
        if (currentStepIndex < buildSteps.length) {
            const step = buildSteps[currentStepIndex];
            
            // Create step element
            const stepElement = document.createElement('p');
            stepElement.className = step.complete ? 'status-message complete' : 'status-message';
            statusArea.appendChild(stepElement);
            
            // Simulate typing effect
            let charIndex = 0;
            const messageChars = step.message.split('');
            const typingInterval = setInterval(() => {
                if (charIndex < messageChars.length) {
                    stepElement.textContent += messageChars[charIndex];
                    charIndex++;
                    // Scroll to bottom
                    statusArea.scrollTop = statusArea.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                    
                    // Move to next step after delay
                    currentStepIndex++;
                    setTimeout(executeNextStep, step.delay);
                }
            }, 25); // Typing speed
        } else {
            // All steps complete
            console.log("[AgenticApp] Build process completed");
            
            // Re-enable button
            if (buildBtn) {
                buildBtn.disabled = false;
            }
            
            // Wait a moment and then show completion message
            setTimeout(() => {
                // Update descriptive text
                const generateSection = document.getElementById('step3');
                if (generateSection) {
                    const descElement = generateSection.querySelector('.section-description');
                    if (descElement) {
                        descElement.innerHTML = '<strong>Build completed successfully!</strong> I have built the application as specified in your requirements. Please enter a company name below to generate a comprehensive credit assessment report.';
                    }
                }
                
                // Show the assessment step
                showAppStep('step3');
            }, 2000);
            
            logStatus('Agentic credit analysis system built successfully!');
        }
    }
    
    // Start the process
    executeNextStep();
}

// =======================================================
// SECTION 3: REPORT GENERATION
// =======================================================

/**
 * Generates a credit assessment based on company name input
 * Displays the result in the result container
 */
function generateAssessment() {
    console.log("[AgenticApp] Generate assessment function called");
    
    // Get company name from input
    const companyNameInput = document.getElementById('company-name');
    if (!companyNameInput) {
        console.error('[AgenticApp] Company name input not found');
        alert('Error: Company name input not found');
        return;
    }
    
    const companyName = companyNameInput.value.trim();
    console.log(`[AgenticApp] Company name: "${companyName}"`);
    
    // Validate company name
    if (!companyName) {
        alert('Please enter a company name');
        return;
    }
    
    // Disable button
    const generateBtn = document.getElementById('generate-assessment');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
    }
    
    // Get the section content container
    const assessmentContainer = document.querySelector('#step3 .section-content');
    if (!assessmentContainer) {
        console.error('[AgenticApp] Assessment section content area not found');
        return;
    }
    
    // First, remove any existing status area
    const existingStatusArea = document.getElementById('assessment-status');
    if (existingStatusArea) {
        existingStatusArea.remove();
    }
    
    // Create a new status area
    const statusArea = document.createElement('div');
    statusArea.id = 'assessment-status';
    statusArea.className = 'assessment-status-area';
    assessmentContainer.appendChild(statusArea);
    
    console.log('[AgenticApp] Created new assessment status area');
    
    // Define streaming steps for assessment generation
    const streamingSteps = [
        { message: "Initializing credit assessment model for " + companyName + "...", time: 1200 },
        { message: "Loading financial data and market benchmarks...", time: 1500 },
        { message: "Analyzing revenue streams and growth trajectory...", time: 1800 },
        { message: "Evaluating debt structure and covenant compliance...", time: 1600 },
        { message: "Calculating key credit metrics and ratios...", time: 1700 },
        { message: "Performing industry peer comparison...", time: 1900 },
        { message: "Analyzing liquidity position and refinancing risk...", time: 2000 },
        { message: "Generating executive summary and credit conclusion...", time: 2200 },
        { message: "Assessment complete! Rendering comprehensive credit report for " + companyName + "...", time: 2500 }
    ];
    
    let currentIndex = 0;
    
    // Process the steps one by one with typing effect
    function processNextStep() {
        if (currentIndex >= streamingSteps.length) {
            // Create a final rendering animation
            const renderingElement = document.createElement('div');
            renderingElement.className = 'build-step rendering-step';
            statusArea.appendChild(renderingElement);
            
            // Add a loading spinner
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            renderingElement.appendChild(spinner);
            
            // Add rendering message
            const renderingMessage = document.createElement('span');
            renderingMessage.textContent = "Formatting and rendering report...";
            renderingMessage.style.marginLeft = "15px";
            renderingElement.appendChild(renderingMessage);
            
            // Simulate rendering delay
            setTimeout(() => {
                // Add "almost done" message
                const finalMessage = document.createElement('div');
                finalMessage.className = 'build-step';
                finalMessage.textContent = "Report completed! Displaying results...";
                statusArea.appendChild(finalMessage);
                
                // Show the final report with a fade-in after a short delay
                setTimeout(() => {
                    // Fade out the status area
                    statusArea.style.transition = 'opacity 1s ease-out';
                    statusArea.style.opacity = '0';
                    
                    // Re-enable the button
                    if (generateBtn) {
                        generateBtn.disabled = false;
                        generateBtn.textContent = 'Generate Assessment';
                    }
                    
                    // Display the report with a fade in
                    setTimeout(() => {
                        // Remove the status area once faded out
                        statusArea.style.display = 'none';
                        
                        // Display the report
                        displayCreditReport(companyName);
                        
                        // Fade in the report container
                        const resultContainer = document.getElementById('result-container');
                        if (resultContainer) {
                            resultContainer.style.opacity = '0';
                            resultContainer.style.display = 'block';
                            
                            setTimeout(() => {
                                resultContainer.style.transition = 'opacity 1s ease-in';
                                resultContainer.style.opacity = '1';
                            }, 100);
                        }
                    }, 1000); // After fade out completes
                }, 1500);
            }, 2000);
            
            return;
        }
        
        const step = streamingSteps[currentIndex];
        const stepElement = document.createElement('div');
        stepElement.className = 'build-step';
        statusArea.appendChild(stepElement);
        
        // Type out the message character by character
        const message = step.message;
        let charIndex = 0;
        
        function typeNextChar() {
            if (charIndex < message.length) {
                stepElement.textContent += message[charIndex];
                charIndex++;
                setTimeout(typeNextChar, 15); // Type fairly quickly
            } else {
                // Message fully typed, move to next step after specified delay
                currentIndex++;
                setTimeout(processNextStep, step.time);
            }
        }
        
        // Start typing
        typeNextChar();
    }
    
    // Start the process
    processNextStep();
}

/**
 * Displays the credit assessment report in the result container
 * @param {string} companyName - The name of the company to generate the report for
 */
function displayCreditReport(companyName) {
    console.log(`[AgenticApp] Displaying credit report for ${companyName}`);
    
    // Get the result container
    const resultContainer = document.getElementById('result-container');
    if (!resultContainer) {
        console.error('[AgenticApp] Result container not found');
        return;
    }
    
    // Set up the report
    const reportHtml = generateReportTemplate(companyName);
    resultContainer.innerHTML = reportHtml;
    
    // Show the result section
    showAppStep('step4');
    
    // Initialize the charts
    setTimeout(() => {
        try {
            console.log('[AgenticApp] Initializing charts for the credit report');
            initializeCharts();
            
            // Set up collapsible sections in the report
            setupCollapsibleSections();
            
            console.log('[AgenticApp] Credit report rendered successfully');
        } catch (error) {
            console.error('[AgenticApp] Error initializing charts:', error);
        }
    }, 200);
}

/**
 * Generates the HTML template for the credit assessment report
 * @param {string} company - Company name to use in the report
 * @returns {string} - HTML template for the report
 */
function generateReportTemplate(company) {
    return `
    <div class="result-app">
      <aside id="sidebar">
        <nav>
          <ul>
            <li><a href="#executive-summary" class="active">Executive Summary</a></li>
            <li><a href="#business-profile">Business & Competitive Profile</a></li>
            <li><a href="#financial-analysis">Financial Analysis</a></li>
            <li><a href="#debt-structure">Debt Structure</a></li>
            <li><a href="#industry">Industry & Macro</a></li>
            <li><a href="#risks">Risks & Scenarios</a></li>
          </ul>
        </nav>
      </aside>
      <main id="content">
        <header>
          <h1 id="page-title" class="main-title">${company} Credit Assessment – May 2025</h1>
        </header>
        <div id="sections-container">
          <section id="executive-summary" class="collapsible open">
            <h2>Executive Summary and Credit Conclusion</h2>
            <p><b>${company}</b> exhibits a highly speculative credit profile – best characterized as non-investment grade (high-yield). In our shadow rating, we would place ${company} around the B+ (Moody's B1/B2) range, reflecting robust growth prospects offset by heavy leverage and concentration risks. Key credit drivers include:</p>
            <ul>
              <li><b>Explosive Growth & Scale:</b> Revenue surged from just $229 million in 2023 to $1.92 billion in 2024 – an eightfold increase year-on-year – positioning ${company} as a major player in AI cloud infrastructure. This growth is underpinned by multi-year contracts (backlog of ~$15.1 billion in remaining performance obligations) that provide some revenue visibility.</li>
              <li><b>Leverage & Capital Intensity:</b> The company carries approximately $8 billion of debt (as of end-2024), used to finance its GPU fleet and data center expansion. Adjusted EBITDA margins are high (>60% in 2024), implying roughly $1.2 billion in EBITDA, but net debt/EBITDA remains ~5–6×, well into speculative-grade territory. Annual interest expense was $361 million in 2024, resulting in EBITDA-to-interest coverage of only ~3×, and free cash flow (FCF) is deeply negative (–$5.9 billion in 2024) due to massive capital expenditures.</li>
              <li><b>Customer Concentration:</b> ${company}'s revenue is dangerously concentrated – 77% of 2024 revenue came from its top two customers (including Microsoft). Microsoft alone accounted for ~62% of revenue, exposing the firm to significant volume and renewal risk if this key relationship or its AI strategy shifts. The recently inked $11.9 billion, 5-year contract with OpenAI should help diversify the base going forward, but concentration will remain a central credit concern in the near term.</li>
              <li><b>Operational Momentum vs. Execution Risk:</b> ${company} has first-mover advantage in specialized AI cloud infrastructure, with strong backing from Nvidia (a stakeholder and key supplier) and marquee clients, evidenced by a new $11.9 billion contract with OpenAI. However, execution risks are high given the capital-intensive, rapidly evolving technology and formidable competitors (Big Tech hyperscalers). The company's ability to continue scaling efficiently and manage costs will determine if it can turn its booming revenue into sustainable cash flow.</li>
              <li><b>Liquidity & Financial Flexibility:</b> ${company}'s liquidity is bolstered by large upfront customer payments – operating cash flow was $2.75 billion in 2024 thanks to prepaid commitments – and a recent $7.5 billion debt facility provides growth capital. Cash on hand was $1.4 billion (plus ~$704 million restricted) at year-end 2024, and the company raised $1.5 billion in its March 2025 IPO. These funds partially mitigate near-term liquidity concerns and allowed ~$1 billion debt repayment post-IPO. That said, ${company} remains dependent on external financing; continued market access is critical to fund expansion and refinance maturing obligations.</li>
            </ul>
            <p><b>Credit Conclusion:</b> Overall, ${company}'s credit profile is speculative with a negative outlook. The headline metrics – net debt/EBITDA ~5.5×, EBITDA margin ~60%, interest coverage ~3×, and large negative FCF – align with a high-yield rating (single- to double-B). The red flags of customer concentration and high debt load are partially offset by mitigants like contracted revenue backlog and asset collateralization (e.g. NVIDIA H100 GPUs used to secure loans). Given these factors, we recommend extreme caution to lenders: any exposure should be secured and covenant-heavy, or otherwise kept minimal. Our recommendation is to lend only on a secured basis (e.g. GPU-backed financings) and avoid unsecured lending absent significant improvement in diversification and cash flows. We would seek covenants around leverage, minimum liquidity, and limitations on additional debt. Credit outlook is fragile; we would revisit our stance if ${company} successfully diversifies its customer base and generates consistent free cash flow (positive triggers), or conversely, if it faces contract cancellations or funding shortfalls (negative triggers).</p>
            <div class="table-container">
              <table class="financial-table">
                <caption>Financial Summary (2022–2024)</caption>
                <thead>
                  <tr>
                    <th><span class="th-icon" aria-label="Year">📅</span>Year</th>
                    <th><span class="th-icon" aria-label="Revenue">💰</span>Revenue ($M)</th>
                    <th><span class="th-icon" aria-label="EBITDA">📈</span>EBITDA ($M)</th>
                    <th><span class="th-icon" aria-label="Net Income">🧾</span>Net Income ($M)</th>
                    <th><span class="th-icon" aria-label="Debt">🏦</span>Debt ($M)</th>
                    <th><span class="th-icon" aria-label="Free Cash Flow">💧</span>FCF ($M)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>2022</td><td>15.8</td><td>-10</td><td>-31</td><td>0</td><td>-50</td></tr>
                  <tr><td>2023</td><td>228.9</td><td>60</td><td>-594</td><td>3,000</td><td>-1,500</td></tr>
                  <tr><td>2024</td><td>1,920</td><td>1,152</td><td>-863</td><td>8,000</td><td>-5,900</td></tr>
                </tbody>
              </table>
            </div>
            <span class="chart-label">Revenue Growth (2022–2024)</span>
            <div class="chart-container">
              <canvas id="revenue-chart"></canvas>
            </div>
          </section>
          
          <section id="business-profile" class="collapsible">
            <h2>Business & Competitive Profile</h2>
            <p>${company} is a specialized infrastructure provider in the rapidly growing AI cloud computing market. The company designs, builds, and operates purpose-built data centers optimized for artificial intelligence workloads, primarily focusing on large-scale GPU clusters for training and inference. Unlike general-purpose cloud providers, ${company} specifically targets high-performance computing for AI applications, which require significant computational power and specialized hardware configurations.</p>
            <h3>Business Model</h3>
            <ul>
              <li><b>Infrastructure-as-a-Service (IaaS):</b> ${company} provides dedicated GPU compute capacity on a contractual basis, allowing AI companies to run large language models and other AI workloads without building their own infrastructure.</li>
              <li><b>Contract Structure:</b> The business operates primarily on multi-year contracts with minimum capacity commitments, providing revenue stability. Most contracts feature prepayment components and volume-based pricing tiers.</li>
              <li><b>Value Proposition:</b> ${company} offers faster deployment times, optimized hardware configurations, and lower total cost of ownership compared to in-house infrastructure development. The company claims its specialized designs provide up to 30-40% better performance per dollar than general-purpose clouds.</li>
            </ul>
            <h3>Competitive Position</h3>
            <p>${company} holds a unique position as an early mover in dedicated AI infrastructure, but faces significant competitive pressures:</p>
            <ul>
              <li><b>Strengths:</b> First-mover advantage in AI-optimized infrastructure; deep partnership with Nvidia securing priority access to GPU allocations; specialized expertise in AI-optimized data center design; multi-year contract backlog.</li>
              <li><b>Weaknesses:</b> Extreme customer concentration (Microsoft ~62% of 2024 revenue); capital-intensive business model requiring continuous funding; limited brand recognition compared to hyperscalers; single-purpose infrastructure limiting flexibility.</li>
              <li><b>Key Competitors:</b> Major hyperscalers (AWS, Google Cloud, Azure) are rapidly expanding their AI infrastructure offerings and represent the most significant competitive threat. Additionally, several VC-backed startups have entered the space in the past 12-18 months.</li>
            </ul>
            <p>While ${company} benefits from early-mover advantage and specialized expertise, its competitive moat is relatively narrow and under constant pressure from larger, better-capitalized competitors. The company's ability to maintain technological differentiation, secure GPU supply, and expand its customer base beyond a few anchor clients will be critical for long-term success.</p>
          </section>
          
          <section id="financial-analysis" class="collapsible">
            <h2>Financial Analysis</h2>
            <p>${company}'s financial profile reflects its hypergrowth stage combined with capital intensity, characterized by explosive revenue growth, rapidly expanding margins, but substantial negative free cash flow due to massive capital expenditures.</p>
            
            <h3>Revenue & Growth</h3>
            <p>Revenue growth has been extraordinary, expanding from $15.8 million in 2022 to $1.92 billion in 2024 – representing a 12,000% increase over just two years. This meteoric growth reflects the rapid scaling of ${company}'s AI infrastructure business, driven by significant demand from a small number of large customers. The company's revenue backlog of $15.1 billion in remaining performance obligations provides some medium-term visibility, though this is heavily concentrated among a few clients.</p>
            
            <h3>Profitability Metrics</h3>
            <p>Despite its early stage, ${company} demonstrates strong profitability metrics at the operating level:</p>
            <ul>
              <li><b>EBITDA Margin:</b> 60% in 2024, reflecting the inherently high margins of cloud infrastructure at scale</li>
              <li><b>Gross Margin:</b> 72% in 2024, improved from 67% in 2023 as operational efficiency increased</li>
              <li><b>Operating Margin:</b> 50% in 2024, though this doesn't fully reflect the capital intensity of the business</li>
              <li><b>Net Income Margin:</b> -45% in 2024, still negative primarily due to high interest expenses and depreciation</li>
            </ul>
            
            <h3>Cash Flow & Capital Expenditures</h3>
            <p>The company's cash flow profile reflects its aggressive growth strategy:</p>
            <ul>
              <li><b>Operating Cash Flow:</b> $2.75 billion in 2024, bolstered by significant prepayments from customers</li>
              <li><b>Capital Expenditures:</b> $8.65 billion in 2024, primarily for GPU purchases and data center construction</li>
              <li><b>Free Cash Flow:</b> -$5.9 billion in 2024, highlighting the capital-intensive nature of building AI infrastructure</li>
              <li><b>FCF Conversion:</b> -513% (FCF/EBITDA), indicating the massive reinvestment requirements of the business</li>
            </ul>
            
            <span class="chart-label">Margin Trends (2022–2024)</span>
            <div class="chart-container">
              <canvas id="margins-chart"></canvas>
            </div>
          </section>
          
          <section id="debt-structure" class="collapsible">
            <h2>Debt Structure & Maturity Profile</h2>
            <p>${company} maintains a complex capital structure with approximately $8 billion in total debt as of December 31, 2024. The debt instruments are primarily used to finance GPU purchases and data center construction. Following the IPO in March 2025, the company repaid approximately $1 billion in debt, leaving a current debt balance of around $7 billion.</p>
            
            <h3>Key Debt Instruments</h3>
            <ul>
              <li><b>Senior Secured Term Loan:</b> $3.5 billion, maturing 2028, L+350bps, secured by GPU assets</li>
              <li><b>Equipment Financing Facility:</b> $2.1 billion, various maturities 2026-2028, weighted average rate of 5.8%</li>
              <li><b>Convertible Notes:</b> $1.7 billion, maturing 2029, 2.25% coupon, conversion price $45/share</li>
              <li><b>Revolving Credit Facility:</b> $1.5 billion commitment, $700 million drawn, maturing 2027, L+300bps</li>
            </ul>
            
            <h3>Leverage Metrics</h3>
            <p>The company's leverage metrics reflect its aggressive growth financing strategy:</p>
            <ul>
              <li><b>Gross Debt/EBITDA:</b> 6.9x (based on 2024 EBITDA)</li>
              <li><b>Net Debt/EBITDA:</b> 5.7x (accounting for $1.4 billion cash on hand)</li>
              <li><b>EBITDA/Interest Expense:</b> 3.2x, indicating moderate interest coverage</li>
              <li><b>Secured Debt/Total Assets:</b> 32%, reflecting significant asset encumbrance</li>
            </ul>
            
            <h3>Debt Maturity Schedule</h3>
            <p>The company's debt maturities are relatively well-staggered, with no significant near-term maturities:</p>
            <span class="chart-label">Debt Maturity Profile ($ millions)</span>
            <div class="chart-container">
              <canvas id="debt-chart"></canvas>
            </div>
            
            <h3>Liquidity Analysis</h3>
            <p>${company}'s current liquidity position includes:</p>
            <ul>
              <li><b>Cash and Cash Equivalents:</b> $1.4 billion</li>
              <li><b>Restricted Cash:</b> $704 million (primarily GPU purchase commitments)</li>
              <li><b>Undrawn RCF Capacity:</b> $800 million</li>
              <li><b>Contract Prepayments (next 12 months):</b> $3.2 billion expected</li>
            </ul>
            <p>Based on current cash burn rates and capital expenditure plans, we estimate the company has approximately 12-18 months of liquidity runway before requiring additional financing. This assessment assumes no significant adverse changes to planned customer prepayments or capital expenditure requirements.</p>
          </section>
          
          <section id="industry" class="collapsible">
            <h2>Industry & Macroeconomic Analysis</h2>
            <p>The AI infrastructure market is experiencing unprecedented growth, driven by the rapid advancement and adoption of artificial intelligence technologies across industries. The specialized AI cloud infrastructure segment, where ${company} operates, is projected to grow from $25 billion in 2024 to over $100 billion by 2027, representing a 59% compound annual growth rate.</p>
            
            <h3>Industry Dynamics</h3>
            <ul>
              <li><b>Supply Constraints:</b> The industry faces significant supply constraints, particularly around high-performance GPUs, creating both challenges and opportunities for established players like ${company} that have secured supply agreements.</li>
              <li><b>Vertical Integration Pressures:</b> There is increasing pressure from large technology companies to vertically integrate AI infrastructure, potentially threatening ${company}'s business model if key customers develop in-house capabilities.</li>
              <li><b>Technological Evolution:</b> Rapid evolution in AI hardware (e.g., next-generation GPUs, specialized AI chips, optical computing) creates both obsolescence risk for ${company}'s investments and opportunities for differentiation.</li>
              <li><b>Regulatory Landscape:</b> Growing regulatory scrutiny around AI technologies, data centers' environmental impact, and technology industry concentration may introduce additional compliance costs and operational constraints.</li>
            </ul>
            
            <h3>Macroeconomic Factors</h3>
            <p>Several macroeconomic factors significantly impact ${company}'s business model and growth trajectory:</p>
            <ul>
              <li><b>Interest Rate Environment:</b> The high interest rate environment increases ${company}'s cost of capital, particularly important given its capital-intensive business model and negative free cash flow. Any sustained increase in rates would materially impact profitability and growth capacity.</li>
              <li><b>Technology Investment Cycles:</b> The company benefits from the current robust investment cycle in AI technologies, but would be vulnerable to any cyclical downturn in technology investment.</li>
              <li><b>Energy Costs:</b> Data center operations are energy-intensive, making ${company} sensitive to energy price fluctuations. The company has implemented some renewable energy initiatives but remains primarily dependent on traditional power sources.</li>
              <li><b>Global Supply Chains:</b> Continued disruptions in global semiconductor supply chains could impact GPU availability and pricing, though ${company}'s preferred relationship with Nvidia provides some insulation from the most severe impacts.</li>
            </ul>
            
            <h3>Competitive Landscape</h3>
            <p>${company} operates in an increasingly competitive landscape, characterized by:</p>
            <ul>
              <li><b>Hyperscaler Expansion:</b> Major cloud providers (AWS, Google Cloud, Microsoft Azure) are rapidly expanding their AI infrastructure offerings, leveraging their scale, capital resources, and existing customer relationships.</li>
              <li><b>New Entrants:</b> Several well-funded startups have entered the specialized AI infrastructure space in the past 18 months, increasing competitive pressure.</li>
              <li><b>Pricing Pressure:</b> While currently muted due to supply constraints, medium-term pricing pressure is expected as supply catches up with demand and competition intensifies.</li>
              <li><b>Infrastructure Commoditization:</b> There is risk of AI infrastructure commoditization over time, potentially eroding ${company}'s ability to maintain premium pricing.</li>
            </ul>
          </section>
          
          <section id="risks" class="collapsible">
            <h2>Risk Factors & Scenarios</h2>
            <h3>Key Credit Risks</h3>
            <p>${company} faces several significant credit risks that could materially impact its financial position and creditworthiness:</p>
            <ul>
              <li><b>Customer Concentration Risk:</b> With Microsoft accounting for approximately 62% of revenue and the top two customers representing 77%, ${company} is extremely vulnerable to changes in these relationships. Loss or significant reduction of either key customer would have severe financial consequences.</li>
              <li><b>Technology Obsolescence Risk:</b> The rapid pace of innovation in AI hardware creates risk that ${company}'s substantial investments in current-generation GPUs could face accelerated obsolescence if breakthrough technologies emerge.</li>
              <li><b>Refinancing Risk:</b> Given the company's negative free cash flow and substantial debt, it faces significant refinancing risk, particularly if capital markets become less receptive to high-yield issuers in the technology sector.</li>
              <li><b>Execution Risk:</b> The company's aggressive growth strategy requires flawless execution in data center deployment, which introduces operational risks related to construction delays, supply chain disruptions, or technical complications.</li>
              <li><b>Competitive Pressure:</b> Increasing competition from both hyperscalers and new entrants could erode margins, increase customer acquisition costs, or limit growth opportunities.</li>
            </ul>
            
            <h3>Scenario Analysis</h3>
            <p>We've modeled three scenarios to assess ${company}'s financial resilience:</p>
            
            <h4>Base Case (60% Probability)</h4>
            <ul>
              <li>Revenue grows at 75% in 2025, moderating to 40% by 2027</li>
              <li>EBITDA margins maintain at 58-62% range</li>
              <li>Capital expenditures remain at ~300% of EBITDA through 2026, declining thereafter</li>
              <li>Successfully raises $3-4 billion in additional equity/debt over next 24 months</li>
              <li>Net Debt/EBITDA improves to ~4.0x by year-end 2026</li>
              <li>Credit metrics consistent with B+/B1 rating by 2026</li>
            </ul>
            
            <h4>Upside Case (25% Probability)</h4>
            <ul>
              <li>Revenue grows at 90%+ in 2025, maintaining 50%+ growth through 2027</li>
              <li>Customer diversification improves, with top customer representing <50% of revenue by 2026</li>
              <li>EBITDA margins expand to 65%+ as scale benefits are realized</li>
              <li>Capital expenditure efficiency improves, reducing to 200% of EBITDA by 2026</li>
              <li>Net Debt/EBITDA improves to ~2.5-3.0x by year-end 2026</li>
              <li>Credit metrics potentially improving to BB-/Ba3 territory by 2026</li>
            </ul>
            
            <h4>Downside Case (15% Probability)</h4>
            <ul>
              <li>Revenue growth slows significantly due to loss/reduction of a key customer or competitive pressures</li>
              <li>EBITDA margins compress to <50% due to pricing pressure and underutilization</li>
              <li>Capital markets access becomes constrained, limiting growth investment</li>
              <li>Technological disruption accelerates depreciation of existing infrastructure</li>
              <li>Net Debt/EBITDA deteriorates to >7.0x</li>
              <li>Credit metrics potentially declining to CCC+/Caa1 territory, with increased refinancing risk</li>
            </ul>
            
            <h3>Covenant Analysis</h3>
            <p>${company}'s debt agreements include several financial covenants:</p>
            <ul>
              <li><b>Maximum Total Leverage Ratio:</b> 7.5x, stepping down to 6.5x in 2026 (current: 6.9x)</li>
              <li><b>Minimum Interest Coverage Ratio:</b> 2.5x (current: 3.2x)</li>
              <li><b>Minimum Liquidity:</b> $750 million (current: $2.2 billion including restricted cash)</li>
            </ul>
            <p>Based on our analysis, ${company} currently maintains adequate headroom on all covenants, though the leverage covenant becomes increasingly constraining under our downside scenario. We estimate covenant breach could occur in the downside scenario by Q1 2026 without remedial action.</p>
          </section>
        </div>
      </main>
    </div>
    `;
}

// ... rest of the code remains the same ...

/**
 * Sets up charts in the report using Chart.js
 */
function setupCharts() {
    console.log("[AgenticApp] Setting up charts");
    
    try {
        // Revenue chart
        const revenueCtx = document.getElementById('revenue-chart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['2022', '2023', '2024'],
                    datasets: [{
                        label: 'Revenue ($M)',
                        data: [15.8, 228.9, 1920],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Revenue ($ millions)'
                            }
                        }
                    }
                }
            });
            
            console.log("[AgenticApp] Revenue chart created");
        } else {
            console.error("[AgenticApp] Revenue chart canvas not found");
        }
        
        // Customer concentration chart
        const customerCtx = document.getElementById('customer-chart');
        if (customerCtx) {
            new Chart(customerCtx, {
                type: 'pie',
                data: {
                    labels: ['Microsoft', 'OpenAI', 'Other Customers'],
                    datasets: [{
                        data: [62, 15, 23],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(255, 206, 86, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        title: {
                            display: true,
                            text: 'Customer Concentration (%)'
                        }
                    }
                }
            });
            
            console.log("[AgenticApp] Customer concentration chart created");
        } else {
            console.error("[AgenticApp] Customer chart canvas not found");
        }
        
        // Debt maturity chart
        const debtCtx = document.getElementById('debt-chart');
        if (debtCtx) {
            new Chart(debtCtx, {
                type: 'bar',
                data: {
                    labels: ['2025', '2026', '2027', '2028', '2029+'],
                    datasets: [{
                        label: 'Debt Maturities ($M)',
                        data: [500, 1200, 2000, 3300, 1000],
                        backgroundColor: 'rgba(153, 102, 255, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount ($ millions)'
                            }
                        }
                    }
                }
            });
            
            console.log("[AgenticApp] Debt maturity chart created");
        } else {
            console.error("[AgenticApp] Debt chart canvas not found");
        }
        
        console.log("[AgenticApp] All charts setup complete");
    } catch (error) {
        console.error('[AgenticApp] Error setting up charts:', error);
    }
}

// ... rest of the code remains the same ...

/**
 * Initialize the charts used in the credit report
 * This function sets up all the Chart.js charts with proper configuration
 */
function initializeCharts() {
    console.log('[AgenticApp] Setting up charts');
    
    try {
        // Revenue & Growth chart
        const revenueCtx = document.getElementById('revenue-chart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Revenue ($ millions)',
                        data: [42.5, 44.8, 50.2, 58.7, 67.3],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        fill: true
                    }, {
                        label: 'Growth (%)',
                        data: [null, 5.4, 12.1, 16.9, 14.7],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Revenue ($ millions)'
                            }
                        },
                        y1: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Growth (%)'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
            console.log('[AgenticApp] Revenue chart initialized');
        }
        
        // Profitability chart
        const profitabilityCtx = document.getElementById('profitability-chart');
        if (profitabilityCtx) {
            new Chart(profitabilityCtx, {
                type: 'bar',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'EBITDA Margin (%)',
                        data: [14.2, 13.8, 15.3, 16.7, 18.2],
                        backgroundColor: 'rgba(155, 89, 182, 0.7)'
                    }, {
                        label: 'Net Profit Margin (%)',
                        data: [8.3, 7.9, 9.4, 10.8, 12.5],
                        backgroundColor: 'rgba(241, 196, 15, 0.7)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Margin (%)'
                            }
                        }
                    }
                }
            });
            console.log('[AgenticApp] Profitability chart initialized');
        }
        
        // Debt Metrics chart
        const debtMetricsCtx = document.getElementById('debt-metrics-chart');
        if (debtMetricsCtx) {
            new Chart(debtMetricsCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Debt/EBITDA',
                        data: [3.2, 3.6, 3.4, 2.9, 2.5],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 2,
                        fill: true
                    }, {
                        label: 'Interest Coverage',
                        data: [3.8, 3.5, 3.9, 4.5, 5.2],
                        borderColor: '#1abc9c',
                        backgroundColor: 'rgba(26, 188, 156, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Debt/EBITDA (x)'
                            }
                        },
                        y1: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Interest Coverage (x)'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
            console.log('[AgenticApp] Debt metrics chart initialized');
        }
        
        // Industry Comparison chart
        const industryComparisonCtx = document.getElementById('industry-comparison-chart');
        if (industryComparisonCtx) {
            new Chart(industryComparisonCtx, {
                type: 'radar',
                data: {
                    labels: ['Revenue Growth', 'EBITDA Margin', 'Net Profit Margin', 'Debt/EBITDA', 'Interest Coverage', 'Liquidity Ratio'],
                    datasets: [{
                        label: 'Company',
                        data: [85, 78, 82, 65, 75, 80],
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                    }, {
                        label: 'Industry Average',
                        data: [70, 65, 60, 55, 65, 70],
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });
            console.log('[AgenticApp] Industry comparison chart initialized');
        }
        
        // Credit Risk chart
        const riskRadarCtx = document.getElementById('risk-radar-chart');
        if (riskRadarCtx) {
            new Chart(riskRadarCtx, {
                type: 'radar',
                data: {
                    labels: ['Financial Risk', 'Industry Risk', 'Market Position', 'Management Quality', 'Operational Efficiency', 'Regulatory Risk'],
                    datasets: [{
                        label: 'Risk Score (lower is better)',
                        data: [25, 35, 20, 15, 30, 40],
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        pointBackgroundColor: 'rgba(231, 76, 60, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(231, 76, 60, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                reverse: true
                            }
                        }
                    }
                }
            });
            console.log('[AgenticApp] Risk radar chart initialized');
        }
    } catch (error) {
        console.error('[AgenticApp] Error setting up charts:', error);
    }
}

// ... rest of the code remains the same ...

/**
 * Shows a specific application step and hides all others
 * @param {string} stepId - The ID of the step to show (e.g., 'step0', 'step2')
 */
function showAppStep(stepId) {
    console.log(`[AgenticApp] Showing step: ${stepId}`);
    
    try {
        // Get all app sections
        const sections = document.querySelectorAll('.app-section');
        if (!sections || sections.length === 0) {
            console.error('[AgenticApp] No app sections found');
            return;
        }
        
        console.log(`[AgenticApp] Found ${sections.length} app sections`);
        
        // Log all sections for debugging
        console.log('[AgenticApp] Available sections:');
        sections.forEach(section => {
            console.log(`  - Section ID: ${section.id}, Classes: ${section.className}`);
        });
        
        console.log(`[AgenticApp] Found ${sections.length} app sections`);
        
        // Update debug info
        updateDebugStatus(`Showing ${stepId}`);
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            console.log(`[AgenticApp] Hiding section: ${section.id}`);
        });
        
        // Show the target section
        const targetSection = document.getElementById(stepId);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`[AgenticApp] Section ${stepId} activated`);
            
            // Update the active tab in the sidebar
            updateActiveSidebarTab(stepId);
        } else {
            console.error(`[AgenticApp] Target section with ID ${stepId} not found`);
            // Fall back to step0 if the target doesn't exist
            const defaultSection = document.getElementById('step0');
            if (defaultSection) {
                defaultSection.classList.add('active');
                console.log(`[AgenticApp] Falling back to step0`);
                updateActiveSidebarTab('step0');
            }
        }
    } catch (error) {
        console.error('[AgenticApp] Error showing app step:', error);
    }
}

// ... rest of the code remains the same ...

/**
 * Shows example requirements in the user requirements textarea
 * This gives users an idea of what they might ask the agent to build
 */
function showExampleRequirements() {
    console.log("[AgenticApp] showExampleRequirements function called");
    
    const textarea = document.getElementById('user-requirements');
    if (!textarea) {
        console.error('[AgenticApp] User requirements textarea not found');
        alert('Error: Could not find the requirements textarea. Please refresh the page.');
        return;
    }
    
    console.log("[AgenticApp] Found textarea element, setting content");
    
    const exampleRequirements = 
        "You are a specialized AI agent for credit analysis. Create a comprehensive credit assessment solution that can thoroughly evaluate corporate financial health and creditworthiness.\n\n" +
        "REQUIREMENTS:\n\n" +
        "1. ASSESSMENT COMPONENTS:\n" +
        "   - Executive summary with clear credit rating recommendation\n" +
        "   - Business profile and competitive position analysis\n" +
        "   - Detailed financial analysis (5 key metrics minimum)\n" +
        "   - Capital structure and debt serviceability evaluation\n" +
        "   - Industry-specific contextualization and benchmarking\n" +
        "   - Risk factors identification (both present and emerging risks)\n" +
        "   - Forward-looking scenarios (base case, upside, downside)\n\n" +
        
        "2. FINANCIAL METRICS TO INCLUDE:\n" +
        "   - Leverage ratios (Debt/EBITDA, Net Debt/EBITDA)\n" +
        "   - Coverage ratios (EBITDA/Interest, FCF/Debt Service)\n" +
        "   - Profitability metrics (EBITDA margin, Net Income margin)\n" +
        "   - Liquidity indicators (Current ratio, Cash/Short-term debt)\n" +
        "   - Growth trends (Revenue growth, EBITDA growth)\n" +
        "   - Cash flow analysis (FCF conversion, DCF valuation)\n\n" +
        
        "3. TECHNICAL SPECIFICATIONS:\n" +
        "   - Create interactive visualizations for all key metrics\n" +
        "   - Implement a shadow rating system based on S&P/Moody's methodologies\n" +
        "   - Design a responsive UI with hierarchical information display\n" +
        "   - Build a printable PDF export function\n" +
        "   - Include tooltips to explain financial terminology\n\n" +
        
        "4. OUTPUT FORMATTING:\n" +
        "   - Clean, professional design suitable for C-suite presentation\n" +
        "   - Color-coded risk indicators (green, yellow, red)\n" +
        "   - Executive summary limited to one page equivalent\n" +
        "   - Navigation sidebar for easy section access\n" +
        "   - Data tables with sortable columns\n\n" +
        
        "The solution should be adaptable to companies across multiple sectors, with special emphasis on technology, manufacturing, and financial services. The final report must be understandable to both financial experts and executives without specialized training.";
    
    try {
        textarea.value = exampleRequirements;
        console.log("[AgenticApp] Successfully set example requirements");
        logStatus('Example requirements loaded');
    } catch (error) {
        console.error('[AgenticApp] Error setting example requirements:', error);
        alert('Error setting example requirements: ' + error.message);
    }
}

/**
 * Handles the "Continue" button click from the requirements step
 * Transitions directly to the build step
 */
function proceedToInstructions() {
    console.log("[AgenticApp] proceedToInstructions called");
    try {
        // Go directly to the build step instead of instructions
        showAppStep('step2');
        console.log("[AgenticApp] Successfully navigated to build step");
        logStatus('Navigated to build step');
    } catch (error) {
        console.error('[AgenticApp] Error proceeding to build step:', error);
        alert('Error navigating to the build step: ' + error.message);
    }
}

/**
 * Updates the active tab in the sidebar based on current app step
 * @param {string} currentStepId - The ID of the currently active step
 */
function updateActiveSidebarTab(currentStepId) {
    console.log(`[AgenticApp] Updating active sidebar tab for step: ${currentStepId}`);
    
    try {
        // Get sidebar link elements
        const sidebarLinks = document.querySelectorAll('.workflow-steps li');
        if (!sidebarLinks || sidebarLinks.length === 0) {
            console.error('[AgenticApp] No sidebar links found');
            return;
        }
        
        console.log(`[AgenticApp] Found ${sidebarLinks.length} sidebar links`);
        
        // Remove active class from all links
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Map step IDs to nav IDs
        const navMap = {
            'step0': 'nav-step0',
            'step1': 'nav-step0', // Agent Instructions step is shown as part of Define Requirements
            'step2': 'nav-step1', // Build step is nav-step1
            'step3': 'nav-step2', // Generate step is nav-step2
            'step4': 'nav-step2'  // Results are part of Generate Assessment
        };
        
        // Get the corresponding nav ID
        const navId = navMap[currentStepId] || null;
        
        if (navId) {
            // Find and activate the corresponding sidebar tab
            const activeTab = document.getElementById(navId);
            if (activeTab) {
                activeTab.classList.add('active');
                console.log(`[AgenticApp] Activated sidebar tab: ${navId}`);
            } else {
                console.error(`[AgenticApp] Sidebar tab with ID ${navId} not found`);
            }
        } else {
            console.error(`[AgenticApp] No mapping for step ID: ${currentStepId}`);
        }
    } catch (error) {
        console.error('[AgenticApp] Error updating sidebar tab:', error);
    }
}

/**
 * Sets up collapsible sections (for the credit report)
 */
function setupCollapsibleSections() {
    console.log("[AgenticApp] Setting up collapsible sections");
    
    try {
        const collapsibles = document.querySelectorAll('.collapsible h2');
        if (!collapsibles || collapsibles.length === 0) {
            console.log('[AgenticApp] No collapsible sections found yet');
            return;
        }
        
        console.log(`[AgenticApp] Found ${collapsibles.length} collapsible sections`);
        
        collapsibles.forEach(header => {
            header.addEventListener('click', function() {
                const parent = this.parentElement;
                if (parent) {
                    parent.classList.toggle('open');
                    console.log(`[AgenticApp] Toggled section: ${this.textContent}`);
                }
            });
        });
    } catch (error) {
        console.error('[AgenticApp] Error setting up collapsible sections:', error);
    }
}

/**
 * Sets up the app flow navigation (sidebar links)
 */
function setupAppNavigation() {
    console.log("[AgenticApp] Setting up app navigation");
    
    try {
        const navLinks = document.querySelectorAll('.workflow-steps li');
        if (!navLinks || navLinks.length === 0) {
            console.error('[AgenticApp] No navigation links found');
            return;
        }
        
        console.log(`[AgenticApp] Found ${navLinks.length} navigation links`);
        
        // Map nav IDs to step IDs
        const stepMap = {
            'nav-step0': 'step0', // Define Requirements
            'nav-step1': 'step2', // Build Solution
            'nav-step2': 'step3'  // Generate Assessment
        };
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navId = this.id;
                const targetStep = stepMap[navId];
                
                if (targetStep) {
                    showAppStep(targetStep);
                    console.log(`[AgenticApp] Navigation to ${targetStep} from ${navId}`);
                } else {
                    console.error(`[AgenticApp] No step mapping for nav ID: ${navId}`);
                }
            });
        });
    } catch (error) {
        console.error('[AgenticApp] Error setting up app navigation:', error);
    }
}

/**
 * Loads the agent prompt instructions from markdown file and displays them
 * This demonstrates the actual prompt used to instruct the AI agent
 */
function loadAgentPrompt() {
    console.log("[AgenticApp] Loading agent prompt");
    
    try {
        // In a real application, this would fetch the prompt from a file
        // For now, we'll just simulate that it's loaded
        updateDebugStatus("Agent prompt loaded");
        logStatus("Agent prompt instructions loaded");
    } catch (error) {
        console.error('[AgenticApp] Error loading agent prompt:', error);
    }
}

/**
 * Updates the debug status display (only shown in debug mode)
 * @param {string} message - Status message to display
 */
function updateDebugStatus(message) {
    const statusElement = document.getElementById('debug-status');
    if (statusElement) {
        statusElement.textContent = message;
    }
    
    const sectionsElement = document.getElementById('debug-sections');
    if (sectionsElement) {
        const sections = document.querySelectorAll('.app-section').length;
        sectionsElement.textContent = sections;
    }
    
    const activeStepElement = document.getElementById('debug-active-step');
    if (activeStepElement) {
        const activeStep = document.querySelector('.app-section.active');
        activeStepElement.textContent = activeStep ? activeStep.id : 'None';
    }
    
    // Show debug panel if in debug mode
    if (DEBUG_MODE) {
        const debugPanel = document.getElementById('debug-panel');
        if (debugPanel) {
            debugPanel.classList.add('visible');
        }
    }
}

// Main entry point: set up event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("[AgenticApp] DOM fully loaded, initializing app");
    initializeApp();
    
    // Don't add duplicate event listeners since we're using onclick in HTML
    console.log("[AgenticApp] Using HTML onclick attributes instead of duplicate JS event listeners");
});

/**
 * Main initialization function - sets up the application when DOM is loaded
 */
function initializeApp() {
    // Enable debug mode if set
    if (DEBUG_MODE) {
        document.body.classList.add('debug');
        console.log("[AgenticApp] Debug mode enabled");
    }
    
    // Log that we're initializing, but don't attach duplicate event handlers
    // since we're using onclick attributes in HTML
    console.log("[AgenticApp] Initializing app without duplicate event handlers");
    
    // Load the agent prompt for reference (though we won't show it directly)
    loadAgentPrompt();
    
    // Set up collapsible sections (only for report viewing)
    setupCollapsibleSections();
    
    // Set up app flow navigation
    setupAppNavigation();
    
    // Initialize debug info
    updateDebugStatus("App initialized");
    
    console.log("[AgenticApp] Initialization complete");
}

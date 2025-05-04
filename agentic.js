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
    if (!logArea) {
        console.error('[AgenticApp] Log area not found in DOM');
        return;
    }
    
    const p = document.createElement('p');
    p.textContent = message;
    p.className = isError ? 'error-log' : '';
    logArea.appendChild(p);
    logArea.scrollTop = logArea.scrollHeight;
    
    // Also log to console for debugging
    isError 
        ? console.error(`[AgenticApp] ${message}`) 
        : console.log(`[AgenticApp] ${message}`);
    
    // Update debug status if in debug mode
    updateDebugStatus(message);
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
 * Uses setTimeout chains with varied timing for a realistic feel
 */
function startAgenticBuild() {
    const buildBtn = document.getElementById('start-agentic-build');
    buildBtn.disabled = true;
    logStatus('Initializing agentic credit analysis workflow...');
    
    // Define the build steps and their base timing
    const buildSteps = [
        { message: 'Step 1: Loading financial analysis framework...', timing: 2200 },
        { message: 'Step 2: Importing credit risk assessment models...', timing: 1600 },
        { message: 'Step 3: Configuring data visualization components...', timing: 1700 },
        { message: 'Step 4: Setting up industry benchmarking system...', timing: 2000 },
        { message: 'Step 5: Initializing company data API connections...', timing: 1500 },
        { message: 'Step 6: Optimizing report generation templates...', timing: 1800 }
    ];
    
    // Execute the build steps in sequence with varied timing
    executeStepsSequentially(buildSteps, 0, () => {
        // Final step - complete the build process
        logStatus('Agentic credit analysis system successfully built and ready for use!');
        
        // Make the input section visible
        const inputSection = document.getElementById('company-input-section');
        if (inputSection) {
            inputSection.style.display = 'block';
            console.log("[AgenticApp] Company input section displayed");
        } else {
            console.error("[AgenticApp] Could not find company input section");
        }
        
        // Hide the build button
        buildBtn.style.display = 'none';
        
        // Switch to step 2 in the app sidebar with a slight delay to ensure DOM updates
        setTimeout(() => {
            showAppStep('step2');
            console.log("[AgenticApp] Navigated to Step 2");
            
            // Flash the input box to draw attention
            const inputBox = document.getElementById('company-name-input');
            if (inputBox) {
                inputBox.style.transition = 'background-color 0.5s';
                inputBox.style.backgroundColor = '#ffffcc';
                setTimeout(() => {
                    inputBox.style.backgroundColor = '';
                }, 1000);
            }
        }, 300);
    });
}

/**
 * Helper function to execute an array of steps sequentially with varied timing
 * @param {Array} steps - Array of step objects with message and timing properties
 * @param {number} currentIndex - The current step index
 * @param {Function} onComplete - Callback function to run after all steps are complete
 */
function executeStepsSequentially(steps, currentIndex, onComplete) {
    // Base case: if we've processed all steps, run the onComplete callback
    if (currentIndex >= steps.length) {
        onComplete();
        return;
    }
    
    // Get the current step data
    const step = steps[currentIndex];
    
    // Execute the current step after initial delay
    setTimeout(() => {
        logStatus(step.message);
        
        // Execute the next step
        executeStepsSequentially(steps, currentIndex + 1, onComplete);
    }, currentIndex === 0 ? 1800 : getRandomTiming(step.timing));

}

// =======================================================
// SECTION 3: REPORT GENERATION
// =======================================================

/**
 * Generates a credit assessment report for the entered company name
 * Simulates an AI analysis process with multiple steps and variable timing
 */
function generateAssessment() {
    // Get user input and validate
    const companyInput = document.getElementById('company-name-input');
    const company = companyInput.value.trim();
    const reportArea = document.getElementById('report-area');
    
    // Clear any previous report
    reportArea.innerHTML = '';
    
    // Validate input
    if (!company) {
        logStatus('Please enter a company name.', true);
        return;
    }
    
    // Clear previous logs to keep things clean for new generation
    document.getElementById('agentic-log').innerHTML = '';
    
    // Define analysis steps with messages and timing
    const analysisSteps = [
        { message: `Initiating credit assessment for "${company}"...`, timing: 1500 },
        { message: `Accessing financial databases for ${company}...`, timing: 1800 },
        { message: `Retrieving latest quarterly statements and annual reports...`, timing: 1600 },
        { message: `Analyzing ${company}'s balance sheet structure...`, timing: 1500 },
        { message: `Evaluating ${company}'s debt-to-equity ratio and leverage...`, timing: 1200 },
        { message: `Assessing industry position and competitive landscape...`, timing: 1300 },
        { message: `Calculating key financial metrics and ratios...`, timing: 1100 },
        { message: `Reviewing ${company}'s cash flow stability...`, timing: 1400 },
        { message: `Evaluating management effectiveness and corporate governance...`, timing: 1200 },
        { message: `Analyzing risk factors and credit vulnerabilities...`, timing: 1300 },
        { message: `Determining appropriate credit rating boundary...`, timing: 1500 },
        { message: `Generating comprehensive credit assessment report...`, timing: 1500 }
    ];
    
    // Start with the first step immediately
    logStatus(analysisSteps[0].message);
    
    // Execute remaining analysis steps sequentially with varied timing
    executeAnalysisSteps(analysisSteps, 1, company);
}

/**
 * Helper function for executing analysis steps sequentially
 * @param {Array} steps - Array of analysis step objects
 * @param {number} currentIndex - Current step index
 * @param {string} company - Company name for the report
 */
function executeAnalysisSteps(steps, currentIndex, company) {
    // Base case: if we've processed all steps, generate the report
    if (currentIndex >= steps.length) {
        injectCompanyReport(company);
        return;
    }
    
    // Get the current step
    const step = steps[currentIndex];
    
    // Execute the current step after randomized delay
    setTimeout(() => {
        logStatus(step.message);
        
        // Move to the next step
        executeAnalysisSteps(steps, currentIndex + 1, company);
    }, getRandomTiming(step.timing));
}

/**
 * Injects the company report template into the report area
 * @param {string} company - Company name to use in the report
 */
function injectCompanyReport(company) {
    const reportArea = document.getElementById('report-area');
    
    // Load the report template with the company name
    const template = generateReportTemplate(company);
    
    // Insert the template into the DOM
    reportArea.innerHTML = template;
    logStatus(`Credit assessment for "${company}" successfully generated.`);
    
    // Set up collapsible sections after DOM content is loaded
    setTimeout(() => {
        setupCollapsibleSections();
    }, 100);
}

// =======================================================
// SECTION 4: REPORT TEMPLATES
// =======================================================

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
              <canvas id="revenueChart" width="400" height="200" aria-label="Revenue Growth Chart" role="img"></canvas>
            </div>
          </section>
          
          <section id="business-profile" class="collapsible">
            <h2>Business and Competitive Profile</h2>
            <p><b>Company Background:</b> ${company} is a provider of specialized GPU cloud infrastructure focusing on AI and high-performance computing workloads. Founded in 2017, the company has rapidly established itself as a key player in the AI infrastructure space.</p>
            <p><b>Business Model:</b> The company operates a pure-play AI infrastructure service model, providing specialized GPU-accelerated cloud services to AI companies, research institutions, and enterprises developing large language models and other AI applications.</p>
            <p><b>Revenue Model:</b> Revenue is generated through multi-year contracts for dedicated GPU compute clusters, with customers paying for reserved computing capacity regardless of usage levels.</p>
            
            <div class="chart-container">
              <canvas id="customerChart" width="400" height="200" aria-label="Customer Concentration Chart" role="img"></canvas>
            </div>
            
            <p><b>Competitive Positioning:</b> ${company} differentiates itself through:</p>
            <ul>
              <li><b>Speed of Deployment:</b> Ability to rapidly deploy large GPU clusters</li>
              <li><b>Specialization:</b> Purpose-built for AI workloads rather than general cloud computing</li>
              <li><b>Optimization:</b> Custom networking and software stack optimized for AI model training</li>
              <li><b>Relationships:</b> Strategic partnership with NVIDIA providing early access to new hardware</li>
            </ul>
            
            <p><b>Market Position:</b> Within the AI infrastructure market, ${company} has carved out a significant niche as the largest pure-play provider, though it faces competition from larger general cloud providers (AWS, Azure, GCP) who are expanding their AI offerings.</p>
          </section>
          
          <section id="financial-analysis" class="collapsible">
            <h2>Financial Analysis</h2>
            <p><b>Growth Trajectory:</b> ${company} has demonstrated exceptional growth, with revenue increasing from $15.8M in 2022 to $229M in 2023, and then to $1.92B in 2024 - representing a compound annual growth rate (CAGR) of 1,064% over two years.</p>
            
            <div class="table-container">
              <table class="financial-table">
                <caption>Key Financial Ratios</caption>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>2022</th>
                    <th>2023</th>
                    <th>2024</th>
                    <th>Industry Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Gross Margin</td><td>33.2%</td><td>40.6%</td><td>65.3%</td><td>55-60%</td></tr>
                  <tr><td>EBITDA Margin</td><td>-63.3%</td><td>26.2%</td><td>60.0%</td><td>30-35%</td></tr>
                  <tr><td>Net Profit Margin</td><td>-196.2%</td><td>-259.5%</td><td>-44.9%</td><td>15-20%</td></tr>
                  <tr><td>Debt/EBITDA</td><td>N/A</td><td>50.0x</td><td>6.9x</td><td>2-3x</td></tr>
                  <tr><td>EBITDA/Interest</td><td>N/A</td><td>0.6x</td><td>3.2x</td><td>6-8x</td></tr>
                </tbody>
              </table>
            </div>
            
            <p><b>Profitability Assessment:</b> While ${company} has seen rapidly improving margins (EBITDA margin of 60% in 2024), it remains unprofitable on a net income basis due to heavy depreciation charges and interest expenses. The negative free cash flow reflects massive capital expenditures to fuel growth.</p>
            
            <p><b>Balance Sheet Structure:</b> The balance sheet is highly leveraged, with approximately $8 billion in debt against $1.4 billion in cash as of end-2024. This debt has primarily financed the purchase of GPU clusters and data center construction.</p>
            
            <p><b>Cash Flow Dynamics:</b> Operating cash flow was strong at $2.75 billion in 2024, primarily due to large customer prepayments. However, free cash flow remains deeply negative (-$5.9 billion) due to massive capital expenditures on GPU infrastructure.</p>
          </section>
          
          <section id="debt-structure" class="collapsible">
            <h2>Debt Structure and Maturity Profile</h2>
            <p><b>Debt Overview:</b> ${company}'s debt structure consists of approximately $8 billion in total debt as of December 2024. The debt includes a mix of term loans, equipment financing, and secured facilities.</p>
            
            <div class="chart-container">
              <canvas id="debtMaturityChart" width="400" height="200" aria-label="Debt Maturity Chart" role="img"></canvas>
            </div>
            
            <p><b>Key Debt Facilities:</b></p>
            <ul>
              <li><b>Term Loan Facility:</b> $3.5 billion facility secured against GPU assets, maturing 2028-2029</li>
              <li><b>Equipment Financing:</b> $2.8 billion in various equipment financing arrangements for NVIDIA H100 GPUs</li>
              <li><b>Revolving Credit Facility:</b> $700 million facility for general corporate purposes</li>
              <li><b>Other Secured Debt:</b> $1.0 billion in data center-secured financing</li>
            </ul>
            
            <p><b>Collateral Profile:</b> Most debt is secured by specific assets:</p>
            <ul>
              <li>GPU clusters (primarily NVIDIA H100s) form the core collateral for equipment financing</li>
              <li>Data center facilities and associated infrastructure secure real estate loans</li>
              <li>General corporate assets back the revolving facility</li>
            </ul>
            
            <p><b>Covenant Structure:</b> ${company}'s debt facilities include standard covenants around:</p>
            <ul>
              <li>Maximum leverage ratios (Net Debt/EBITDA < 8.0x)</li>
              <li>Minimum liquidity requirements ($500 million)</li>
              <li>Restrictions on additional indebtedness and liens</li>
              <li>Limitation on dividend payments while leverage exceeds certain thresholds</li>
            </ul>
            
            <p><b>Refinancing Needs:</b> Given the high capital intensity of the business, ${company} will likely require continued access to capital markets for refinancing and expansion. Near-term maturities appear manageable, but substantial refinancing needs emerge in 2027-2029.</p>
          </section>
          
          <section id="industry" class="collapsible">
            <h2>Industry and Macroeconomic Environment</h2>
            <p><b>Industry Overview:</b> ${company} operates in the rapidly growing AI infrastructure market, which is experiencing extraordinary growth due to the expansion of generative AI applications, large language models, and enterprise AI adoption.</p>
            
            <p><b>Market Size and Growth:</b> The specialized AI infrastructure market is estimated at approximately $30 billion in 2024 and projected to grow at a 40-50% CAGR through 2028. This growth is driven by increasing investments in AI capabilities across technology companies, enterprises, and research institutions.</p>
            
            <p><b>Critical Success Factors:</b></p>
            <ul>
              <li><b>Access to GPU Supply:</b> Securing allocation of NVIDIA H100s and future chips amid chronic shortages</li>
              <li><b>Capital Availability:</b> Ability to raise substantial capital to fund infrastructure expansion</li>
              <li><b>Technical Expertise:</b> Specialized knowledge in optimizing AI infrastructure performance</li>
              <li><b>Scale:</b> Achieving sufficient scale to negotiate favorable terms with suppliers</li>
            </ul>
            
            <p><b>Competitive Landscape:</b> The market features several types of competitors:</p>
            <ul>
              <li><b>Hyperscalers:</b> AWS, Microsoft Azure, and Google Cloud are expanding AI-specialized offerings</li>
              <li><b>Pure-Play AI Infrastructure:</b> ${company}, Lambda Labs, and similar specialized providers</li>
              <li><b>Self-Built Infrastructure:</b> Large AI companies (OpenAI, Anthropic) partially building their own infrastructure</li>
            </ul>
            
            <p><b>Macroeconomic Factors:</b> Several macroeconomic factors impact ${company}'s prospects:</p>
            <ul>
              <li><b>Interest Rate Environment:</b> Higher rates increase debt service costs on substantial debt load</li>
              <li><b>Technology Investment Climate:</b> Sustained investor interest in AI fuels customer growth</li>
              <li><b>GPU Supply Chain:</b> Global semiconductor capacity constraints affect growth potential</li>
              <li><b>Data Center Power Availability:</b> Power constraints in key markets limit expansion options</li>
            </ul>
          </section>
          
          <section id="risks" class="collapsible">
            <h2>Risks and Credit Scenarios</h2>
            <p><b>Key Credit Risks:</b></p>
            <ul>
              <li><b>Customer Concentration:</b> Extreme concentration with top two customers representing >70% of revenue</li>
              <li><b>Technology Obsolescence:</b> Risk of current GPU investments becoming less competitive as technology advances</li>
              <li><b>Capital Intensity:</b> Ongoing need for substantial capital to maintain competitive position</li>
              <li><b>Refinancing Risk:</b> Potential challenges refinancing debt given speculative-grade profile</li>
              <li><b>Competitive Pressure:</b> Intensifying competition from well-capitalized hyperscalers</li>
            </ul>
            
            <p><b>Downside Scenario:</b> In a pessimistic scenario, ${company} could face:</p>
            <ul>
              <li>Loss of a major customer to competitors or internal infrastructure</li>
              <li>Slower than expected AI adoption limiting growth trajectory</li>
              <li>Tightening capital markets restricting refinancing options</li>
              <li>Reduced EBITDA margins due to competitive pricing pressure</li>
            </ul>
            <p>Under this scenario, leverage could increase to >10x EBITDA, potentially triggering covenant breaches and creating severe liquidity pressure.</p>
            
            <p><b>Base Case Scenario:</b> Our base case assumes:</p>
            <ul>
              <li>Continued strong revenue growth (50-60% in 2025, moderating thereafter)</li>
              <li>Gradually improving customer diversification</li>
              <li>Stable EBITDA margins of 55-60%</li>
              <li>Reduction in capital expenditure intensity as a percentage of revenue</li>
            </ul>
            <p>This would lead to gradual deleveraging to 4-5x EBITDA by 2026-2027, improving but still elevated credit metrics.</p>
            
            <p><b>Upside Scenario:</b> In an optimistic scenario:</p>
            <ul>
              <li>Faster customer diversification reduces concentration risk</li>
              <li>Economies of scale drive EBITDA margins above 65%</li>
              <li>Capital expenditure efficiency improves, reducing growth capital needs</li>
              <li>AI adoption accelerates beyond current projections</li>
            </ul>
            <p>This could drive deleveraging to 3-4x EBITDA by 2026, potentially positioning ${company} for an investment-grade trajectory longer-term.</p>
            
            <p><b>Credit Monitoring Triggers:</b> Key metrics to monitor include:</p>
            <ul>
              <li>Customer renewal rates and diversification progress</li>
              <li>Free cash flow trajectory and capital expenditure efficiency</li>
              <li>Debt refinancing success and terms</li>
              <li>GPU utilization rates and asset turnover</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Initialize revenue chart
        try {
          // Revenue chart
          var ctx = document.getElementById('revenueChart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['2022', '2023', '2024'],
              datasets: [{
                label: 'Revenue ($M)',
                data: [15.8, 228.9, 1920],
                backgroundColor: ['#60a5fa','#60a5fa','#60a5fa'],
                borderRadius: 7,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
                borderSkipped: false
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top', labels: { boxWidth: 18 } },
                tooltip: { enabled: true }
              },
              animation: { duration: 900, easing: 'easeOutQuart' },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: '$ Millions', font: { size: 13, weight: 'bold' } },
                  grid: { color: '#e5e7eb' }
                },
                x: {
                  grid: { display: false }
                }
              }
            }
          });
          
          // Customer concentration chart
          if (document.getElementById('customerChart')) {
            var custCtx = document.getElementById('customerChart').getContext('2d');
            new Chart(custCtx, {
              type: 'pie',
              data: {
                labels: ['Microsoft', 'Meta', 'OpenAI', 'Other Customers'],
                datasets: [{
                  data: [62, 15, 8, 15],
                  backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#d1d5db'],
                  borderWidth: 2,
                  borderColor: '#ffffff'
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  title: {
                    display: true,
                    text: 'Customer Concentration (% of Revenue)',
                    font: { size: 14 }
                  }
                }
              }
            });
          }
          
          // Debt maturity chart
          if (document.getElementById('debtMaturityChart')) {
            var debtCtx = document.getElementById('debtMaturityChart').getContext('2d');
            new Chart(debtCtx, {
              type: 'bar',
              data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030+'],
                datasets: [{
                  label: 'Debt Maturities ($B)',
                  data: [0.5, 0.8, 1.5, 2.7, 2.2, 0.3],
                  backgroundColor: '#ef4444',
                  borderRadius: 7,
                  barPercentage: 0.6
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Debt Maturity Profile',
                    font: { size: 14 }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: '$ Billions' }
                  }
                }
              }
            });
          }
          
        } catch (err) {
          console.error('[AgenticApp] Error initializing charts:', err);
        }
      });
    </script>
    `;
}

// =======================================================
// SECTION 5: UI INTERACTION & DOM MANAGEMENT
// =======================================================

/**
 * Sets up collapsible sections and navigation in the report
 * Handles section toggling and navigation between sections
 */
function setupCollapsibleSections() {
    console.log("[AgenticApp] Setting up collapsible sections...");
    
    try {
        // Get all sections and sidebar links
        const sections = document.querySelectorAll('.collapsible');
        const sidebarLinks = document.querySelectorAll('#sidebar a');
        
        if (sections.length === 0) {
            console.warn("[AgenticApp] No collapsible sections found in DOM");
        }
        
        if (sidebarLinks.length === 0) {
            console.warn("[AgenticApp] No sidebar links found in DOM");
        }
        
        // Set up collapsible behavior for section headings
        sections.forEach(section => {
            const heading = section.querySelector('h2');
            if (heading) {
                heading.addEventListener('click', () => {
                    console.log(`[AgenticApp] Toggling section: ${section.id}`);
                    section.classList.toggle('open');
                    
                    // Also update active state in sidebar
                    updateActiveSidebarLink(section.id);
                });
            }
        });
        
        // Set up navigation for sidebar links
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section ID from the href
                const targetId = this.getAttribute('href').substring(1);
                console.log(`[AgenticApp] Sidebar link clicked: ${targetId}`);
                
                // Find the target section
                const targetSection = document.getElementById(targetId);
                
                if (!targetSection) {
                    console.error(`[AgenticApp] Target section not found: ${targetId}`);
                    return;
                }
                
                // Update active sidebar link
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all sections
                sections.forEach(section => section.classList.remove('open'));
                
                // Show the target section
                targetSection.classList.add('open');
                
                // Scroll to the target section
                targetSection.scrollIntoView({behavior: 'smooth'});
                
                // Update debug info
                updateDebugStatus(`Showing section: ${targetId}`);
            });
        });
        
        // Log section and link counts 
        console.log(`[AgenticApp] Setup complete - Found ${sections.length} sections and ${sidebarLinks.length} sidebar links`);
        updateDebugStatus("Sections setup complete");
        
    } catch (error) {
        console.error("[AgenticApp] Error setting up collapsible sections:", error);
    }
}

/**
 * Updates the active link in the sidebar
 * @param {string} sectionId - ID of the currently active section
 */
function updateActiveSidebarLink(sectionId) {
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    
    sidebarLinks.forEach(link => {
        const linkTarget = link.getAttribute('href').substring(1);
        if (linkTarget === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// New functions to handle app workflow navigation
/**
 * Updates the active tab in the application sidebar
 * @param {string} activeStep - The ID of the active step (e.g., 'step1', 'step2')
 */
function updateActiveSidebarTab(activeStep) {
    const sidebarLinks = document.querySelectorAll('#app-sidebar a');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeStep}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Shows a specific application step section and hides others
 * @param {string} stepId - The ID of the step to show (without the # prefix)
 */
function showAppStep(stepId) {
    console.log(`[AgenticApp] Attempting to show step: ${stepId}`);
    
    const sections = document.querySelectorAll('#app-content section.collapsible');
    console.log(`[AgenticApp] Found ${sections.length} app sections`);
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('open');
        console.log(`[AgenticApp] Hiding section: ${section.id}`);
    });
    
    // Show the target section
    const targetSection = document.getElementById(stepId);
    if (targetSection) {
        targetSection.classList.add('open');
        console.log(`[AgenticApp] Showing section: ${stepId}`);
        
        // Ensure company input section is visible if we're in step2
        if (stepId === 'step2') {
            const inputSection = document.getElementById('company-input-section');
            if (inputSection) {
                inputSection.style.display = 'block';
                console.log("[AgenticApp] Ensuring company input section is visible");
            }
        }
    } else {
        console.error(`[AgenticApp] Step section not found: ${stepId}`);
    }
    
    // Update active tab in the sidebar
    updateActiveSidebarTab(stepId);
}

/**
 * Sets up the app workflow navigation
 */
function setupAppNavigation() {
    const appSidebarLinks = document.querySelectorAll('#app-sidebar a');
    const appSections = document.querySelectorAll('#app-content section.collapsible');
    
    if (appSidebarLinks.length === 0) {
        console.warn("[AgenticApp] No app sidebar links found");
        return;
    }
    
    // Add click handlers to app sidebar links
    appSidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extract target step ID from href
            const targetId = this.getAttribute('href').substring(1);
            console.log(`[AgenticApp] App sidebar link clicked: ${targetId}`);
            
            // Show the corresponding step
            showAppStep(targetId);
        });
    });
    
    console.log(`[AgenticApp] App navigation setup complete: ${appSidebarLinks.length} links, ${appSections.length} sections`);
}

// =======================================================
// SECTION 6: EVENT LISTENERS & INITIALIZATION
// =======================================================

/**
 * Main initialization function - sets up the application when DOM is loaded
 */
function initializeApp() {
    // Enable debug mode if set
    if (DEBUG_MODE) {
        document.body.classList.add('debug');
        console.log("[AgenticApp] Debug mode enabled");
    }
    
    // Get button elements
    const buildBtn = document.getElementById('start-agentic-build');
    const genBtn = document.getElementById('generate-assessment');
    
    // Attach event handlers if elements exist
    if (buildBtn) {
        buildBtn.addEventListener('click', startAgenticBuild);
        console.log("[AgenticApp] Build button event listener attached");
    } else {
        console.warn("[AgenticApp] Build button not found in DOM");
    }
    
    if (genBtn) {
        genBtn.addEventListener('click', generateAssessment);
        console.log("[AgenticApp] Generate assessment button event listener attached");
    } else {
        console.warn("[AgenticApp] Generate assessment button not found in DOM");
    }
    
    // Set up any existing collapsible sections (e.g., in the page HTML)
    setupCollapsibleSections();
    
    // Set up app flow navigation
    setupAppNavigation();
    
    // Initialize debug info
    updateDebugStatus("App initialized");
}

// Set up event listeners when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', initializeApp);

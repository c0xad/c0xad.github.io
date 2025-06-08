// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroStats = document.querySelectorAll('.stat-number');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');

// Technical Showcases Elements
const tabButtons = document.querySelectorAll('.tab-button');
const showcaseContents = document.querySelectorAll('.showcase-content');
const algoButtons = document.querySelectorAll('.algo-btn');
const algoVisualizations = document.querySelectorAll('.algo-visualization');

// Enhanced Live Code Editor
class LiveCodeEditor {
    constructor() {
        this.currentLanguage = 'python';
        this.codeExamples = {
            python: `# Economic Time Series Analysis
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA

# Generate sample economic data
np.random.seed(42)
dates = pd.date_range('2020-01-01', periods=100, freq='D')
gdp_growth = np.cumsum(np.random.normal(0.02, 0.1, 100))
data = pd.Series(gdp_growth, index=dates)

# Fit ARIMA model
model = ARIMA(data, order=(1,1,1))
fitted_model = model.fit()

# Generate forecast
forecast = fitted_model.forecast(steps=10)
print('Economic Forecast:', forecast)

# Calculate statistics
print(f'Mean Growth: {data.mean():.4f}')
print(f'Volatility: {data.std():.4f}')
print(f'Max Drawdown: {(data / data.cummax() - 1).min():.4f}')`,
            
            r: `# Financial Portfolio Analysis
library(quantmod)
library(PerformanceAnalytics)

# Generate sample portfolio returns
set.seed(42)
dates <- seq(as.Date("2020-01-01"), by="day", length.out=252)
stocks <- c("Tech", "Finance", "Energy", "Healthcare")

# Create random portfolio returns
portfolio_returns <- matrix(rnorm(252*4, 0.0002, 0.02), 
                           ncol=4, dimnames=list(NULL, stocks))
portfolio_returns <- as.data.frame(portfolio_returns)

# Calculate portfolio metrics
portfolio_mean <- colMeans(portfolio_returns)
portfolio_risk <- apply(portfolio_returns, 2, sd)
correlation_matrix <- cor(portfolio_returns)

print("Portfolio Statistics:")
print(paste("Expected Returns:", round(portfolio_mean * 252, 4)))
print(paste("Annual Volatility:", round(portfolio_risk * sqrt(252), 4)))
print("Correlation Matrix:")
print(round(correlation_matrix, 3))`,
            
            javascript: `// Financial Data Visualization
class FinancialAnalyzer {
    constructor(data) {
        this.data = data;
        this.returns = this.calculateReturns();
    }
    
    calculateReturns() {
        return this.data.map((price, i) => {
            if (i === 0) return 0;
            return (price - this.data[i-1]) / this.data[i-1];
        }).slice(1);
    }
    
    calculateSharpeRatio(riskFreeRate = 0.02) {
        const meanReturn = this.returns.reduce((a, b) => a + b) / this.returns.length;
        const volatility = Math.sqrt(
            this.returns.reduce((sum, ret) => 
                sum + Math.pow(ret - meanReturn, 2), 0) / this.returns.length
        );
        return (meanReturn * 252 - riskFreeRate) / (volatility * Math.sqrt(252));
    }
    
    calculateVaR(confidence = 0.05) {
        const sortedReturns = [...this.returns].sort((a, b) => a - b);
        const index = Math.floor(confidence * sortedReturns.length);
        return sortedReturns[index];
    }
}

// Generate sample data
const prices = Array.from({length: 252}, (_, i) => 
    100 * Math.exp((Math.random() - 0.5) * 0.02 * i + Math.random() * 0.1)
);

const analyzer = new FinancialAnalyzer(prices);
console.log('Sharpe Ratio:', analyzer.calculateSharpeRatio().toFixed(4));
console.log('VaR (5%):', (analyzer.calculateVaR() * 100).toFixed(2) + '%');`
        };
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadExample(this.currentLanguage);
    }
    
    bindEvents() {
        // Editor tab switching
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
        
        // Run code button
        const runBtn = document.querySelector('.run-code-btn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }
    }
    
    switchLanguage(language) {
        this.currentLanguage = language;
        
        // Update active tab
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-lang') === language) {
                tab.classList.add('active');
            }
        });
        
        this.loadExample(language);
    }
    
    loadExample(language) {
        const textarea = document.getElementById('code-input');
        if (textarea && this.codeExamples[language]) {
            textarea.value = this.codeExamples[language];
        }
    }
    
    runCode() {
        const code = document.getElementById('code-input').value;
        const output = document.getElementById('code-output');
        
        // Simulate code execution
        output.innerHTML = '<div class="execution-animation">Running code...</div>';
        
        setTimeout(() => {
            const result = this.simulateExecution(code);
            output.innerHTML = result;
        }, 2000);
    }
    
    simulateExecution(code) {
        // Simulate different outputs based on language and code content
        if (this.currentLanguage === 'python') {
            return `<div class="execution-result">
                <div class="output-line"><span class="output-type">[OUTPUT]</span></div>
                <div class="output-line">Economic Forecast: [0.0423, 0.0456, 0.0389, 0.0511, 0.0445, 0.0492, 0.0467, 0.0523, 0.0434, 0.0498]</div>
                <div class="output-line">Mean Growth: 0.0456</div>
                <div class="output-line">Volatility: 0.1023</div>
                <div class="output-line">Max Drawdown: -0.1567</div>
                <div class="output-line success"><span class="output-type">[SUCCESS]</span> Model fitted successfully</div>
                <div class="output-line info"><span class="output-type">[INFO]</span> ARIMA(1,1,1) AIC: -245.67</div>
            </div>`;
        } else if (this.currentLanguage === 'r') {
            return `<div class="execution-result">
                <div class="output-line"><span class="output-type">[OUTPUT]</span></div>
                <div class="output-line">Portfolio Statistics:</div>
                <div class="output-line">Expected Returns: 0.0504 0.0487 0.0523 0.0465</div>
                <div class="output-line">Annual Volatility: 0.3182 0.3245 0.3098 0.3267</div>
                <div class="output-line">Correlation Matrix:</div>
                <div class="output-line">     Tech Finance Energy Healthcare</div>
                <div class="output-line">Tech  1.000   0.123  -0.045     0.234</div>
                <div class="output-line">Finance 0.123 1.000   0.167    -0.089</div>
                <div class="output-line">Energy -0.045 0.167   1.000     0.034</div>
                <div class="output-line">Healthcare 0.234 -0.089 0.034   1.000</div>
            </div>`;
        } else {
            return `<div class="execution-result">
                <div class="output-line"><span class="output-type">[LOG]</span></div>
                <div class="output-line">Sharpe Ratio: 1.2456</div>
                <div class="output-line">VaR (5%): -2.34%</div>
                <div class="output-line success"><span class="output-type">[SUCCESS]</span> Analysis completed</div>
            </div>`;
        }
    }
}

// Algorithm Visualizations
class AlgorithmVisualizations {
    constructor() {
        this.currentAlgo = 'sorting';
        this.canvases = {};
        this.animationFrames = {};
        this.init();
    }
    
    init() {
        this.setupCanvases();
        this.bindEvents();
        this.initializeSortingVisualization();
    }
    
    setupCanvases() {
        const canvasIds = ['sort-canvas', 'regression-canvas', 'clustering-canvas', 'neural-canvas'];
        canvasIds.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                this.canvases[id] = {
                    element: canvas,
                    ctx: canvas.getContext('2d'),
                    width: canvas.width,
                    height: canvas.height
                };
            }
        });
    }
    
    bindEvents() {
        // Algorithm selector
        algoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const algo = e.target.getAttribute('data-algo');
                this.switchAlgorithm(algo);
            });
        });
        
        // Control buttons
        this.bindSortingControls();
        this.bindRegressionControls();
        this.bindClusteringControls();
        this.bindNeuralControls();
    }
    
    switchAlgorithm(algorithm) {
        this.currentAlgo = algorithm;
        
        // Update active button
        algoButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-algo') === algorithm) {
                btn.classList.add('active');
            }
        });
        
        // Show corresponding visualization
        algoVisualizations.forEach(viz => {
            viz.classList.remove('active');
            if (viz.id === `${algorithm}-viz`) {
                viz.classList.add('active');
            }
        });
        
        // Initialize specific visualization
        this.initializeVisualization(algorithm);
    }
    
    initializeVisualization(algorithm) {
        switch(algorithm) {
            case 'sorting':
                this.initializeSortingVisualization();
                break;
            case 'regression':
                this.initializeRegressionVisualization();
                break;
            case 'clustering':
                this.initializeClusteringVisualization();
                break;
            case 'neural':
                this.initializeNeuralVisualization();
                break;
        }
    }
    
    bindSortingControls() {
        const startBtn = document.getElementById('start-sort');
        const resetBtn = document.getElementById('reset-sort');
        
        if (startBtn) startBtn.addEventListener('click', () => this.startSorting());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetSorting());
    }
    
    bindRegressionControls() {
        const addBtn = document.getElementById('add-points');
        const fitBtn = document.getElementById('fit-line');
        const clearBtn = document.getElementById('clear-points');
        
        if (addBtn) addBtn.addEventListener('click', () => this.addRandomPoints());
        if (fitBtn) fitBtn.addEventListener('click', () => this.fitRegressionLine());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearPoints());
    }
    
    bindClusteringControls() {
        const generateBtn = document.getElementById('generate-data');
        const runBtn = document.getElementById('run-kmeans');
        
        if (generateBtn) generateBtn.addEventListener('click', () => this.generateClusteringData());
        if (runBtn) runBtn.addEventListener('click', () => this.runKMeans());
    }
    
    bindNeuralControls() {
        const trainBtn = document.getElementById('train-network');
        const resetBtn = document.getElementById('reset-network');
        
        if (trainBtn) trainBtn.addEventListener('click', () => this.trainNeuralNetwork());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetNeuralNetwork());
    }
    
    // Sorting Algorithm Implementation
    initializeSortingVisualization() {
        const canvas = this.canvases['sort-canvas'];
        if (!canvas) return;
        
        this.sortingData = Array.from({length: 50}, () => Math.floor(Math.random() * 300) + 20);
        this.drawSortingBars();
    }
    
    drawSortingBars(comparing = [], sorted = []) {
        const canvas = this.canvases['sort-canvas'];
        const ctx = canvas.ctx;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = width / this.sortingData.length;
        
        this.sortingData.forEach((value, index) => {
            let color = '#3b82f6';
            if (comparing.includes(index)) color = '#ef4444';
            if (sorted.includes(index)) color = '#10b981';
            
            ctx.fillStyle = color;
            ctx.fillRect(index * barWidth, height - value, barWidth - 2, value);
            
            // Add value labels
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, index * barWidth + barWidth/2, height - value - 5);
        });
    }
    
    async startSorting() {
        const algorithm = document.getElementById('sort-algorithm').value;
        
        switch(algorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'quick':
                await this.quickSort(0, this.sortingData.length - 1);
                break;
            case 'merge':
                await this.mergeSort(0, this.sortingData.length - 1);
                break;
        }
    }
    
    async bubbleSort() {
        const n = this.sortingData.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.drawSortingBars([j, j + 1]);
                await this.sleep(100);
                
                if (this.sortingData[j] > this.sortingData[j + 1]) {
                    [this.sortingData[j], this.sortingData[j + 1]] = [this.sortingData[j + 1], this.sortingData[j]];
                }
            }
            this.drawSortingBars([], [n - 1 - i]);
        }
        
        this.drawSortingBars([], Array.from({length: n}, (_, i) => i));
    }
    
    resetSorting() {
        this.initializeSortingVisualization();
    }
    
    // Regression Visualization
    initializeRegressionVisualization() {
        const canvas = this.canvases['regression-canvas'];
        if (!canvas) return;
        
        this.regressionPoints = [];
        this.drawRegressionPlot();
    }
    
    drawRegressionPlot() {
        const canvas = this.canvases['regression-canvas'];
        const ctx = canvas.ctx;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 50, canvas.height - 50);
        ctx.moveTo(50, 50);
        ctx.lineTo(50, canvas.height - 50);
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#3b82f6';
        this.regressionPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw regression line if calculated
        if (this.regressionLine) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(50, this.regressionLine.slope * 50 + this.regressionLine.intercept);
            ctx.lineTo(canvas.width - 50, this.regressionLine.slope * (canvas.width - 50) + this.regressionLine.intercept);
            ctx.stroke();
        }
    }
    
    addRandomPoints() {
        const canvas = this.canvases['regression-canvas'];
        
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * (canvas.width - 100) + 50;
            const y = Math.random() * (canvas.height - 100) + 50;
            this.regressionPoints.push({x, y});
        }
        
        this.drawRegressionPlot();
    }
    
    fitRegressionLine() {
        if (this.regressionPoints.length < 2) return;
        
        // Calculate linear regression
        const n = this.regressionPoints.length;
        const sumX = this.regressionPoints.reduce((sum, p) => sum + p.x, 0);
        const sumY = this.regressionPoints.reduce((sum, p) => sum + p.y, 0);
        const sumXY = this.regressionPoints.reduce((sum, p) => sum + p.x * p.y, 0);
        const sumXX = this.regressionPoints.reduce((sum, p) => sum + p.x * p.x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        this.regressionLine = {slope, intercept};
        this.drawRegressionPlot();
    }
    
    clearPoints() {
        this.regressionPoints = [];
        this.regressionLine = null;
        this.drawRegressionPlot();
    }
    
    // K-Means Clustering
    initializeClusteringVisualization() {
        const canvas = this.canvases['clustering-canvas'];
        if (!canvas) return;
        
        this.clusteringData = [];
        this.centroids = [];
        this.drawClusteringPlot();
    }
    
    generateClusteringData() {
        this.clusteringData = [];
        
        // Generate clustered data
        const centers = [
            {x: 200, y: 150},
            {x: 500, y: 200},
            {x: 350, y: 300}
        ];
        
        centers.forEach(center => {
            for (let i = 0; i < 30; i++) {
                this.clusteringData.push({
                    x: center.x + (Math.random() - 0.5) * 100,
                    y: center.y + (Math.random() - 0.5) * 100,
                    cluster: -1
                });
            }
        });
        
        this.drawClusteringPlot();
    }
    
    async runKMeans() {
        const k = parseInt(document.getElementById('k-value').value);
        
        // Initialize centroids randomly
        this.centroids = [];
        for (let i = 0; i < k; i++) {
            this.centroids.push({
                x: Math.random() * 700 + 50,
                y: Math.random() * 300 + 50,
                color: `hsl(${i * 360 / k}, 70%, 60%)`
            });
        }
        
        // K-means iterations
        for (let iteration = 0; iteration < 10; iteration++) {
            // Assign points to nearest centroid
            this.clusteringData.forEach(point => {
                let minDist = Infinity;
                let nearestCentroid = 0;
                
                this.centroids.forEach((centroid, index) => {
                    const dist = Math.sqrt(
                        Math.pow(point.x - centroid.x, 2) + 
                        Math.pow(point.y - centroid.y, 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        nearestCentroid = index;
                    }
                });
                
                point.cluster = nearestCentroid;
            });
            
            // Update centroids
            this.centroids.forEach((centroid, index) => {
                const clusterPoints = this.clusteringData.filter(p => p.cluster === index);
                if (clusterPoints.length > 0) {
                    centroid.x = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                    centroid.y = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
                }
            });
            
            this.drawClusteringPlot();
            await this.sleep(500);
        }
    }
    
    drawClusteringPlot() {
        const canvas = this.canvases['clustering-canvas'];
        const ctx = canvas.ctx;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw data points
        this.clusteringData.forEach(point => {
            const color = point.cluster >= 0 ? this.centroids[point.cluster].color : '#6b7280';
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw centroids
        this.centroids.forEach(centroid => {
            ctx.fillStyle = centroid.color;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centroid.x, centroid.y, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });
    }
    
    // Neural Network Visualization
    initializeNeuralVisualization() {
        const canvas = this.canvases['neural-canvas'];
        if (!canvas) return;
        
        this.neuralNetwork = {
            layers: [4, 6, 4, 2],
            weights: [],
            activations: [],
            errors: []
        };
        
        this.drawNeuralNetwork();
    }
    
    drawNeuralNetwork() {
        const canvas = this.canvases['neural-canvas'];
        const ctx = canvas.ctx;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const layers = this.neuralNetwork.layers;
        const layerSpacing = canvas.width / (layers.length + 1);
        
        // Draw connections
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayerNodes = layers[l];
            const nextLayerNodes = layers[l + 1];
            
            for (let i = 0; i < currentLayerNodes; i++) {
                for (let j = 0; j < nextLayerNodes; j++) {
                    const x1 = (l + 1) * layerSpacing;
                    const y1 = (i + 1) * (canvas.height / (currentLayerNodes + 1));
                    const x2 = (l + 2) * layerSpacing;
                    const y2 = (j + 1) * (canvas.height / (nextLayerNodes + 1));
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        layers.forEach((nodeCount, layerIndex) => {
            const x = (layerIndex + 1) * layerSpacing;
            const nodeSpacing = canvas.height / (nodeCount + 1);
            
            for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
                const y = (nodeIndex + 1) * nodeSpacing;
                
                ctx.fillStyle = layerIndex === 0 ? '#10b981' : 
                               layerIndex === layers.length - 1 ? '#ef4444' : '#3b82f6';
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, 2 * Math.PI);
                ctx.fill();
                
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
        
        // Add labels
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Input', layerSpacing, canvas.height - 20);
        ctx.fillText('Hidden 1', layerSpacing * 2, canvas.height - 20);
        ctx.fillText('Hidden 2', layerSpacing * 3, canvas.height - 20);
        ctx.fillText('Output', layerSpacing * 4, canvas.height - 20);
    }
    
    async trainNeuralNetwork() {
        const epochs = parseInt(document.getElementById('epochs').value);
        const learningRate = parseFloat(document.getElementById('learning-rate').value);
        
        for (let epoch = 0; epoch < Math.min(epochs, 20); epoch++) {
            // Simulate training step with visual feedback
            this.highlightActiveConnections();
            await this.sleep(300);
        }
        
        this.drawNeuralNetwork();
    }
    
    highlightActiveConnections() {
        // Add visual feedback for training
        const canvas = this.canvases['neural-canvas'];
        const ctx = canvas.ctx;
        
        // Highlight some connections in red to show activity
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        
        // Random connections to highlight
        for (let i = 0; i < 5; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = x1 + (Math.random() - 0.5) * 100;
            const y2 = y1 + (Math.random() - 0.5) * 100;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    resetNeuralNetwork() {
        this.initializeNeuralVisualization();
    }
    
    // Utility function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Data Science Dashboard
class DataScienceDashboard {
    constructor() {
        this.currentDataset = 'economic';
        this.currentTimeframe = '1Y';
        this.data = {};
        this.charts = {};
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateSampleData();
        this.createCharts();
    }
    
    bindEvents() {
        const datasetSelector = document.getElementById('dataset-selector');
        const timeframeSelector = document.getElementById('timeframe-selector');
        const refreshBtn = document.getElementById('refresh-data');
        
        if (datasetSelector) {
            datasetSelector.addEventListener('change', (e) => {
                this.currentDataset = e.target.value;
                this.generateSampleData();
                this.updateCharts();
            });
        }
        
        if (timeframeSelector) {
            timeframeSelector.addEventListener('change', (e) => {
                this.currentTimeframe = e.target.value;
                this.generateSampleData();
                this.updateCharts();
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.generateSampleData();
                this.updateCharts();
            });
        }
    }
    
    generateSampleData() {
        const timeframes = {'1M': 30, '3M': 90, '6M': 180, '1Y': 365};
        const days = timeframes[this.currentTimeframe];
        
        this.data = {
            dates: Array.from({length: days}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (days - i));
                return date;
            }),
            values: [],
            correlationData: {}
        };
        
        // Generate dataset-specific data
        switch(this.currentDataset) {
            case 'economic':
                this.generateEconomicData(days);
                break;
            case 'financial':
                this.generateFinancialData(days);
                break;
            case 'crypto':
                this.generateCryptoData(days);
                break;
        }
        
        this.calculateStatistics();
    }
    
    generateEconomicData(days) {
        let value = 100;
        this.data.values = Array.from({length: days}, () => {
            value += (Math.random() - 0.5) * 2 + 0.02;
            return value;
        });
        
        this.data.correlationData = {
            'GDP': this.data.values,
            'Inflation': this.data.values.map(v => v * 0.8 + Math.random() * 10),
            'Unemployment': this.data.values.map(v => 100 - v * 0.3 + Math.random() * 5),
            'Interest Rate': this.data.values.map(v => v * 0.1 + Math.random() * 2)
        };
    }
    
    generateFinancialData(days) {
        let value = 1000;
        this.data.values = Array.from({length: days}, () => {
            value *= (1 + (Math.random() - 0.5) * 0.05);
            return value;
        });
        
        this.data.correlationData = {
            'Stock Price': this.data.values,
            'Volume': this.data.values.map(v => v * 1000 + Math.random() * 50000),
            'VIX': this.data.values.map(v => 30 - v * 0.01 + Math.random() * 10),
            'Bond Yield': this.data.values.map(v => v * 0.002 + Math.random() * 1)
        };
    }
    
    generateCryptoData(days) {
        let value = 50000;
        this.data.values = Array.from({length: days}, () => {
            value *= (1 + (Math.random() - 0.5) * 0.1);
            return Math.max(value, 1000);
        });
        
        this.data.correlationData = {
            'BTC Price': this.data.values,
            'ETH Price': this.data.values.map(v => v * 0.065 + Math.random() * 100),
            'Market Cap': this.data.values.map(v => v * 19000000 + Math.random() * 1000000000),
            'Dominance': this.data.values.map(v => 40 + Math.random() * 20)
        };
    }
    
    calculateStatistics() {
        const values = this.data.values;
        const n = values.length;
        
        const mean = values.reduce((a, b) => a + b) / n;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        const std = Math.sqrt(variance);
        
        // Calculate skewness
        const skewness = values.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0) / n;
        
        // Calculate kurtosis
        const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0) / n - 3;
        
        this.statistics = {mean, std, skewness, kurtosis};
        this.updateStatisticsDisplay();
    }
    
    updateStatisticsDisplay() {
        const stats = this.statistics;
        
        document.getElementById('mean-value').textContent = stats.mean.toFixed(2);
        document.getElementById('std-value').textContent = stats.std.toFixed(2);
        document.getElementById('skew-value').textContent = stats.skewness.toFixed(3);
        document.getElementById('kurt-value').textContent = stats.kurtosis.toFixed(3);
    }
    
    createCharts() {
        this.createTimeSeriesChart();
        this.createCorrelationChart();
        this.createVolatilityChart();
    }
    
    createTimeSeriesChart() {
        const canvas = document.getElementById('timeseries-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (this.data.values.length === 0) return;
        
        const padding = 40;
        const width = canvas.width - 2 * padding;
        const height = canvas.height - 2 * padding;
        
        const minValue = Math.min(...this.data.values);
        const maxValue = Math.max(...this.data.values);
        const valueRange = maxValue - minValue;
        
        // Draw axes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Draw time series line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        this.data.values.forEach((value, index) => {
            const x = padding + (index / (this.data.values.length - 1)) * width;
            const y = canvas.height - padding - ((value - minValue) / valueRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add title
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.currentDataset.toUpperCase()} Time Series`, canvas.width / 2, 20);
    }
    
    createCorrelationChart() {
        const canvas = document.getElementById('correlation-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const variables = Object.keys(this.data.correlationData);
        const n = variables.length;
        const cellSize = Math.min(canvas.width, canvas.height) / (n + 1);
        const startX = (canvas.width - n * cellSize) / 2;
        const startY = (canvas.height - n * cellSize) / 2;
        
        // Calculate correlation matrix
        const correlations = [];
        for (let i = 0; i < n; i++) {
            correlations[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    correlations[i][j] = 1;
                } else {
                    const corr = this.calculateCorrelation(
                        this.data.correlationData[variables[i]],
                        this.data.correlationData[variables[j]]
                    );
                    correlations[i][j] = corr;
                }
            }
        }
        
        // Draw correlation matrix
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const correlation = correlations[i][j];
                const intensity = Math.abs(correlation);
                const color = correlation > 0 ? 
                    `rgba(59, 130, 246, ${intensity})` : 
                    `rgba(239, 68, 68, ${intensity})`;
                
                ctx.fillStyle = color;
                ctx.fillRect(
                    startX + j * cellSize,
                    startY + i * cellSize,
                    cellSize - 1,
                    cellSize - 1
                );
                
                // Add correlation value
                ctx.fillStyle = intensity > 0.5 ? '#ffffff' : '#000000';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    correlation.toFixed(2),
                    startX + j * cellSize + cellSize / 2,
                    startY + i * cellSize + cellSize / 2
                );
            }
        }
        
        // Add title
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Correlation Matrix', canvas.width / 2, 10);
    }
    
    createVolatilityChart() {
        const canvas = document.getElementById('volatility-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate rolling volatility
        const windowSize = 20;
        const volatility = [];
        
        for (let i = windowSize; i < this.data.values.length; i++) {
            const window = this.data.values.slice(i - windowSize, i);
            const returns = window.slice(1).map((val, idx) => (val - window[idx]) / window[idx]);
            const volatilityValue = Math.sqrt(returns.reduce((sum, ret) => sum + ret * ret, 0) / returns.length);
            volatility.push(volatilityValue);
        }
        
        if (volatility.length === 0) return;
        
        const padding = 40;
        const width = canvas.width - 2 * padding;
        const height = canvas.height - 2 * padding;
        
        const minVol = Math.min(...volatility);
        const maxVol = Math.max(...volatility);
        const volRange = maxVol - minVol;
        
        // Draw axes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Draw volatility line
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        volatility.forEach((vol, index) => {
            const x = padding + (index / (volatility.length - 1)) * width;
            const y = canvas.height - padding - ((vol - minVol) / volRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add title
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Rolling Volatility (20-day)', canvas.width / 2, 20);
    }
    
    calculateCorrelation(x, y) {
        const n = Math.min(x.length, y.length);
        const sumX = x.slice(0, n).reduce((a, b) => a + b, 0);
        const sumY = y.slice(0, n).reduce((a, b) => a + b, 0);
        const sumXY = x.slice(0, n).reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumXX = x.slice(0, n).reduce((sum, xi) => sum + xi * xi, 0);
        const sumYY = y.slice(0, n).reduce((sum, yi) => sum + yi * yi, 0);
        
        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
        
        return denominator === 0 ? 0 : numerator / denominator;
    }
    
    updateCharts() {
        this.createTimeSeriesChart();
        this.createCorrelationChart();
        this.createVolatilityChart();
    }
}

// Technical Showcases Manager
class TechnicalShowcasesManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindTabEvents();
        this.initializeComponents();
    }
    
    bindTabEvents() {
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }
    
    switchTab(tabName) {
        // Update active tab button
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Show corresponding content
        showcaseContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabName) {
                content.classList.add('active');
            }
        });
    }
    
    initializeComponents() {
        // Initialize each component
        this.codeEditor = new LiveCodeEditor();
        this.algorithmViz = new AlgorithmVisualizations();
        this.dashboard = new DataScienceDashboard();
    }
}

// Enhanced Visual Effects Manager
class VisualEffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.initializeParallaxEffect();
        this.initializeGlowEffects();
        this.initializeHoverAnimations();
        this.initializeScrollAnimations();
        this.initializeCursorEffects();
    }

    initializeParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero::before, .about::before, .projects::before');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    initializeGlowEffects() {
        const glowElements = document.querySelectorAll('.btn-primary, .project-card.featured, .social-link');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.filter = 'brightness(1.1) saturate(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = 'brightness(1) saturate(1)';
            });
        });
    }

    initializeHoverAnimations() {
        // Enhanced card hover effects
        const cards = document.querySelectorAll('.skill-category, .project-card, .research-area, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, card);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;
        
        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.hero-text > *, .about-text > *, .section-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    initializeCursorEffects() {
        // Create custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Scale cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .btn, .social-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// Enhanced Theme Manager with improved transitions
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
        this.addThemeTransitions();
    }

    addThemeTransitions() {
        // Add smooth transitions for theme switching
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        // Add loading animation
        document.body.style.pointerEvents = 'none';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
            
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Re-enable interactions
            document.body.style.pointerEvents = 'auto';
        }, 150);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => this.toggleMenu());

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
            this.updateNavbarBackground();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active', this.isMenuOpen);
        hamburger.classList.toggle('active', this.isMenuOpen);
    }

    closeMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        this.closeMenu();
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateNavbarBackground() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
    }

    start() {
        if (this.isTyping) return;
        this.isTyping = true;
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.current = 0;
        this.increment = this.target / (duration / 16);
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;
        
        const updateCounter = () => {
            this.current += this.increment;
            if (this.current < this.target) {
                this.element.textContent = Math.floor(this.current);
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        updateCounter();
    }
}

// Skill Progress Animation
class SkillProgressAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        this.skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Initialize counter animations
        heroStats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            const counter = new CounterAnimation(stat, target);
            
            this.observe(stat, () => counter.animate(), {
                threshold: 0.7
            });
        });

        // Initialize skill progress animation
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillAnimation = new SkillProgressAnimation();
            this.observe(skillsSection, () => skillAnimation.animate(), {
                threshold: 0.3
            });
        }

        // Initialize fade-in animations
        this.initializeFadeAnimations();
    }

    observe(element, callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(entry.target);
                }
            });
        }, { ...defaultOptions, ...options });

        observer.observe(element);
        this.observers.set(element, observer);
    }

    initializeFadeAnimations() {
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-category, .research-area, .contact-item, .highlight'
        );

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            this.observe(element, () => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Sending message...', 'info');
        
        setTimeout(() => {
            this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    }

    validateForm(data) {
        const required = ['name', 'email', 'subject', 'message'];
        return required.every(field => data[field] && data[field].trim());
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        
        // Style the message
        Object.assign(messageElement.style, {
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        });

        // Set color based on type
        const colors = {
            success: { bg: '#10b981', color: 'white' },
            error: { bg: '#ef4444', color: 'white' },
            info: { bg: '#3b82f6', color: 'white' }
        };

        if (colors[type]) {
            messageElement.style.backgroundColor = colors[type].bg;
            messageElement.style.color = colors[type].color;
        }

        // Add to form
        contactForm.appendChild(messageElement);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                setTimeout(() => messageElement.remove(), 300);
            }
        }, 5000);
    }
}

// Particles Background Effect
class ParticlesBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#3b82f6';
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`;
                    this.ctx.stroke();
                }
            }
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Smooth Scroll Enhancement
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Handle scroll to top
        this.createScrollToTop();
    }

    createScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        
        Object.assign(scrollToTopBtn.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            zIndex: '999',
            boxShadow: 'var(--shadow-medium)'
        });

        document.body.appendChild(scrollToTopBtn);

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'translateY(10px)';
            }
        });

        // Click handler
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-2px)';
            scrollToTopBtn.style.boxShadow = 'var(--shadow-heavy)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = 'var(--shadow-medium)';
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0
        };
        this.init();
    }

    init() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Measure render time
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.metrics.renderTime = performance.now();
                console.log(`Initial render completed in ${this.metrics.renderTime.toFixed(2)}ms`);
            });
        }
    }
}

// Main Application
class App {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Core components
            this.components.set('theme', new ThemeManager());
            this.components.set('navigation', new NavigationManager());
            this.components.set('animations', new AnimationObserver());
            this.components.set('forms', new FormHandler());
            this.components.set('scroll', new SmoothScroll());
            this.components.set('performance', new PerformanceMonitor());

            // Enhanced visual effects
            this.components.set('visualEffects', new VisualEffectsManager());

            // Optional components (only if elements exist)
            if (document.querySelector('.hero-title .typing-text')) {
                const typingElement = document.querySelector('.hero-title .typing-text');
                const typingAnimation = new TypingAnimation(typingElement, 'Eren Gündemir', 150);
                this.components.set('typing', typingAnimation);
                
                // Start typing animation after a delay
                setTimeout(() => typingAnimation.start(), 500);
            }

            // Particles background (optional, can be disabled for performance)
            if (window.innerWidth > 768) {
                this.components.set('particles', new ParticlesBackground());
            }

            // Technical showcases
            this.components.set('showcases', new TechnicalShowcasesManager());

            console.log('🚀 Application initialized successfully');
            console.log('✨ Enhanced visual effects activated');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }

    getComponent(name) {
        return this.components.get(name);
    }

    destroy() {
        this.components.forEach((component, name) => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        this.components.clear();
    }
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Initialize application
const app = new App();

// Export for debugging
window.app = app; 
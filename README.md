# Eren Gündemir - Personal Website

A modern, responsive personal website showcasing econometric expertise, data science projects, and professional portfolio. Built with HTML5, CSS3, and JavaScript for optimal performance and user experience.

## 🌟 Features

### Design & User Experience
- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Dark/Light Theme**: Toggle between themes with persistent preference storage
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Performance Optimized**: Fast loading with efficient code and optimized assets

### Sections
- **Hero Section**: Dynamic typing animation, animated statistics, and call-to-action buttons
- **About**: Professional summary with highlighted expertise areas
- **Skills**: Interactive progress bars and categorized skill tags
- **Projects**: Featured project cards with technology tags and GitHub links
- **Research**: Current research interests in econometrics and data science
- **Contact**: Functional contact form with validation and social links

### Interactive Features
- **Smooth Scrolling Navigation**: Active section highlighting and smooth page transitions
- **Animated Counters**: Statistics that count up when scrolled into view
- **Skill Progress Bars**: Animated skill level indicators
- **Particles Background**: Subtle animated background effect (desktop only)
- **Form Handling**: Contact form with validation and user feedback
- **Scroll to Top**: Convenient button for quick navigation

## 🚀 Quick Start

### 1. Repository Setup
1. Fork or clone this repository to your GitHub account
2. Rename the repository to `yourusername.github.io` (replace with your GitHub username)
3. Enable GitHub Pages in repository settings

### 2. Customization
Edit the following files to personalize your website:

#### `index.html`
Update personal information:
```html
<!-- Update name and title -->
<h1 class="hero-title">Your Name</h1>
<h2 class="hero-subtitle">Your Professional Title</h2>

<!-- Update description -->
<p class="hero-description">Your professional summary...</p>

<!-- Update statistics -->
<span class="stat-number" data-target="6">0</span>
<span class="stat-label">Programming Languages</span>

<!-- Update social links -->
<a href="https://github.com/yourusername" target="_blank">
<a href="https://linkedin.com/in/yourprofile" target="_blank">
```

#### Update Projects
Replace project information with your own:
```html
<div class="project-card">
    <h3>Your Project Name</h3>
    <p>Project description...</p>
    <div class="project-tech">
        <span class="tech-tag">Technology 1</span>
        <span class="tech-tag">Technology 2</span>
    </div>
    <div class="project-links">
        <a href="https://github.com/yourusername/project" target="_blank">
            <i class="fab fa-github"></i> Code
        </a>
    </div>
</div>
```

#### `styles.css`
Customize colors by modifying CSS variables:
```css
:root {
    --primary-color: #3b82f6;    /* Main brand color */
    --secondary-color: #10b981;  /* Accent color */
    --accent-color: #f59e0b;     /* Highlight color */
}
```

#### `script.js`
Update typing animation text:
```javascript
const typingAnimation = new TypingAnimation(typingElement, 'Your Name', 150);
```

### 3. Add Your CV
1. Replace `RenderCV_EngineeringResumes_Theme (1).pdf` with your CV file
2. Update the file name in `index.html`:
```html
<a href="your-cv-filename.pdf" target="_blank" class="btn btn-secondary">
    <i class="fas fa-download"></i> Download CV
</a>
```

## 📁 File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
├── README.md           # Documentation
└── your-cv.pdf         # Your CV file
```

## 🎨 Customization Guide

### Colors and Themes
The website uses CSS custom properties for easy color customization:

```css
/* Light theme colors */
:root {
    --primary-color: #3b82f6;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --bg-color: #ffffff;
    --text-primary: #1f2937;
}

/* Dark theme colors */
[data-theme="dark"] {
    --primary-color: #60a5fa;
    --secondary-color: #34d399;
    --accent-color: #fbbf24;
    --bg-color: #0f172a;
    --text-primary: #f1f5f9;
}
```

### Adding New Sections
1. Add HTML section in `index.html`:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">New Section</h2>
            <p class="section-subtitle">Section description</p>
        </div>
        <!-- Section content -->
    </div>
</section>
```

2. Add navigation link:
```html
<a href="#new-section" class="nav-link">New Section</a>
```

3. Add CSS styles:
```css
.new-section {
    padding: 6rem 0;
    background: var(--bg-secondary);
}
```

### Skills Customization
Update skill levels in the skills section:
```html
<div class="skill-item">
    <span class="skill-name">Skill Name</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="85%"></div>
    </div>
</div>
```

### Project Cards
Add new projects by copying the project card structure:
```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-icon-name"></i>
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="github-link" target="_blank" class="btn btn-sm">
                <i class="fab fa-github"></i> Code
            </a>
        </div>
    </div>
</div>
```

## 🚦 Deployment

### GitHub Pages (Recommended)
1. Push your customized files to your GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/" (root) folder
5. Your site will be available at `https://yourusername.github.io`

### Custom Domain (Optional)
1. Add a `CNAME` file to your repository with your domain name
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## 🛠️ Development

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/yourusername.github.io.git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` to view your site

### Code Structure
- **Modular JavaScript**: Object-oriented design with separate classes for different features
- **CSS Custom Properties**: Easy theming and color management
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Performance Optimized**: Intersection Observer API for efficient animations

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔧 Troubleshooting

### Common Issues

**Q: The theme toggle isn't working**
A: Make sure JavaScript is enabled and check the browser console for errors.

**Q: Animations aren't playing**
A: Ensure your browser supports CSS animations and JavaScript is enabled.

**Q: Contact form isn't working**
A: The form is currently set up for demonstration. For production, integrate with a form service like Formspree or Netlify Forms.

**Q: Images aren't loading**
A: Check file paths and ensure images are in the correct directory.

### Performance Tips
- Optimize images before uploading
- Minimize custom fonts if loading speed is critical
- Consider disabling particles background on slower devices

## 📞 Support

For questions or support:
- Check the [Issues](https://github.com/yourusername/yourusername.github.io/issues) page
- Create a new issue for bugs or feature requests
- Contact [your-email@example.com](mailto:your-email@example.com)

---

**Built with ❤️ for the econometrics and data science community** 
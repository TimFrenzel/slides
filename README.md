# Academic Slides System

A modern presentation authoring and hosting system for educational content. Create interactive slides in Markdown, build static HTML with Reveal.js, and host on GitHub Pages with seamless WordPress integration.

## Overview

This system enables educators to:
- **Author presentations in plain Markdown** for fast, version-controlled content creation
- **Generate interactive HTML slides** using Reveal.js with a consistent dark theme
- **Host as static websites** on GitHub Pages for reliable classroom delivery
- **Embed in WordPress** via responsive iframes
- **Export to PDF** for LMS integration and offline use

## Key Features

- **Fast Markdown authoring** - No complex tools, just plain text
- **Consistent dark theme** - High contrast design optimized for classroom projection
- **Self-hosted assets** - No reliance on external CDNs during class
- **Video integration** - YouTube embedding with captions
- **Code highlighting** - Syntax highlighting for multiple programming languages
- **Math rendering** - KaTeX support for mathematical expressions
- **Responsive design** - Works on laptops, tablets, and projectors
- **Accessibility focused** - Keyboard navigation, alt text, high contrast

## Repository Structure

```
slides/
  README.md
  package.json
  .github/workflows/build.yml
  theme/
    reveal/                # Vendored Reveal.js and plugins
    prism/                 # Vendored Prism assets
    katex/                 # Vendored KaTeX assets
    mermaid/               # Vendored Mermaid assets
    inter/                 # Self-hosted Inter font files
    tim.css                # Site theme
    LICENSES/              # Third-party licenses
    VERSIONS.md            # Pinned asset versions and source URLs
  shared/
    images/
    snippets.md
  machine-learning/
    week01/
      slides.md
      index.html
      assets/
    week02/
    week03/
  data-analytics/
    week01/
      slides.md
      index.html
      assets/
    week02/
    week03/
  data-visualization/
    week01/
      slides.md
      index.html
      assets/
    week02/
    week03/
  scripts/
    build-all.js
    pdf-all.js
```

## Quick Start

### Prerequisites

- Node.js LTS
- Git

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development

Preview a slide deck:
```bash
npx reveal-md machine-learning/week01/slides.md --theme theme/tim.css --watch
```

Build static output:
```bash
npx reveal-md machine-learning/week01/slides.md \
  --theme theme/tim.css \
  --static machine-learning/week01 \
  --assets-dir machine-learning/week01/assets
```

Build all decks:
```bash
npm run build:all
```

Generate PDFs:
```bash
npm run pdf:all
```

## Authoring Guidelines

### Slide Structure
- One idea per slide
- 5 to 8 short lines maximum
- Short, clear headings

### Content Types
- **Title slides** - Course and week information
- **Agenda slides** - What will be covered
- **Concept slides** - Key learning objectives
- **Example slides** - Practical demonstrations
- **Exercise slides** - Student activities
- **Video slides** - YouTube embeds with summaries
- **Code slides** - Syntax-highlighted examples
- **Summary slides** - Key takeaways

### Media Guidelines
- **Images**: WebP format, max 1800px width, alt text required
- **Videos**: YouTube unlisted, captions enabled, one-line summary
- **Links**: Open in new tab, descriptive link text

## Theme and Styling

The system uses a custom dark theme (`theme/tim.css`) with:
- Inter font family for readability
- High contrast colors for classroom visibility
- Consistent spacing and typography
- Responsive design principles

## Deployment

The system uses GitHub Actions for automated building and deployment:
- Builds trigger on Markdown file changes
- Static HTML generated and deployed to GitHub Pages
- PDF exports created for offline use

## WordPress Integration

Embed slides in WordPress using a custom HTML block:

```html
<div style="position:relative;padding-top:56.25%;width:100%;height:0;overflow:hidden;">
  <iframe
    src="https://timfrenzel.github.io/slides/machine-learning/week01/index.html"
    title="Machine Learning Week 1"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
```

## Accessibility

The system includes built-in accessibility features:
- Keyboard navigation support
- High contrast ratios (4.5:1 minimum)
- Alt text for all images
- Caption support for videos
- Screen reader friendly structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run build:all`
5. Submit a pull request

## License

This project uses various open-source components. See `theme/LICENSES/` for third-party license information.

## Support

For questions or issues:
1. Check the documentation in this README
2. Review the theme and build scripts
3. Open an issue for bugs or feature requests

## Roadmap

- Enhanced theme customization options
- Additional plugin integrations
- Improved mobile experience
- Course index page generation
- Advanced accessibility features

const expTags = document.querySelectorAll('div.role.current');


expTags.forEach((expTags) => {
    const newTag = document.createElement('p');
  newTag.textContent = 'Current Role';
  newTag.classList.add('current-role');
  expTags.appendChild(newTag);
  });



   
  const originZero = document.getElementById('crackers');

const iconClasses = [
  "devicon-python-plain colored",             // 1. Python for Data Analysis
  "devicon-pandas-plain colored",             // 2. Tabular Data & Clinical Datasets
  "devicon-numpy-original colored",           // 3. Statistical & Numerical Analysis
  "devicon-jupyter-plain colored",            // 4. Exploratory Data & Clinical Research
  "devicon-postgresql-plain colored",         // 5. SQL & Relational Databases
  "devicon-mysql-original colored",           // 6. Clinical Data Warehouse / Tables
  "devicon-microsoftsqlserver-plain colored", // 7. Enterprise SQL & Health IT Data
  "devicon-sqlite-plain colored",             // 8. Local / Lightweight Clinical Queries
  "devicon-r-original colored",               // 9. Biostatistics & Trial Modeling
  "devicon-scikitlearn-plain colored",        // 10. Predictive & Risk Analytics
  "devicon-tensorflow-original colored",      // 11. Deep Learning & Medical Imaging / NLP
  "devicon-pytorch-original colored",         // 12. Neural Networks & Academic ML Research
  "devicon-keras-plain colored",              // 13. Rapid Deep Learning Prototyping
  "devicon-matplotlib-plain colored",         // 14. Statistical & Publication Data Visualization
  "devicon-plotly-plain colored",             // 15. Interactive Cohort & Trial Dashboards
  "devicon-rstudio-plain colored",            // 16. Statistical Computing & Clinical Reporting
  "devicon-git-plain colored",                // 17. Reproducible Research & Version Control
  "devicon-github-original colored",          // 18. Open Science & Research Collaboration
  "devicon-docker-plain colored",             // 19. Containerized & Reproducible Pipelines
  "devicon-linux-plain colored",              // 20. High-Performance Computing (HPC) Clusters
  "devicon-bash-plain colored",               // 21. Automated Data Processing & Shell Scripting
  "devicon-latex-original colored",           // 22. Academic Manuscripts & Grant Writing
  "devicon-markdown-original colored",        // 23. Research Documentation & Lab Notebooks
  "devicon-apachespark-original colored",     // 24. Large-Scale EHR & Big Data Processing
  "devicon-mongodb-plain colored",            // 25. Unstructured Clinical Notes & NoSQL Data
  "devicon-anaconda-original colored",        // 26. Scientific Environment & Dependency Management
  "devicon-amazonwebservices-plain-wordmark colored", // 27. HIPAA-Compliant Cloud Computing & Storage
  "devicon-googlecloud-plain colored",        // 28. Cloud BigQuery & Health Data Analytics
  "devicon-streamlit-plain colored",          // 29. Interactive Clinical Decision & Model Demos
  "devicon-vscode-plain colored"              // 30. Integrated Research & Coding Environment
];

let isFiring = false;
let fireTimer = null;
const activeParticles = [];

class IconParticle {
  constructor(iconClass, startX, startY) {
    this.iconClass = iconClass;
    this.x = startX;
    this.y = startY;
    this.vx = (Math.random() - 0.65) * 8;
    this.vy = -(Math.random() * 6 + 11);
    this.gravity = 0.28;
    this.alpha = 1;
    this.decay = Math.random() * 0.01 + 0.008;
    this.size = Math.floor(Math.random() * 12) + 22;
    this.rotation = (Math.random() - 0.5) * 28;
    this.vRot = (Math.random() - 0.5) * 4.5;

    this.el = document.createElement('i');
    this.el.className = `icon-particle ${this.iconClass}`;
    this.el.style.fontSize = `${this.size}px`;
    //this.el.style.color = "#0096c7";
    document.body.appendChild(this.el);

    this.render();
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vRot;
    this.alpha -= this.decay;
    this.render();
  }

  render() {
    this.el.style.opacity = Math.max(0, this.alpha);
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) translate(-50%, -50%) rotate(${this.rotation}deg)`;
  }

  destroy() {
    this.el.remove();
  }
}

function getZeroTopCenter() {
  const rect = originZero.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top
  };
}

function igniteFromZero() {
  if (isFiring) return;
  isFiring = true;
  let index = 0;

  fireTimer = setInterval(() => {
    if (index < iconClasses.length) {
      const spawn = getZeroTopCenter();
      activeParticles.push(new IconParticle(iconClasses[index], spawn.x, spawn.y));
      index++;
    } else {
      clearInterval(fireTimer);
      isFiring = false;
    }
  }, 65);
}

originZero.addEventListener('click', igniteFromZero);

function step() {
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.update();

    if (p.alpha <= 0 || p.y > window.innerHeight + 60) {
      p.destroy();
      activeParticles.splice(i, 1);
    }
  }

  requestAnimationFrame(step);
}

step();

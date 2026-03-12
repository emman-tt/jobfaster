export const ResumeHtml = [
  {
    id: 1,
    content: ` <!DOCTYPE html>
<html>
<head>
    <title>Executive Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; background: #f8f8f8; padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 50px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
        .name { font-size: 36px; font-weight: bold; color: #2c3e50; letter-spacing: 2px; }
        .title { font-size: 18px; color: #7f8c8d; margin-top: 5px; }
        .contact { display: flex; justify-content: center; gap: 20px; margin-top: 15px; font-size: 14px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; font-weight: bold; }
        .company { font-size: 18px; color: #34495e; }
        .date { color: #7f8c8d; font-style: italic; }
        .job-title { font-size: 16px; color: #2c3e50; margin: 5px 0 10px; }
        .bullet { margin-left: 20px; margin-bottom: 5px; font-size: 14px; line-height: 1.5; }
        .two-col { display: flex; gap: 30px; }
        .col { flex: 1; }
        .skill-item { margin-bottom: 10px; }
        .skill-name { font-weight: bold; display: inline-block; width: 100px; }
        .skill-bar { height: 8px; width: 200px; background: #ecf0f1; display: inline-block; border-radius: 4px; }
        .skill-level { height: 8px; background: #3498db; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">MICHAEL REYNOLDS</div>
            <div class="title">CHIEF TECHNOLOGY OFFICER</div>
            <div class="contact">
                <span>m.reynolds@email.com</span> • <span>(212) 555-0198</span> • <span>linkedin.com/in/mreynolds</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p style="font-size: 15px; line-height: 1.6;">Visionary technology executive with 15+ years of experience driving digital transformation and leading engineering teams of 100+. Proven track record of scaling products from $10M to $500M revenue. Expertise in cloud architecture, AI implementation, and strategic planning.</p>
        </div>

        <div class="section">
            <div class="section-title">Professional Experience</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="company">TECHNOLOGY SOLUTIONS INC.</span>
                    <span class="date">2019 - Present</span>
                </div>
                <div class="job-title">Chief Technology Officer</div>
                <div class="bullet">• Led engineering team of 120 across 5 countries, delivering 25+ major products annually</div>
                <div class="bullet">• Reduced infrastructure costs by 35% ($4.2M) through cloud optimization</div>
                <div class="bullet">• Spearheaded AI implementation increasing customer engagement by 48%</div>
                <div class="bullet">• Grew engineering department from 40 to 120 while maintaining 92% retention</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="company">INNOVATION LABS</span>
                    <span class="date">2015 - 2019</span>
                </div>
                <div class="job-title">Senior Director of Engineering</div>
                <div class="bullet">• Managed 8 development teams building SaaS platform serving 2M+ users</div>
                <div class="bullet">• Drove migration to microservices architecture improving uptime to 99.99%</div>
                <div class="bullet">• Increased development velocity by 60% through CI/CD implementation</div>
                <div class="bullet">• Budget responsibility of $15M with consistent under-budget delivery</div>
            </div>
        </div>

        <div class="two-col">
            <div class="col">
                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="job">
                        <div class="company">STANFORD UNIVERSITY</div>
                        <div class="job-title">MBA, Technology Management</div>
                        <div class="date">2013 - 2015</div>
                    </div>
                    <div class="job">
                        <div class="company">MASSACHUSETTS INSTITUTE OF TECHNOLOGY</div>
                        <div class="job-title">B.S. Computer Science, Magna Cum Laude</div>
                        <div class="date">2006 - 2010</div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <div class="section-title">Core Competencies</div>
                    <div class="skill-item">
                        <span class="skill-name">Strategic Planning</span>
                        <span class="skill-bar"><span class="skill-level" style="width: 95%"></span></span>
                    </div>
                    <div class="skill-item">
                        <span class="skill-name">Team Leadership</span>
                        <span class="skill-bar"><span class="skill-level" style="width: 98%"></span></span>
                    </div>
                    <div class="skill-item">
                        <span class="skill-name">Cloud Architecture</span>
                        <span class="skill-bar"><span class="skill-level" style="width: 90%"></span></span>
                    </div>
                    <div class="skill-item">
                        <span class="skill-name">AI/ML Strategy</span>
                        <span class="skill-bar"><span class="skill-level" style="width: 85%"></span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 2,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Modern Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #eef2f5; padding: 40px; }
        .resume { max-width: 850px; margin: 0 auto; background: white; display: flex; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .sidebar { width: 35%; background: #2c3e50; color: white; padding: 30px; }
        .main { width: 65%; padding: 30px; }
        .name { font-size: 32px; font-weight: 300; margin-bottom: 5px; }
        .name strong { font-weight: 600; }
        .title { font-size: 16px; color: #b0c4de; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #4a6782; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: 600; letter-spacing: 1px; margin-bottom: 15px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; }
        .sidebar .section-title { color: white; border-left-color: #f1c40f; }
        .contact-item { margin-bottom: 12px; font-size: 14px; opacity: 0.9; }
        .skill-tag { background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; display: inline-block; margin: 0 5px 8px 0; font-size: 13px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .company { font-weight: 600; font-size: 16px; }
        .date { color: #7f8c8d; font-size: 14px; }
        .position { font-weight: 500; color: #3498db; margin-bottom: 8px; }
        .bullet { font-size: 14px; line-height: 1.6; margin-left: 20px; margin-bottom: 5px; color: #4a4a4a; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="sidebar">
            <div class="name"><strong>SARAH</strong> CHEN</div>
            <div class="title">PRODUCT DESIGN LEADER</div>
            
            <div class="section">
                <div class="section-title">CONTACT</div>
                <div class="contact-item"> sarah.chen@email.com</div>
                <div class="contact-item"> (415) 555-0234</div>
                <div class="contact-item"> San Francisco, CA</div>
                <div class="contact-item"> portfol.io/sarahchen</div>
            </div>

            <div class="section">
                <div class="section-title">SKILLS</div>
                <div>
                    <span class="skill-tag">UX Strategy</span>
                    <span class="skill-tag">Product Design</span>
                    <span class="skill-tag">Design Systems</span>
                    <span class="skill-tag">User Research</span>
                    <span class="skill-tag">Figma</span>
                    <span class="skill-tag">Prototyping</span>
                    <span class="skill-tag">Team Leadership</span>
                    <span class="skill-tag">Agile</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">LANGUAGES</div>
                <div class="contact-item">English (Native)</div>
                <div class="contact-item">Mandarin (Fluent)</div>
                <div class="contact-item">Spanish (Conversational)</div>
            </div>
        </div>

        <div class="main">
            <div class="section">
                <div class="section-title">PROFILE</div>
                <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a;">Innovative Product Design Leader with 10+ years of experience creating intuitive digital experiences. Passionate about user-centered design and building high-performing design teams. Proven track record of shipping products used by millions.</p>
            </div>

            <div class="section">
                <div class="section-title">EXPERIENCE</div>
                
                <div class="job">
                    <div class="job-header">
                        <span class="company">DESIGN HUB</span>
                        <span class="date">2021 - Present</span>
                    </div>
                    <div class="position">Senior Product Design Lead</div>
                    <div class="bullet">• Lead design team of 12 across 3 product lines serving 5M+ monthly users</div>
                    <div class="bullet">• Redesigned core platform increasing user engagement by 65%</div>
                    <div class="bullet">• Established design system used by 25+ product teams</div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="company">CREATIVE STUDIO</span>
                        <span class="date">2017 - 2021</span>
                    </div>
                    <div class="position">UX Designer</div>
                    <div class="bullet">• Designed 20+ mobile apps with 4.8+ average store ratings</div>
                    <div class="bullet">• Conducted 100+ user interviews driving product improvements</div>
                    <div class="bullet">• Increased conversion rates by 35% through UX optimization</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">EDUCATION</div>
                <div class="job">
                    <div class="job-header">
                        <span class="company">RHODE ISLAND SCHOOL OF DESIGN</span>
                        <span class="date">2013 - 2017</span>
                    </div>
                    <div class="position">BFA in Graphic Design, Minor in Psychology</div>
                    <div class="bullet">• GPA: 3.9, Dean's List all semesters</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 3,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Minimalist Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica', Arial, sans-serif; background: #fafafa; padding: 40px; }
        .resume { max-width: 700px; margin: 0 auto; background: white; padding: 50px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .header { margin-bottom: 40px; }
        .name { font-size: 42px; font-weight: 300; margin-bottom: 5px; }
        .subhead { font-size: 20px; color: #666; font-weight: 300; margin-bottom: 20px; }
        .contact { display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #555; border-top: 1px solid #eee; padding-top: 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; color: #333; }
        .item { margin-bottom: 20px; }
        .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .item-title { font-weight: 500; font-size: 16px; }
        .item-sub { color: #666; font-size: 14px; margin-bottom: 8px; }
        .item-date { color: #999; font-size: 14px; }
        .desc { font-size: 14px; line-height: 1.6; color: #444; margin-left: 0; }
        .skill-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { background: #f5f5f5; padding: 5px 12px; border-radius: 3px; font-size: 13px; color: #333; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">DAVID KIM</div>
            <div class="subhead">Software Engineer & Technical Lead</div>
            <div class="contact">
                <span>david.kim@email.com</span>
                <span>206-555-0192</span>
                <span>Seattle, WA</span>
                <span>github.com/davidkim</span>
                <span>linkedin.com/in/davidkim</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Summary</div>
            <p class="desc">Results-driven software engineer with 8 years of experience building scalable web applications. Expertise in React, Node.js, and cloud architecture. Passionate about clean code, mentoring junior developers, and solving complex problems.</p>
        </div>

        <div class="section">
            <div class="section-title">Experience</div>
            
            <div class="item">
                <div class="item-header">
                    <span class="item-title">Senior Software Engineer</span>
                    <span class="item-date">2020 - Present</span>
                </div>
                <div class="item-sub">TechCorp • Seattle, WA</div>
                <div class="desc">• Led development of microservices architecture serving 2M+ daily users<br>• Reduced API response time by 65% through optimization<br>• Mentored 5 junior engineers, 3 promoted within 18 months<br>• Implemented CI/CD pipeline reducing deployment time by 80%</div>
            </div>

            <div class="item">
                <div class="item-header">
                    <span class="item-title">Full Stack Developer</span>
                    <span class="item-date">2017 - 2020</span>
                </div>
                <div class="item-sub">InnovateLabs • Remote</div>
                <div class="desc">• Built 10+ customer-facing applications using React/Node.js<br>• Increased test coverage from 45% to 92%<br>• Collaborated with product team to launch features used by 500K+ users<br>• Won "Innovator of the Year" award 2019</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Skills</div>
            <div class="skill-list">
                <span class="skill">JavaScript/TypeScript</span>
                <span class="skill">React</span>
                <span class="skill">Node.js</span>
                <span class="skill">Python</span>
                <span class="skill">AWS</span>
                <span class="skill">Docker</span>
                <span class="skill">MongoDB</span>
                <span class="skill">PostgreSQL</span>
                <span class="skill">GraphQL</span>
                <span class="skill">CI/CD</span>
                <span class="skill">Agile</span>
                <span class="skill">Team Leadership</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="item">
                <div class="item-header">
                    <span class="item-title">University of Washington</span>
                    <span class="item-date">2013 - 2017</span>
                </div>
                <div class="item-sub">B.S. Computer Science, GPA 3.8</div>
                <div class="desc">Dean's List 6 semesters, Teaching Assistant for Algorithms</div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 4,
    content: `
    <!DOCTYPE html>
<html>
<head>
    <title>Creative Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', 'Helvetica Neue', sans-serif; background: linear-gradient(135deg, #f5f0ff 0%, #f0f5ff 100%); padding: 40px; }
        .resume { max-width: 850px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); display: flex; }
        .sidebar { width: 40%; background: linear-gradient(145deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; }
        .main { width: 60%; padding: 30px; }
        .profile-img { width: 120px; height: 120px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; border: 4px solid white; display: flex; align-items: center; justify-content: center; font-size: 48px; }
        .name { font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 5px; }
        .title { text-align: center; font-size: 16px; opacity: 0.9; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .section-title { font-size: 18px; font-weight: 600; margin-bottom: 20px; position: relative; }
        .sidebar .section-title:after { content: ''; position: absolute; bottom: -8px; left: 0; width: 40px; height: 3px; background: #ffd166; border-radius: 2px; }
        .main .section-title { color: #333; }
        .main .section-title:after { content: ''; position: absolute; bottom: -8px; left: 0; width: 40px; height: 3px; background: #667eea; border-radius: 2px; }
        .contact-item { margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-size: 14px; }
        .skill-bar-container { margin-bottom: 15px; }
        .skill-label { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; }
        .skill-bar-bg { height: 8px; background: rgba(255,255,255,0.2); border-radius: 4px; overflow: hidden; }
        .skill-bar-fill { height: 100%; background: #ffd166; border-radius: 4px; }
        .project-card { background: #f8faff; border-radius: 12px; padding: 15px; margin-bottom: 15px; }
        .project-title { font-weight: 600; margin-bottom: 5px; color: #333; }
        .project-desc { font-size: 13px; color: #666; line-height: 1.5; }
        .tag { display: inline-block; background: #eef2ff; color: #667eea; padding: 4px 10px; border-radius: 20px; font-size: 11px; margin-right: 5px; margin-top: 8px; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="sidebar">
            <div class="profile-img"></div>
            <div class="name">MIA RODRIGUEZ</div>
            <div class="title">Creative Director • Brand Strategist</div>

            <div class="section-title">Contact</div>
            <div class="contact-item"> mia.r@creative.studio</div>
            <div class="contact-item"> 305-555-0187</div>
            <div class="contact-item"> Miami, FL</div>
            <div class="contact-item"> behance.net/miarod</div>

            <div class="section-title" style="margin-top: 30px;">Skills</div>
            <div class="skill-bar-container">
                <div class="skill-label"><span>Brand Strategy</span> <span>95%</span></div>
                <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 95%"></div></div>
            </div>
            <div class="skill-bar-container">
                <div class="skill-label"><span>Creative Direction</span> <span>90%</span></div>
                <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 90%"></div></div>
            </div>
            <div class="skill-bar-container">
                <div class="skill-label"><span>Adobe Creative Suite</span> <span>98%</span></div>
                <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 98%"></div></div>
            </div>
            <div class="skill-bar-container">
                <div class="skill-label"><span>UX/UI Design</span> <span>85%</span></div>
                <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 85%"></div></div>
            </div>
        </div>

        <div class="main">
            <div class="section-title">About</div>
            <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 25px;">Award-winning Creative Director with 12+ years of experience crafting brand identities for Fortune 500 companies and startups. Passionate about storytelling, design innovation, and building teams that create magic.</p>

            <div class="section-title">Featured Work</div>
            
            <div class="project-card">
                <div class="project-title">Nike "Future Force" Campaign</div>
                <div class="project-desc">Led creative strategy for global campaign reaching 50M+ viewers. Increased brand engagement by 85% and won 3 Cannes Lions awards.</div>
                <div><span class="tag">Brand Strategy</span><span class="tag">Campaign</span><span class="tag">Award-Winning</span></div>
            </div>

            <div class="project-card">
                <div class="project-title">Spotify "Sound Stories" Rebrand</div>
                <div class="project-desc">Directed complete visual identity overhaul across 15+ touchpoints. Resulted in 40% increase in user engagement and 25% boost in premium subscriptions.</div>
                <div><span class="tag">Rebrand</span><span class="tag">UI/UX</span><span class="tag">Identity</span></div>
            </div>

            <div class="project-card">
                <div class="project-title">Google Arts & Culture Lab</div>
                <div class="project-desc">Designed immersive digital experiences for cultural institutions. Featured in 3 major exhibitions and reached 2M+ users worldwide.</div>
                <div><span class="tag">Digital</span><span class="tag">Exhibition</span><span class="tag">Interactive</span></div>
            </div>

            <div class="section-title" style="margin-top: 20px;">Education</div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-weight: 600;">Pratt Institute</span>
                <span style="color: #666; font-size: 13px;">2009 - 2013</span>
            </div>
            <div style="font-size: 14px; color: #555;">BFA in Communication Design, Minor in Art History</div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 5,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Technical Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', 'SF Mono', monospace; background: #1e1e2e; padding: 40px; }
        .resume { max-width: 850px; margin: 0 auto; background: #ffffff; padding: 40px; border-left: 8px solid #0a9396; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .header { margin-bottom: 30px; }
        .name { font-size: 48px; font-weight: 700; color: #0a1128; letter-spacing: -1px; }
        .badge { display: inline-block; background: #0a9396; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: normal; margin-left: 10px; vertical-align: middle; }
        .contact-bar { display: flex; flex-wrap: wrap; gap: 25px; background: #f0f4f8; padding: 15px; margin: 20px 0; border-radius: 6px; font-size: 14px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; font-weight: 700; color: #0a1128; border-bottom: 3px solid #0a9396; padding-bottom: 5px; margin-bottom: 15px; font-family: 'Inter', sans-serif; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .tech-tag { display: inline-block; background: #e9ecef; padding: 5px 12px; border-radius: 4px; font-size: 13px; margin: 0 5px 8px 0; font-family: 'Inter', sans-serif; }
        .project { margin-bottom: 20px; }
        .project-name { font-weight: 700; font-size: 16px; color: #0a9396; }
        .project-stack { font-size: 12px; color: #6c757d; margin-bottom: 5px; }
        .project-desc { font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
        .metrics { display: flex; gap: 20px; margin-top: 10px; }
        .metric { background: #f0f4f8; padding: 5px 12px; border-radius: 4px; font-size: 13px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; }
        .job-title { font-weight: 700; font-size: 18px; }
        .job-company { color: #0a9396; font-weight: 500; }
        .job-date { color: #6c757d; font-size: 14px; }
        .job-desc { margin-top: 8px; font-size: 14px; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">ALEX MERCER <span class="badge">Full Stack Architect</span></div>
            <div class="contact-bar">
                <span> alex.mercer@tech.dev</span>
                <span> 415-555-0199</span>
                <span> github.com/alexmercer</span>
                <span> linkedin.com/in/alexmercer</span>
                <span> Austin, TX</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">TECHNICAL SUMMARY</div>
            <p style="font-size: 15px; line-height: 1.6;">Full Stack Architect with 10+ years building scalable distributed systems. Expert in cloud-native architectures, microservices, and high-performance computing. 5 patents in distributed systems. Open source contributor to Kubernetes and TensorFlow.</p>
        </div>

        <div class="grid-2">
            <div>
                <div class="section">
                    <div class="section-title">TECH STACK</div>
                    <div>
                        <span class="tech-tag">Go</span>
                        <span class="tech-tag">Rust</span>
                        <span class="tech-tag">TypeScript</span>
                        <span class="tech-tag">Python</span>
                        <span class="tech-tag">Kubernetes</span>
                        <span class="tech-tag">Docker</span>
                        <span class="tech-tag">AWS</span>
                        <span class="tech-tag">GCP</span>
                        <span class="tech-tag">Terraform</span>
                        <span class="tech-tag">Kafka</span>
                        <span class="tech-tag">PostgreSQL</span>
                        <span class="tech-tag">MongoDB</span>
                        <span class="tech-tag">Redis</span>
                        <span class="tech-tag">GraphQL</span>
                        <span class="tech-tag">gRPC</span>
                        <span class="tech-tag">React</span>
                        <span class="tech-tag">Next.js</span>
                        <span class="tech-tag">Node.js</span>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">CERTIFICATIONS</div>
                    <div>• AWS Solutions Architect Professional</div>
                    <div>• Certified Kubernetes Administrator</div>
                    <div>• Google Cloud Professional Architect</div>
                    <div>• Terraform Associate</div>
                </div>
            </div>

            <div>
                <div class="section">
                    <div class="section-title">KEY METRICS</div>
                    <div class="metrics">
                        <div class="metric"> 99.99% Uptime</div>
                        <div class="metric"> 2M+ Req/sec</div>
                        <div class="metric"> 50+ Microservices</div>
                    </div>
                    <div class="metrics" style="margin-top: 10px;">
                        <div class="metric"> $5M Cost Saved</div>
                        <div class="metric"> 80% Faster Deploy</div>
                        <div class="metric"> 40 Engineers Mentored</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">EXPERIENCE</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="job-title">Principal Architect</span>
                    <span class="job`
  }
]

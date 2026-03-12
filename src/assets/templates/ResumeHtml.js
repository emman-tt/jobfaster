export const ResumeHtml = [
  {
    id: 1,
    content: ` <!DOCTYPE html>
<html>
<head>
    <title>Executive Resume Template</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto;  padding: 50px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
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
    <title>Corporate Attorney Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Garamond', 'Times New Roman', serif;  padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 50px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border: 0px solid #d4d4d4; }
        .header { margin-bottom: 30px; border-bottom: 1px solid #b0b0b0; padding-bottom: 20px; }
        .name { font-size: 42px; font-weight: normal; color: #1e2a3a; letter-spacing: 1px; }
        .subhead { font-size: 20px; color: #4a5568; font-style: italic; margin-top: 5px; }
        .contact-row { display: flex; flex-wrap: wrap; gap: 25px; margin-top: 15px; font-size: 15px; color: #2d3748; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 22px; font-weight: 500; color: #1e2a3a; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px; margin-bottom: 15px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; }
        .firm { font-weight: 600; font-size: 18px; color: #1e2a3a; }
        .date { color: #718096; font-style: italic; }
        .position { font-weight: 500; font-size: 16px; color: #2c5282; margin: 5px 0 10px; }
        .bullet { margin-left: 20px; margin-bottom: 8px; font-size: 15px; line-height: 1.5; color: #2d3748; }
        .case-list { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
        .case-tag { background: #edf2f7; padding: 4px 12px; border-radius: 2px; font-size: 13px; color: #2d3748; }
        .publication { margin-bottom: 10px; font-style: italic; color: #4a5568; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">ELIZABETH C. REYNOLDS</div>
            <div class="subhead">Corporate Attorney • Mergers & Acquisitions</div>
            <div class="contact-row">
                <span>ereynolds@lawpractice.com</span>
                <span>(312) 555-0193</span>
                <span>Chicago, IL</span>
                <span>Admitted: Illinois, New York</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Profile</div>
            <p style="font-size: 15px; line-height: 1.6; color: #2d3748;">Experienced corporate attorney with 12+ years in M&A, securities law, and corporate governance at top-tier international law firms. Advised on transactions valued at over $5B. Recognized by Chambers USA for Corporate/M&A (2022-2024).</p>
        </div>

        <div class="section">
            <div class="section-title">Experience</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="firm">SKADDEN, ARPS, SLATE, MEAGHER & FLOM LLP</span>
                    <span class="date">2018 - Present</span>
                </div>
                <div class="position">Partner, Corporate Department</div>
                <div class="bullet">• Lead counsel on 25+ M&A transactions with aggregate value exceeding $3.2B</div>
                <div class="bullet">• Advise public companies on SEC compliance, corporate governance, and disclosure obligations</div>
                <div class="bullet">• Manage team of 8 associates and 3 paralegals across multiple deal teams</div>
                <div class="bullet">• Spearheaded expansion of technology M&A practice, increasing deal flow by 40%</div>
                <div class="case-list">
                    <span class="case-tag">$450M Tech Acquisition</span>
                    <span class="case-tag">$275M PE Investment</span>
                    <span class="case-tag">IPO Readiness</span>
                </div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="firm">KIRKLAND & ELLIS LLP</span>
                    <span class="date">2014 - 2018</span>
                </div>
                <div class="position">Associate, Mergers & Acquisitions</div>
                <div class="bullet">• Represented private equity sponsors and portfolio companies in buy-side and sell-side transactions</div>
                <div class="bullet">• Drafted and negotiated transaction documents including purchase agreements and disclosure schedules</div>
                <div class="bullet">• Conducted due diligence for 30+ transactions across healthcare, technology, and manufacturing sectors</div>
                <div class="bullet">• Recognized as "Rising Star" by Illinois Super Lawyers (2017)</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="firm">SULLIVAN & CROMWELL LLP</span>
                    <span class="date">2012 - 2014</span>
                </div>
                <div class="position">Summer Associate → Associate</div>
                <div class="bullet">• Supported senior partners on cross-border M&A and securities offerings</div>
                <div class="bullet">• Prepared fairness opinions and board materials for major corporate transactions</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="job">
                <div class="job-header">
                    <span class="firm">HARVARD LAW SCHOOL</span>
                    <span class="date">2009 - 2012</span>
                </div>
                <div class="position">Juris Doctor, cum laude</div>
                <div class="bullet">• Harvard Law Review, Executive Editor</div>
                <div class="bullet">• Dean's Scholar Prize in Corporations, Securities Regulation</div>
            </div>
            <div class="job">
                <div class="job-header">
                    <span class="firm">YALE UNIVERSITY</span>
                    <span class="date">2005 - 2009</span>
                </div>
                <div class="position">Bachelor of Arts, Political Science, magna cum laude</div>
                <div class="bullet">• Phi Beta Kappa, Distinction in Major</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Publications & Speaking</div>
            <div class="publication">• "Navigating SPAC Transactions in Volatile Markets," Harvard Law School Forum on Corporate Governance (2023)</div>
            <div class="publication">• Panelist, "M&A Trends in Technology," American Bar Association Annual Meeting (2022)</div>
            <div class="publication">• Co-Author, "Due Diligence in Cross-Border Transactions," Bloomberg Law (2021)</div>
        </div>

        <div class="section">
            <div class="section-title">Bar Admissions & Affiliations</div>
            <div class="bullet">• Illinois State Bar (2012)</div>
            <div class="bullet">• New York State Bar (2013)</div>
            <div class="bullet">• American Bar Association, Mergers & Acquisitions Committee</div>
            <div class="bullet">• Chicago Bar Association, Corporate Law Section (Co-Chair 2023-Present)</div>
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
        body { font-family: 'Helvetica', Arial, sans-serif;  padding: 40px; }
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
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Executive Classic Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', Times, serif;  padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 50px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
        .name { font-size: 36px; font-weight: bold; color: #1a1a1a; letter-spacing: 1px; text-transform: uppercase; }
        .title { font-size: 18px; color: #4a4a4a; margin-top: 5px; font-style: italic; }
        .contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-top: 15px; font-size: 14px; color: #2c3e50; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; font-weight: bold; color: #1a1a1a; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; }
        .company { font-weight: bold; font-size: 18px; color: #1a1a1a; }
        .date { color: #4a4a4a; font-style: italic; }
        .position { font-weight: 500; font-size: 16px; color: #2c3e50; margin: 5px 0 10px; }
        .bullet { margin-left: 20px; margin-bottom: 8px; font-size: 15px; line-height: 1.5; color: #333; }
        .education-item { margin-bottom: 15px; }
        .school { font-weight: bold; font-size: 17px; }
        .degree { color: #4a4a4a; margin: 3px 0; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
        .skill-item { background: #f5f5f5; padding: 5px 15px; border-radius: 3px; font-size: 14px; color: #333; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">JAMES A. THOMPSON</div>
            <div class="title">Chief Financial Officer</div>
            <div class="contact">
                <span>james.thompson@email.com</span> • <span>(212) 555-0147</span> • <span>New York, NY</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Summary</div>
            <p style="font-size: 15px; line-height: 1.6; color: #333;">Results-oriented financial executive with 18+ years of experience in corporate finance, strategic planning, and mergers & acquisitions. Proven track record of driving revenue growth, optimizing costs, and leading cross-functional teams at Fortune 500 companies.</p>
        </div>

        <div class="section">
            <div class="section-title">Professional Experience</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="company">GLOBAL FINANCIAL PARTNERS</span>
                    <span class="date">2018 - Present</span>
                </div>
                <div class="position">Chief Financial Officer</div>
                <div class="bullet">• Led financial strategy for $2.5B asset management firm with 400+ employees</div>
                <div class="bullet">• Reduced operational costs by 22% ($18M annually) through process optimization</div>
                <div class="bullet">• Secured $150M in new capital through investor relations and strategic partnerships</div>
                <div class="bullet">• Managed due diligence for 5 acquisitions totaling $320M in value</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="company">MERRILL LYNCH</span>
                    <span class="date">2012 - 2018</span>
                </div>
                <div class="position">Senior Vice President, Corporate Finance</div>
                <div class="bullet">• Directed team of 25 financial analysts serving 150+ corporate clients</div>
                <div class="bullet">• Increased department revenue by 35% over 3 years ($42M to $57M)</div>
                <div class="bullet">• Led 15 successful M&A transactions valued at $1.2B total</div>
                <div class="bullet">• Developed financial models adopted firm-wide for risk assessment</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="company">GOLDMAN SACHS</span>
                    <span class="date">2006 - 2012</span>
                </div>
                <div class="position">Investment Banking Associate</div>
                <div class="bullet">• Executed 20+ transactions in technology and healthcare sectors</div>
                <div class="bullet">• Performed complex financial modeling and valuation analysis</div>
                <div class="bullet">• Promoted twice in 6 years based on performance and client feedback</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="education-item">
                <div class="school">UNIVERSITY OF PENNSYLVANIA - WHARTON SCHOOL</div>
                <div class="degree">Master of Business Administration, Finance (GPA: 3.9)</div>
                <div style="color: #666; font-size: 14px;">2004 - 2006</div>
            </div>
            <div class="education-item">
                <div class="school">PRINCETON UNIVERSITY</div>
                <div class="degree">Bachelor of Arts, Economics, cum laude</div>
                <div style="color: #666; font-size: 14px;">2000 - 2004</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Certifications & Affiliations</div>
            <div class="bullet">• Certified Public Accountant (CPA), New York State</div>
            <div class="bullet">• Chartered Financial Analyst (CFA) Charterholder</div>
            <div class="bullet">• Member, American Institute of CPAs</div>
            <div class="bullet">• Board Member, Financial Executives International</div>
        </div>

        <div class="section">
            <div class="section-title">Core Competencies</div>
            <div class="skills">
                <span class="skill-item">Financial Strategy</span>
                <span class="skill-item">Mergers & Acquisitions</span>
                <span class="skill-item">Risk Management</span>
                <span class="skill-item">Team Leadership</span>
                <span class="skill-item">Investor Relations</span>
                <span class="skill-item">Budget Planning</span>
                <span class="skill-item">Financial Modeling</span>
                <span class="skill-item">Strategic Planning</span>
            </div>
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
        body { font-family: 'Courier New', 'SF Mono', monospace; padding: 40px; }
        .resume { max-width: 850px; margin: 0 auto; background: #ffffff; padding: 40px; border-left: 8px solid #0a9396; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
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
  },
  {
    id: 6,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Business Professional Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Calibri', 'Helvetica', Arial, sans-serif; padding: 0px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 0px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0px; border-bottom: 2px solid #2c3e50; padding-bottom: 0px; }
        .name-title h1 { font-size: 36px; color: #2c3e50; margin-bottom: 5px; }
        .name-title h2 { font-size: 18px; color: #7f8c8d; font-weight: normal; }
        .contact { text-align: right; }
        .contact-item { margin-bottom: 5px; color: #34495e; font-size: 14px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; color: #2c3e50; border-left: 4px solid #3498db; padding-left: 10px; margin-bottom: 15px; font-weight: 600; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .company { font-weight: 600; font-size: 18px; color: #2c3e50; }
        .date { color: #7f8c8d; }
        .position { font-weight: 500; color: #2980b9; margin-bottom: 8px; }
        .bullet { margin-left: 20px; margin-bottom: 6px; font-size: 15px; line-height: 1.5; color: #34495e; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .skill-cat { margin-bottom: 15px; }
        .skill-cat-title { font-weight: 600; color: #2c3e50; margin-bottom: 8px; }
        .skill-items { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-pill { background: #ecf0f1; padding: 4px 12px; border-radius: 20px; font-size: 13px; color: #2c3e50; }
        .education-item { margin-bottom: 15px; }
        .school { font-weight: 600; color: #2c3e50; }
        .degree { color: #34495e; margin: 3px 0; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name-title">
                <h1>MICHAEL T. ANDERSON</h1>
                <h2>Senior Business Development Manager</h2>
            </div>
            <div class="contact">
                <div class="contact-item">michael.anderson@email.com</div>
                <div class="contact-item">(415) 555-0192</div>
                <div class="contact-item">San Francisco, CA</div>
                <div class="contact-item">linkedin.com/in/manderson</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Summary</div>
            <p style="font-size: 15px; line-height: 1.6; color: #34495e;">Strategic business development professional with 10+ years of experience driving revenue growth, building strategic partnerships, and expanding market presence in technology and SaaS sectors. Proven track record of exceeding quotas and developing high-performing teams.</p>
        </div>

        <div class="section">
            <div class="section-title">Professional Experience</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="company">SALESFORCE</span>
                    <span class="date">2020 - Present</span>
                </div>
                <div class="position">Senior Business Development Manager</div>
                <div class="bullet">• Grew enterprise division revenue by 45% ($12M to $17.4M) in 2 years</div>
                <div class="bullet">• Led team of 8 business development representatives across 3 regions</div>
                <div class="bullet">• Negotiated and closed 15+ strategic partnerships with Fortune 500 companies</div>
                <div class="bullet">• Developed sales training program that increased team productivity by 30%</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="company">ORACLE CORPORATION</span>
                    <span class="date">2016 - 2020</span>
                </div>
                <div class="position">Business Development Manager</div>
                <div class="bullet">• Consistently exceeded annual quotas by 120-150% for 4 consecutive years</div>
                <div class="bullet">• Expanded client portfolio from $3M to $7.5M in annual recurring revenue</div>
                <div class="bullet">• Led cross-functional teams to develop proposals for $1M+ opportunities</div>
                <div class="bullet">• Named "Top Performer" 2018, 2019</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="company">ADOBE INC.</span>
                    <span class="date">2013 - 2016</span>
                </div>
                <div class="position">Account Executive</div>
                <div class="bullet">• Managed portfolio of 50+ enterprise accounts in technology sector</div>
                <div class="bullet">• Increased territory revenue by 65% ($2.1M to $3.5M) in 2 years</div>
                <div class="bullet">• Achieved 100% customer retention rate through strategic account management</div>
            </div>
        </div>

        <div class="grid-2">
            <div>
                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="education-item">
                        <div class="school">UNIVERSITY OF CALIFORNIA, BERKELEY</div>
                        <div class="degree">MBA, Marketing & Strategy</div>
                        <div style="color: #7f8c8d; font-size: 14px;">2011 - 2013</div>
                    </div>
                    <div class="education-item">
                        <div class="school">UNIVERSITY OF WASHINGTON</div>
                        <div class="degree">B.A. Business Administration</div>
                        <div style="color: #7f8c8d; font-size: 14px;">2007 - 2011</div>
                        <div>GPA: 3.8, Dean's List 6 semesters</div>
                    </div>
                </div>
            </div>
            <div>
                <div class="section">
                    <div class="section-title">Certifications</div>
                    <div class="bullet">• Certified Sales Executive (CSE)</div>
                    <div class="bullet">• Strategic Negotiation, Harvard Law School</div>
                    <div class="bullet">• Salesforce Certified Administrator</div>
                    <div class="bullet">• HubSpot Sales Software Certification</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Core Skills</div>
            <div class="skill-cat">
                <div class="skill-cat-title">Business Development</div>
                <div class="skill-items">
                    <span class="skill-pill">Strategic Partnerships</span>
                    <span class="skill-pill">Contract Negotiation</span>
                    <span class="skill-pill">Territory Management</span>
                    <span class="skill-pill">Pipeline Development</span>
                </div>
            </div>
            <div class="skill-cat">
                <div class="skill-cat-title">Leadership</div>
                <div class="skill-items">
                    <span class="skill-pill">Team Building</span>
                    <span class="skill-pill">Mentoring</span>
                    <span class="skill-pill">Performance Management</span>
                    <span class="skill-pill">Strategic Planning</span>
                </div>
            </div>
            <div class="skill-cat">
                <div class="skill-cat-title">Tools & Platforms</div>
                <div class="skill-items">
                    <span class="skill-pill">Salesforce</span>
                    <span class="skill-pill">HubSpot</span>
                    <span class="skill-pill">Tableau</span>
                    <span class="skill-pill">Microsoft Dynamics</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 7,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Healthcare Professional Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', 'Helvetica', sans-serif; padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 45px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-top: 5px solid #1a5276; }
        .header { margin-bottom: 30px; }
        .name { font-size: 38px; color: #1a5276; margin-bottom: 5px; }
        .credentials { font-size: 18px; color: #2874a6; font-weight: 500; margin-bottom: 10px; }
        .contact-row { display: flex; flex-wrap: wrap; gap: 25px; background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 15px; font-size: 15px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 20px; color: #1a5276; border-bottom: 2px solid #d4e6f1; padding-bottom: 5px; margin-bottom: 15px; font-weight: 600; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .institution { font-weight: 600; font-size: 18px; color: #1a5276; }
        .date { color: #5d6d7e; }
        .role { font-weight: 500; color: #2874a6; margin-bottom: 8px; }
        .bullet { margin-left: 20px; margin-bottom: 6px; font-size: 15px; line-height: 1.5; color: #2c3e50; }
        .publication-item { margin-bottom: 8px; font-size: 14px; font-style: italic; color: #34495e; }
        .license-badge { display: inline-block; background: #d4e6f1; padding: 4px 12px; border-radius: 4px; font-size: 13px; color: #1a5276; margin-right: 8px; margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">DR. PATRICIA M. WILSON</div>
            <div class="credentials">MD, MPH, FACP</div>
            <div class="contact-row">
                <span>p.wilson@medical.org</span>
                <span>(617) 555-0189</span>
                <span>Boston, MA</span>
                <span>NPI: 1234567890</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Summary</div>
            <p style="font-size: 15px; line-height: 1.6; color: #2c3e50;">Board-certified Internal Medicine physician with 15+ years of clinical experience in academic medical centers. Specialized in preventive care, chronic disease management, and medical education. Committed to evidence-based practice and improving patient outcomes through coordinated care.</p>
        </div>

        <div class="section">
            <div class="section-title">Medical Licensure & Certification</div>
            <div>
                <span class="license-badge">American Board of Internal Medicine</span>
                <span class="license-badge">Massachusetts Medical License</span>
                <span class="license-badge">DEA Registration</span>
                <span class="license-badge">BLS/ACLS Certified</span>
                <span class="license-badge">Fellow, American College of Physicians</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Clinical Experience</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="institution">MASSACHUSETTS GENERAL HOSPITAL</span>
                    <span class="date">2018 - Present</span>
                </div>
                <div class="role">Attending Physician, Department of Internal Medicine</div>
                <div class="bullet">• Provide primary care to panel of 1,200 patients with diverse medical conditions</div>
                <div class="bullet">• Supervise and teach 8-10 medical residents and 4-6 medical students annually</div>
                <div class="bullet">• Achieved 95% patient satisfaction score, top 10% in department</div>
                <div class="bullet">• Reduced hospital readmission rates by 18% through improved discharge planning</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="institution">BRIGHAM AND WOMEN'S HOSPITAL</span>
                    <span class="date">2013 - 2018</span>
                </div>
                <div class="role">Hospitalist, Internal Medicine</div>
                <div class="bullet">• Managed care for 15-20 inpatients daily with acute medical conditions</div>
                <div class="bullet">• Led quality improvement initiative reducing average length of stay by 1.5 days</div>
                <div class="bullet">• Received "Excellence in Teaching" award from medical residents (2016, 2017)</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="institution">BETH ISRAEL DEACONESS MEDICAL CENTER</span>
                    <span class="date">2010 - 2013</span>
                </div>
                <div class="role">Internal Medicine Residency</div>
                <div class="bullet">• Completed rigorous 3-year residency program with rotations in all subspecialties</div>
                <div class="bullet">• Served as Chief Resident (2012-2013), coordinating educational conferences</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">JOHNS HOPKINS UNIVERSITY SCHOOL OF MEDICINE</span>
                    <span class="date">2006 - 2010</span>
                </div>
                <div class="role">Doctor of Medicine</div>
                <div class="bullet">• Alpha Omega Alpha Honor Medical Society</div>
                <div class="bullet">• Research Distinction in Clinical Epidemiology</div>
            </div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">HARVARD T.H. CHAN SCHOOL OF PUBLIC HEALTH</span>
                    <span class="date">2014 - 2016</span>
                </div>
                <div class="role">Master of Public Health, Health Policy</div>
            </div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">DUKE UNIVERSITY</span>
                    <span class="date">2002 - 2006</span>
                </div>
                <div class="role">Bachelor of Science, Biology, summa cum laude</div>
                <div>GPA: 3.95, Phi Beta Kappa</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Publications & Presentations</div>
            <div class="publication-item">• Wilson P, et al. "Hypertension Management in Underserved Populations." Journal of General Internal Medicine, 2023; 38(4): 892-899.</div>
            <div class="publication-item">• "Preventive Care Strategies for Diabetic Patients." Grand Rounds Presentation, Massachusetts General Hospital, 2022.</div>
            <div class="publication-item">• Wilson P, Chen R. "Reducing Readmissions Through Transitional Care." NEJM Catalyst, 2021; 2(6).</div>
        </div>
    </div>
</body>
</html>`
  },
  {
    id: 8,
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Education Professional Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', 'Times New Roman', serif; background: #f5f5f5; padding: 40px; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 45px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .name { font-size: 40px; color: #2c3e50; margin-bottom: 5px; }
        .title { font-size: 20px; color: #5d6d7e; margin-bottom: 15px; font-style: italic; }
        .contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; font-size: 15px; color: #2c3e50; border-top: 1px solid #bdc3c7; border-bottom: 1px solid #bdc3c7; padding: 15px 0; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 22px; color: #2c3e50; text-align: center; border-bottom: 1px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
        .job { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; }
        .institution { font-weight: 600; font-size: 18px; color: #2c3e50; }
        .date { color: #7f8c8d; font-style: italic; }
        .position { font-weight: 500; font-size: 16px; color: #16a085; margin: 5px 0 8px; }
        .bullet { margin-left: 20px; margin-bottom: 6px; font-size: 15px; line-height: 1.5; color: #34495e; }
        .publication-item { margin-bottom: 8px; font-size: 14px; margin-left: 20px; color: #34495e; }
        .award-item { margin-bottom: 8px; font-size: 14px; color: #16a085; }
        .committee-item { display: inline-block; background: #ecf0f1; padding: 4px 12px; border-radius: 3px; font-size: 13px; margin: 0 5px 8px 0; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">DR. ROBERT J. HARRISON</div>
            <div class="title">Professor of History • Department Chair</div>
            <div class="contact">
                <span>r.harrison@university.edu</span>
                <span>(434) 555-0176</span>
                <span>Charlottesville, VA</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Academic Appointments</div>
            
            <div class="job">
                <div class="job-header">
                    <span class="institution">UNIVERSITY OF VIRGINIA</span>
                    <span class="date">2018 - Present</span>
                </div>
                <div class="position">Professor of History (with tenure)</div>
                <div class="bullet">• Department Chair, 2021-Present: Lead department of 25 faculty and 120 graduate students</div>
                <div class="bullet">• Teach undergraduate and graduate courses in 19th Century American History</div>
                <div class="bullet">• Advise 8-10 PhD candidates annually; 5 completed dissertations under supervision</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="institution">UNIVERSITY OF NORTH CAROLINA AT CHAPEL HILL</span>
                    <span class="date">2012 - 2018</span>
                </div>
                <div class="position">Associate Professor of History</div>
                <div class="bullet">• Promoted with tenure in 2016 based on research and teaching excellence</div>
                <div class="bullet">• Developed 5 new courses on American South and Reconstruction era</div>
                <div class="bullet">• Served on University Curriculum Committee, revising general education requirements</div>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="institution">YALE UNIVERSITY</span>
                    <span class="date">2008 - 2012</span>
                </div>
                <div class="position">Assistant Professor of History</div>
                <div class="bullet">• Initiated research program on post-Civil War economic development</div>
                <div class="bullet">• Received Yale Teaching Award (2011) for outstanding undergraduate instruction</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Education</div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">HARVARD UNIVERSITY</span>
                    <span class="date">2003 - 2008</span>
                </div>
                <div class="position">Ph.D. in History</div>
                <div class="bullet">• Dissertation: "Reconstruction's Legacy: Economic Transformation in the Post-Civil War South"</div>
                <div class="bullet">• Committee: Drew Gilpin Faust (Chair), John Stauffer, Walter Johnson</div>
            </div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">OXFORD UNIVERSITY</span>
                    <span class="date">2001 - 2003</span>
                </div>
                <div class="position">M.Phil. in American History (Rhodes Scholar)</div>
            </div>
            <div class="job">
                <div class="job-header">
                    <span class="institution">PRINCETON UNIVERSITY</span>
                    <span class="date">1997 - 2001</span>
                </div>
                <div class="position">A.B. in History, summa cum laude</div>
                <div>Phi Beta Kappa, Class of 1901 Scholar</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Publications</div>
            <div style="font-weight: 600; margin: 10px 0 5px;">Books</div>
            <div class="publication-item">• Harrison, R.J. "The Unfinished Revolution: Economic Change in the Reconstruction South." Oxford University Press, 2019. (368 pp.)</div>
            <div class="publication-item">• Harrison, R.J. "Forgotten Founders: Black Legislators During Reconstruction." Cambridge University Press, 2013. (Winner, Frederick Jackson Turner Award)</div>
            
            <div style="font-weight: 600; margin: 15px 0 5px;">Selected Articles</div>
            <div class="publication-item">• "Railroads and Reconstruction: Infrastructure Development in the Post-Civil War South." Journal of American History, 108(3), 2022: 445-468.</div>
            <div class="publication-item">• "Freedmen's Banks and Black Economic Independence." Civil War History, 67(2), 2021: 112-139.</div>
            <div class="publication-item">• "The Politics of Memory: How Reconstruction is Remembered." American Historical Review, 125(4), 2020: 1202-1228.</div>
        </div>

        <div class="section">
            <div class="section-title">Grants & Fellowships</div>
            <div class="bullet">• National Endowment for the Humanities Fellowship, 2020-2021 ($60,000)</div>
            <div class="bullet">• American Council of Learned Societies Grant, 2017 ($45,000)</div>
            <div class="bullet">• Mellon Foundation New Directions Fellowship, 2014 ($85,000)</div>
        </div>

        <div class="section">
            <div class="section-title">Service & Committees</div>
            <div>
                <span class="committee-item">Chair, Dept. Hiring Committee</span>
                <span class="committee-item">University Promotion & Tenure Committee</span>
                <span class="committee-item">Editorial Board, Journal of Southern History</span>
                <span class="committee-item">American Historical Association, Program Committee</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Awards & Honors</div>
            <div class="award-item">• Distinguished Teaching Award, University of Virginia (2022)</div>
            <div class="award-item">• Merle Curti Award in American Social History (2014)</div>
            <div class="award-item">• Allan Nevins Dissertation Prize (2009)</div>
        </div>
    </div>
</body>
</html>`
  }
]

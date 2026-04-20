import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 12,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  jobTitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8
  },
  contact: {
    fontSize: 10,
    color: '#666'
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 16,
    color: '#333'
  },
  sectionTitleLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2
  },
  position: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 2
  },
  date: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 6
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
    marginBottom: 4
  },
  bulletPoint: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
    marginBottom: 2,
    paddingLeft: 10
  },
  skillCategory: {
    fontSize: 10,
    marginBottom: 4
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    width: '48%'
  }
})

export function ResumePDF ({ data }) {
  const {
    name,
    email,
    phone,
    location,
    jobTitle,
    linkedin,
    summary,
    experience = [],
    education = [],
    skills = [],
    languages = [],
    projects = [],
    certificates = [],
    achievements = []
  } = data || {}

  const formatDate = year => {
    if (!year) return 'Present'
    return year
  }

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          <Text style={styles.contact}>
            {[location, phone, email].filter(Boolean).join(' | ')}
          </Text>
          {linkedin && (
            <Text style={styles.contact}>LinkedIn: {linkedin}</Text>
          )}
        </View>

        {summary && summary.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.bodyText}>{summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.sectionTitleLine} />
            {experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.position}>{exp.position}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startYear)} - {formatDate(exp.endYear)}
                  {exp.location && ` | ${exp.location}`}
                </Text>
                {exp.accomplishments?.map((acc, i) => (
                  <Text key={i} style={styles.bulletPoint}>
                    • {acc}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.sectionTitleLine} />
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.company}>{edu.school}</Text>
                <Text style={styles.position}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </Text>
                <Text style={styles.date}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear)}
                </Text>
                {edu.highlights?.map((h, i) => (
                  <Text key={i} style={styles.bulletPoint}>
                    • {h}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.sectionTitleLine} />
            <Text style={styles.bodyText}>{skills.join(', ')}</Text>
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.sectionTitleLine} />
            {projects.map((proj, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.company}>{proj.name}</Text>
                {proj.description && (
                  <Text style={styles.bodyText}>{proj.description}</Text>
                )}
                {proj.techStack?.length > 0 && (
                  <Text style={styles.date}>Tech: {proj.techStack.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {certificates.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.sectionTitleLine} />
            {certificates.map((cert, index) => (
              <Text key={index} style={styles.bodyText}>
                {cert.name}
                {cert.issuer && ` - ${cert.issuer}`}
                {cert.year && ` (${cert.year})`}
              </Text>
            ))}
          </View>
        )}

        {achievements.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.sectionTitleLine} />
            {achievements.map((ach, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {ach}
              </Text>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.sectionTitleLine} />
            {languages.map((lang, index) => (
              <Text key={index} style={styles.bodyText}>
                {lang.name}
                {lang.proficiency && ` - ${lang.proficiency}`}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
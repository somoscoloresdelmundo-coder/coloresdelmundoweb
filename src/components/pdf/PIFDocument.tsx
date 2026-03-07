'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { CONTACT, SOCIAL, INSTITUTIONAL } from '@/config/constants';

// Colores institucionales
const colors = {
  primary: '#F29A2E',
  azul: '#4B89BF',
  lima: '#B1BF41',
  terracota: '#D94423',
  headerBg: '#F29A2E',
  headerText: '#FFFFFF',
  sectionBg: '#FEF5EE',
  text: '#333333',
  lightGray: '#F8F8F8',
  border: '#E8E8E8',
  labelBg: '#F5F5F5',
};

// Estilos compactos - optimizados para menos espacio en blanco
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: colors.text,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.headerBg,
    borderRadius: 4,
  },
  headerTitle: {
    color: colors.headerText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.headerText,
    fontSize: 9,
    marginTop: 2,
  },
  headerOID: {
    alignItems: 'flex-end',
  },
  headerOIDLabel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
  },
  headerOIDValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.headerText,
  },
  // Tables
  table: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 14,
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 14,
  },
  sectionHeader: {
    backgroundColor: colors.sectionBg,
    padding: 4,
    marginBottom: 5,
    marginTop: 2,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  sectionHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
  },
  tableLabelCell: {
    width: '32%',
    padding: 3,
    backgroundColor: colors.labelBg,
    justifyContent: 'center',
  },
  tableValueCell: {
    width: '68%',
    padding: 3,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#666666',
  },
  valueText: {
    fontSize: 7,
  },
  // Sections de texto
  section: {
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 2,
  },
  sectionContent: {
    fontSize: 7.5,
    lineHeight: 1.35,
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 4,
  },
  quote: {
    marginTop: 4,
    paddingLeft: 6,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
    fontStyle: 'italic',
  },
  // Two columns
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 6,
    color: '#888888',
  },
  // Color bar
  colorBar: {
    flexDirection: 'row',
    height: 3,
    marginBottom: 10,
    borderRadius: 2,
    overflow: 'hidden',
  },
  colorBarSegment: {
    flex: 1,
  },
});

// Componente de fila de tabla
const TableRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
  <View style={isLast ? styles.tableRowLast : styles.tableRow}>
    <View style={styles.tableLabelCell}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <View style={styles.tableValueCell}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </View>
);

// Componente de encabezado de sección
const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

// Barra de colores
const ColorBar = () => (
  <View style={styles.colorBar}>
    <View style={[styles.colorBarSegment, { backgroundColor: colors.azul }]} />
    <View style={[styles.colorBarSegment, { backgroundColor: colors.lima }]} />
    <View style={[styles.colorBarSegment, { backgroundColor: colors.primary }]} />
    <View style={[styles.colorBarSegment, { backgroundColor: colors.terracota }]} />
  </View>
);

// Documento PIF
const PIFDocument = () => (
  <Document
    title="Partner Information Form - Colores del Mundo"
    author="Asociación Cultural Colores del Mundo"
    subject="Erasmus+ Partner Information Form"
    keywords="Erasmus+, PIF, NGO, Youth, Spain"
  >
    {/* Página 1 - Información de la Organización */}
    <Page size="A4" style={styles.page}>
      <ColorBar />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PARTNER INFORMATION FORM</Text>
          <Text style={styles.headerSubtitle}>ASOCIACIÓN CULTURAL COLORES DEL MUNDO</Text>
        </View>
        <View style={styles.headerOID}>
          <Text style={styles.headerOIDLabel}>OID</Text>
          <Text style={styles.headerOIDValue}>{INSTITUTIONAL.OID}</Text>
        </View>
      </View>

      {/* Información de la Organización */}
      <View style={styles.table}>
        <TableRow label="OID" value={INSTITUTIONAL.OID} />
        <TableRow label="Type of organization" value="NGO" />
        <TableRow label="Legal name" value="Asociación Cultural Colores del Mundo" />
        <TableRow label="Short name" value="Colores del Mundo" />
        <TableRow label="Address" value="Paseo Rosa de los Vientos 39" />
        <TableRow label="Country" value="Spain" />
        <TableRow label="Region" value="Comunidad Valenciana" />
        <TableRow label="Post code" value="46730" />
        <TableRow label="City" value="Gandía - Grau y Playa" />
        <TableRow label="Website" value={SOCIAL.FACEBOOK_URL.replace('https://www.', '')} />
        <TableRow label="E-mail" value={CONTACT.EMAIL} isLast />
      </View>

      {/* Contact Person y Legal Representative en dos columnas */}
      <View style={styles.twoColumns}>
        <View style={styles.column}>
          <SectionHeader title="Contact Person" />
          <View style={styles.table}>
            <TableRow label="Name" value="Eliana Colzani" />
            <TableRow label="Department" value="Communication" />
            <TableRow label="Role" value="Secretary" />
            <TableRow label="Email" value={CONTACT.EMAIL} />
            <TableRow label="Phone" value="+39 3337943172" isLast />
          </View>
        </View>
        <View style={styles.column}>
          <SectionHeader title="Legal Representative" />
          <View style={styles.table}>
            <TableRow label="Name" value="Fernando Licona-Romano R." />
            <TableRow label="Department" value="Youth Department" />
            <TableRow label="Role" value="President" />
            <TableRow label="Email" value={CONTACT.EMAIL} />
            <TableRow label="Phone" value="+34 622 21 75 46" isLast />
          </View>
        </View>
      </View>

      {/* Presentación breve */}
      <View style={[styles.section, { marginTop: 6 }]}>
        <Text style={styles.sectionTitle}>Organisation Profile</Text>
        <Text style={[styles.sectionContent, styles.paragraph]}>
          Asociación Cultural Colores del Mundo is a youth association founded by young people motivated to improve the quality of life of other young people. Based in Gandía, Valencia, we believe in the power of art and non-formal education as engines of inclusion, wellbeing and transformation. Our mission is to accompany young people through their process of personal growth, ensuring a safe environment and opening new opportunities for leadership, expression and cultural connection. We focus on participation in European Erasmus+ programs, designing and implementing projects that contribute to European Union priorities in education, training, youth, and community development.
        </Text>
      </View>

      {/* Main Lines of Action */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Lines of Action</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '48%' }}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.azul, marginRight: 3 }} />
            <Text style={{ fontSize: 7.5 }}>Mobility Accompaniment</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '48%' }}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.terracota, marginRight: 3 }} />
            <Text style={{ fontSize: 7.5 }}>Artistic Transformation Labs</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '48%' }}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.lima, marginRight: 3 }} />
            <Text style={{ fontSize: 7.5 }}>Alternative Education</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '48%' }}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: colors.primary, marginRight: 3 }} />
            <Text style={{ fontSize: 7.5 }}>Conscious Digital Citizenship</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{`Colores del Mundo | ${CONTACT.EMAIL}`}</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </View>
    </Page>

    {/* Página 2 - Descripción y Experiencia */}
    <Page size="A4" style={styles.page}>
      <ColorBar />

      {/* Descripción completa */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Organisation Description</Text>
        <Text style={[styles.sectionContent, styles.paragraph]}>
          We pay special attention to young people facing barriers to participation: those from migrant backgrounds navigating cultural integration, youth from disadvantaged socioeconomic situations, and young people in rural or peripheral areas with limited access to international opportunities. Our vision is to become a reference organization in European youth and culture projects, connecting young people and organizations through Erasmus+ and other EU programs, contributing to the strengthening of European identity, active citizenship, and sustainable community development.
        </Text>
        <View style={styles.quote}>
          <Text style={styles.sectionContent}>
            "Our projects aim to transform young people from passive spectators into agents of change in their communities, using art as a universal language that transcends the linguistic barriers of migration."
          </Text>
        </View>
      </View>

      {/* Activities and Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activities and Experience</Text>
        <Text style={[styles.sectionContent, styles.paragraph]}>
          Our organization works to promote the social and cultural development of young people and vulnerable communities through art, culture, and technological innovation. Since our establishment, we have been actively building our capacity and network, connecting with partner organizations across Europe, participating in partner-finding activities through SALTO-Youth platforms, and developing our first Erasmus+ applications. As an organization, we are starting this year to develop and create our first projects. Despite this, all the members have been involved as participants, facilitators and coordinators in several projects across Europe and Latin America for more than 5 years.
        </Text>
      </View>

      {/* Skills and Expertise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills and Expertise of Key Staff</Text>
        <Text style={[styles.sectionContent, styles.paragraph]}>
          Our team brings together different skills and backgrounds that complement each other naturally. Some of us have experience coordinating international projects and know how to navigate the administrative side of European programs. Others specialize in facilitation and mentoring—we love working with groups, creating spaces where young people feel safe to open up, share their stories, and discover new things about themselves. All of us come from creative backgrounds - writing, visual arts, theater, creative coaching - and have organized artistic workshops and cultural events from scratch. We also count with expertise in digital tools and communication, helping us reach young people and support them in a conscious use of new technologies. Our own experiences of change and adaptation allow us to connect authentically with the young people we accompany.
        </Text>
      </View>

      {/* Experience and Target Groups in two columns */}
      <View style={[styles.twoColumns, { marginTop: 4 }]}>
        <View style={styles.column}>
          <SectionHeader title="Erasmus+ Experience" />
          <View style={{ marginTop: 2 }}>
            <Text style={{ fontSize: 7, marginBottom: 1 }}>• Youth Exchanges (participants & facilitators)</Text>
            <Text style={{ fontSize: 7, marginBottom: 1 }}>• Training Courses</Text>
            <Text style={{ fontSize: 7 }}>• ESC Volunteering projects</Text>
          </View>
        </View>
        <View style={styles.column}>
          <SectionHeader title="Target Groups" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 2 }}>
            <Text style={{ fontSize: 7, backgroundColor: colors.lightGray, padding: 3, borderRadius: 2 }}>Young people (18-30)</Text>
            <Text style={{ fontSize: 7, backgroundColor: colors.lightGray, padding: 3, borderRadius: 2 }}>Disadvantaged youth</Text>
            <Text style={{ fontSize: 7, backgroundColor: colors.lightGray, padding: 3, borderRadius: 2 }}>Rural communities</Text>
            <Text style={{ fontSize: 7, backgroundColor: colors.lightGray, padding: 3, borderRadius: 2 }}>Youth workers</Text>
          </View>
        </View>
      </View>

      {/* EU Grants */}
      <View style={[styles.section, { marginTop: 8 }]}>
        <Text style={styles.sectionTitle}>EU Grants</Text>
        <Text style={styles.sectionContent}>
          As a newly established organization, Asociación Cultural Colores del Mundo has not yet participated as a beneficiary in EU-funded projects. However, our team members have individual experience participating in Erasmus+ Youth Exchanges, Training Courses, and other European mobility programs.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{`Colores del Mundo | ${CONTACT.EMAIL}`}</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </View>
    </Page>
  </Document>
);

export default PIFDocument;

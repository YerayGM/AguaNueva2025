import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Times-Roman' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerBox: { border: '1pt solid #000', padding: 6, fontSize: 12, fontWeight: 'bold', minWidth: 90, textAlign: 'center' },
  expedienteBox: { border: '1pt solid #000', padding: 6, fontSize: 12, minWidth: 180, textAlign: 'left' },
  title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
  subtitle: { fontSize: 12, textAlign: 'center', marginBottom: 12, fontWeight: 'bold', textDecoration: 'underline' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
  line: { borderBottom: '1pt solid #222', marginVertical: 8 },
  small: { fontSize: 8, marginTop: 20, textAlign: 'justify' },
  footer: { fontSize: 10, textAlign: 'center', marginTop: 40, fontWeight: 'bold', textTransform: 'uppercase' }
});

interface Expediente {
  EXPEDIENTE?: string;
}

interface Persona {
  DNI?: string;
  DIRECCION?: string;
  LOCALIDAD?: string;
  TELEFONO?: string;
}

const currentYear = new Date().getFullYear();

export const CompromisosPDF = (
  { expediente, persona }: { expediente: Expediente, persona: Persona }
) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Cabecera */}
      <View style={styles.headerRow}>
        <View style={styles.headerBox}>
          <Text>AÑO {currentYear}</Text>
        </View>
        <View style={styles.expedienteBox}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>EXPEDIENTE Nº: </Text>
            {expediente?.EXPEDIENTE || '/'}
          </Text>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.title}>TARIFA AGROPECUARIA DEL CONSORCIO DE ABASTECIMIENTO DE AGUA A FUERTEVENTURA</Text>
      <Text style={styles.subtitle}>COMPROMISOS</Text>
      <View style={styles.line} />

      {/* Datos personales */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>D.N.I. nº:</Text> {persona?.DNI || ''}{"   "}
          <Text style={styles.label}>Domicilio:</Text> {persona?.DIRECCION || ''}{"   "}
          <Text style={styles.label}>T. M. de:</Text> {persona?.LOCALIDAD || ''}{"   "}
          <Text style={styles.label}>Teléfono nº:</Text> {persona?.TELEFONO || ''}
        </Text>
      </View>

      {/* Compromisos */}
      <Text style={{ marginBottom: 10 }}>
        Se compromete al cumplimiento de las siguientes obligaciones:
      </Text>
      <View style={styles.section}>
        <Text style={{ marginBottom: 6 }}>a) Destinar el uso del agua a la actividad agraria que fundamenta la concesión de las tarifas de agua agrícola.</Text>
        <Text style={{ marginBottom: 6 }}>b) Justificar el cumplimiento de los requisitos y condiciones que determinen ser usuario de dicha tarifa.</Text>
        <Text style={{ marginBottom: 6 }}>c) Someterse a las actuaciones de comprobación, tanto a los controles administrativos como los de campo, aportando cuanta información les sea requerida en el ejercicio de las actuaciones anteriores.</Text>
        <Text style={{ marginBottom: 6 }}>d) El usuario está obligado a notificar al Cabildo de Fuerteventura cualquier variación en las circunstancias y datos contemplados en su solicitud que dieron lugar a su condición de usuario de la tarifa especial de agua agrícola.</Text>
      </View>

      {/* Nota legal */}
      <Text style={styles.small}>
        La finalidad del tratamiento de los datos será la tramitación de la solicitud de tarifa técnica y se encuentra en el Consorcio Abastecimiento de Aguas Fuerteventura. Puede consultar la información adicional sobre protección de datos en la web del Cabildo de Fuerteventura.
      </Text>

      {/* Pie de página */}
      <Text style={styles.footer}>
        CONSEJERÍA DE AGRICULTURA, GANADERÍA Y PESCA DEL CABILDO DE FUERTEVENTURA
      </Text>
    </Page>
  </Document>
);
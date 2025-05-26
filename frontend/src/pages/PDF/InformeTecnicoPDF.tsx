import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Times-Roman' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerBox: { border: '1pt solid #000', padding: 6, fontSize: 12, fontWeight: 'bold', minWidth: 90, textAlign: 'center' },
  expedienteBox: { border: '1pt solid #000', padding: 6, fontSize: 12, minWidth: 180, textAlign: 'left' },
  title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
  subtitle: { fontSize: 12, textAlign: 'center', marginBottom: 12, fontWeight: 'bold' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
  line: { borderBottom: '1pt solid #222', marginVertical: 8 },
  small: { fontSize: 8, marginTop: 20, textAlign: 'justify' },
  footer: { fontSize: 10, textAlign: 'center', marginTop: 40, fontWeight: 'bold', textTransform: 'uppercase' }
});

type Expediente = {
  EXPEDIENTE?: string;
  DNI?: string;
  LUGAR?: string;
  LOCALIDAD?: string;
  ID_MUN?: string;
};

const currentYear = new Date().getFullYear();

export const InformeTecnicoPDF = ({ expediente }: { expediente: Expediente }) => (
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
      <Text style={styles.title}>SOLICITUD INFORME TÉCNICO PARA ACCEDER A LA TARIFA DE AGUA AGRÍCOLA</Text>
      <Text style={styles.subtitle}>Solicitud y declaración</Text>
      <View style={styles.line} />

      {/* Datos básicos */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Solicitante (DNI):</Text> {expediente?.DNI || ''}{"   "}
          <Text style={styles.label}>Lugar:</Text> {expediente?.LUGAR || ''}{"   "}
          <Text style={styles.label}>Localidad:</Text> {expediente?.LOCALIDAD || ''}{"   "}
          <Text style={styles.label}>Término municipal:</Text> {expediente?.ID_MUN || ''}
        </Text>
      </View>

      {/* Texto legal y declaración */}
      <Text style={{ marginBottom: 10, textAlign: 'justify' }}>
        En relación a la solicitud presentada ante el Consorcio de Abastecimiento de Aguas de Fuerteventura, para acogerse a la tarifa especial agrícola aprobada por el Consorcio, el abajo firmante declara bajo su responsabilidad que cumple los requisitos exigidos y se compromete a aportar la documentación que se le requiera, así como a notificar cualquier variación en los datos aportados.
      </Text>
      <Text style={{ marginBottom: 10, textAlign: 'justify' }}>
        Solicita el informe técnico establecido en la cláusula octava del condicionado, para acogerse a la tarifa de agua agrícola con destino a la actividad indicada anteriormente.
      </Text>

      {/* Nota legal */}
      <Text style={styles.small}>
        La finalidad del tratamiento de los datos será la tramitación de la solicitud y su gestión administrativa. Puede consultar la información adicional sobre protección de datos en la web del Cabildo de Fuerteventura.
      </Text>

      {/* Pie de página */}
      <Text style={styles.footer}>
        CONSEJERÍA DE AGRICULTURA, GANADERÍA Y PESCA DEL CABILDO DE FUERTEVENTURA
      </Text>
    </Page>
  </Document>
);
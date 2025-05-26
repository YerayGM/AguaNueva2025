import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Expediente, DatosExpediente } from '../../types';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerBox: { border: '1pt solid #000', padding: 6, fontSize: 12, fontWeight: 'bold', minWidth: 90, textAlign: 'center' },
  expedienteBox: { border: '1pt solid #000', padding: 6, fontSize: 12, minWidth: 180, textAlign: 'left' },
  title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
  subtitle: { fontSize: 12, textAlign: 'center', marginBottom: 12 },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
  line: { borderBottom: '1pt solid #222', marginVertical: 8 },
  table: { display: 'flex', width: 'auto', marginVertical: 10, borderStyle: 'solid', borderWidth: 1, borderColor: '#222' },
  tableRow: { flexDirection: 'row' },
  tableHeaderCell: {
    borderRightWidth: 1, borderRightColor: '#222', borderRightStyle: 'solid',
    backgroundColor: '#f0f0f0', fontWeight: 'bold', padding: 4, fontSize: 10, flex: 1, textAlign: 'center'
  },
  tableCell: {
    borderRightWidth: 1, borderRightColor: '#222', borderRightStyle: 'solid',
    padding: 4, fontSize: 10, flex: 1, textAlign: 'center'
  },
  lastCell: { borderRightWidth: 0 },
  small: { fontSize: 8, marginTop: 20, textAlign: 'justify' },
  footer: { fontSize: 10, textAlign: 'center', marginTop: 40, fontWeight: 'bold', textTransform: 'uppercase' }
});

type Props = {
  expediente: Expediente | null;
  conceptos: DatosExpediente[];
};

const currentYear = new Date().getFullYear();

export const DeclaracionActividadPDF = ({ expediente, conceptos }: Props) => (
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
      <Text style={styles.title}>SOLICITUD TARIFA AGUA AGRÍCOLA DEL CONSORCIO DE ABASTECIMIENTO DE AGUA A FUERTEVENTURA</Text>
      <Text style={styles.subtitle}>DECLARACIÓN DE ACTIVIDAD AGROPECUARIA</Text>
      <View style={styles.line} />

      {/* Datos básicos */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Lugar:</Text> {expediente?.LUGAR || ''}{"   "}
          <Text style={styles.label}>Localidad:</Text> {expediente?.LOCALIDAD || ''}{"   "}
          <Text style={styles.label}>Término municipal:</Text> {expediente?.ID_MUN || ''}
        </Text>
      </View>

      {/* Tabla de conceptos */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCell}>Actividad prevista</Text>
          <Text style={styles.tableHeaderCell}>Cantidad</Text>
          <Text style={styles.tableHeaderCell}>Desde</Text>
          <Text style={styles.tableHeaderCell}>Hasta</Text>
          <Text style={styles.tableHeaderCell}>PO</Text>
          <Text style={styles.tableHeaderCell}>PA</Text>
          <Text style={styles.tableHeaderCell}>RC</Text>
          <Text style={[styles.tableHeaderCell, styles.lastCell]}>Cultivo</Text>
        </View>
        {conceptos && conceptos.length > 0 ? (
          conceptos.map((c, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCell}>{c.ID_MATERIA}</Text>
              <Text style={styles.tableCell}>{c.CANTIDAD}</Text>
              <Text style={styles.tableCell}>{typeof c.DESDE === 'string' ? c.DESDE : c.DESDE?.toLocaleDateString?.() ?? ''}</Text>
              <Text style={styles.tableCell}>{typeof c.HASTA === 'string' ? c.HASTA : c.HASTA?.toLocaleDateString?.() ?? ''}</Text>
              <Text style={styles.tableCell}>{c.POLIGONO}</Text>
              <Text style={styles.tableCell}>{c.PARCELA}</Text>
              <Text style={styles.tableCell}>{c.RECINTO}</Text>
              <Text style={[styles.tableCell, styles.lastCell]}>{c.CULTIVO}</Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Sin conceptos</Text>
            {[...Array(7)].map((_, i) => (
              <Text
                key={i}
                style={[styles.tableCell, ...(i === 6 ? [styles.lastCell] : [])]}
              ></Text>
            ))}
          </View>
        )}
      </View>

      {/* Nota legal */}
      <Text style={styles.small}>
        La finalidad del tratamiento de los datos será la tramitación de la solicitud y su gestión administrativa. Puede consultar la información adicional sobre protección de datos en la web del Cabildo de Fuerteventura.
      </Text>

      {/* Pie de página */}
      <Text style={styles.footer}>
        ILMO. SR. PRESIDENTE DEL CONSORCIO DE ABASTECIMIENTO DE AGUA A FUERTEVENTURA
      </Text>
    </Page>
  </Document>
);
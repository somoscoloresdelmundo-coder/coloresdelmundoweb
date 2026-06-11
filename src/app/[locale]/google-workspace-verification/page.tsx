import { INSTITUTIONAL } from '@/config/constants';

export default function GoogleWorkspaceVerification() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1>Google Workspace for Nonprofits Verification</h1>
      <p>
        This page serves as verification that the domain <strong>coloresdelmundo.org</strong> is the official domain of the organization <strong>Colores del Mundo</strong>.
      </p>
      <ul>
        <li><strong>Organization:</strong> {INSTITUTIONAL.LEGAL_NAME}</li>
        <li><strong>Charity ID / CIF:</strong> {INSTITUTIONAL.CIF}</li>
        <li><strong>Email:</strong> somoscoloresdelmundo@gmail.com</li>
      </ul>
      <p>
        Este dominio está oficialmente vinculado a la asociación sin ánimo de lucro Colores del Mundo y es utilizado para nuestras operaciones y programas institucionales.
      </p>
    </div>
  );
}

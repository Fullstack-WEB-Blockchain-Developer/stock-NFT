import { TermsOfServicesPage } from 'src/page-components/TermsOfServicesPage/TermsOfServicesPage';
import { withHeader } from '../../layout/Layout';

const TermsOfServices = () => <TermsOfServicesPage type={'terms'} />;

export default withHeader(TermsOfServices);

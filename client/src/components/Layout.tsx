import Wrapper from './Wrapper';
import Navbar from './Navbar';

interface LayoutProps {
	children?: React.ReactNode;
	variant?: 'regular' | 'small';
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
	return (
		<>
			<Navbar />
			<Wrapper variant={variant}>{children}</Wrapper>
		</>
	);
};

export default Layout;

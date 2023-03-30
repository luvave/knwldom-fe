import { Graph } from './components/Graph/Graph';
import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

export default function App(): JSX.Element {
	const { isDark } = useTheme();
	const { setTheme } = useNextTheme();

	// TODO: Can do dark mode switch
	return (
		<>
			<Switch
				style={{ display: 'none' }}
				checked={isDark ?? false}
				defaultChecked
				onChange={(e) => {
					setTheme(e.target.checked ? 'dark' : 'light');
				}}
			/>
			<Graph userId={3} />
		</>
	);
}

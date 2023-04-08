import { darkTheme, lightTheme } from '../../constants/themes';
import { NextUIProvider, Switch, useTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

interface Props {
	children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
	const { isDark } = useTheme();
	const { setTheme } = useNextTheme();

	return (
		<NextThemesProvider
			themes={['light', 'dark']}
			defaultTheme="dark"
			enableSystem
			enableColorScheme
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<NextUIProvider>
				<Switch
					style={{ display: 'none' }}
					checked={isDark ?? false}
					defaultChecked
					onChange={(e) => {
						setTheme(e.target.checked ? 'dark' : 'light');
					}}
				/>
				{children}
			</NextUIProvider>
		</NextThemesProvider>
	);
};

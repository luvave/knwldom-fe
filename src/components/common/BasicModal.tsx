import { Modal, Button, Text } from '@nextui-org/react';
import { type ReactNode } from 'react';

interface Props {
	open: boolean;
	setOpen: (value: boolean) => void;
	body: ReactNode;
	title: string;
}

export const BasicModal = ({ open, setOpen, body, title }: Props) => {
	return (
		<Modal
			scroll
			width="600px"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Modal.Header>
				<Text id="modal-title" size={18}>
					{title}
				</Text>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button
					auto
					flat
					color="error"
					onPress={() => {
						setOpen(false);
					}}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

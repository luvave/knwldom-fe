import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/user';
import ForceGraph3D from '3d-force-graph';
import { Button, Container } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { generateAStickman, getLoadingImage } from '../../utils/3dObjects';
import { createGraphFromUserDto } from '../../utils/graph';
import { AddNewModal } from '../AddNewModal/AddNewModal';

interface Props {
	userId: number;
}

export const Graph = ({ userId }: Props): JSX.Element => {
	const containerRef = useRef(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const { data, refetch } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUserById(userId),
	});

	useEffect(() => {
		const graph = ForceGraph3D()(containerRef.current)
			.graphData({
				nodes: [],
				links: [],
			})
			.nodeAutoColorBy('group')
			.onNodeClick((node, event) => {
				if (node.group !== -1) {
					window.open(node.name, '_blank');
				}
			})
			.nodeThreeObject(({ id, name }) => {
				if (id === -1) {
					return generateAStickman();
				} else {
					return getLoadingImage(name);
				}
			});

		if (typeof data !== 'undefined') {
			graph.graphData(createGraphFromUserDto(data));

			const node = graph.graphData().nodes.find((n) => n.id === -1);
			if (typeof node !== 'undefined') {
				graph.cameraPosition(
					{ x: node.x, y: node.y, z: typeof node.z === 'number' ? node.z : 80 }, // new position
					{ x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 }, // lookAt ({ x, y, z })
					1000 // ms transition duration
				);
			}
		}

		return () => {
			graph.pauseAnimation();
		};
	}, [data]);

	return (
		<>
			<Container css={{ position: 'absolute' }} ref={containerRef} />
			<Container css={{ position: 'absolute', width: '200px', right: '15px', margin: '20px', zIndex: 2 }}>
				<Button
					color="gradient"
					shadow
					onPress={() => {
						setModalOpen(true);
					}}
				>
					Add new
				</Button>
			</Container>
			<AddNewModal userId={userId} open={modalOpen} setOpen={setModalOpen} afterAddFunc={refetch} />
		</>
	);
};

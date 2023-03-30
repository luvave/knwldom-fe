import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/user';
import ForceGraph3D from '3d-force-graph';
import { useEffect, useRef } from 'react';
import { generateAStickman, getLoadingImage } from '../../utils/3dObjects';

interface Props {
	userId: number;
}

export const Graph = ({ userId }: Props): JSX.Element => {
	const containerRef = useRef(null);

	const { data } = useQuery({
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
			graph.graphData({
				nodes: [
					{ id: -1, name: data?.name, group: -1 },
					...(data?.hasConnectionTo?.map((c, index) => {
						return {
							id: c,
							name: c,
							group: index,
						};
					}) ?? []),
				],
				links: data?.hasConnectionTo?.map((c) => {
					return {
						source: -1,
						target: c,
					};
				}),
			});

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
			<div style={{ position: 'absolute' }} ref={containerRef} />
			<div style={{ position: 'absolute', right: 0, margin: '30px', zIndex: 2 }}>
				<button>TODO: Open a modal</button>
			</div>
		</>
	);
};

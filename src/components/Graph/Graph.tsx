import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/user';
import ForceGraph3D from '3d-force-graph';
import { useEffect, useRef, useState } from 'react';
import { generateAStickman } from '../../utils/3dObjects';
import { createGraphFromUserDto } from '../../utils/graph';
import { AddNewModal } from '../AddNewModal/AddNewModal';
import { Button } from '../common/Buttons/Button';
import { FloatingContainer } from '../common/Containers/FloatingContainer';
import { BasicContainer } from '../common/Containers/BasicContainer';

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
    if (containerRef.current === null) {
      return;
    }
    const graph = ForceGraph3D()(containerRef.current)
      .graphData({
        nodes: [],
        links: [],
      })
      .nodeAutoColorBy('group')
      .onNodeClick((node, event) => {
        // if ('group' in node && 'name' in node && typeof node.name === 'string' && node.group !== -1) {
        //   window.open(node.name, '_blank');
        // }
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        const newPos =
          node.x || node.y || node.z
            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

        graph.cameraPosition(
          newPos, // new position
          node, // lookAt ({ x, y, z })
          3000, // ms transition duration
        );
      })
      .nodeThreeObject((object) => {
        return generateAStickman(object);
        //   if (object.id === -1) {
        //     return generateAStickman();
        //   } else if ('name' in object && typeof object.name === 'string') {
        //     return getLoadingImage(object.name);
        //   }
        //   // TODO: Return some default object
        //   return generateAStickman();
      });

    if (typeof data !== 'undefined') {
      graph.graphData(createGraphFromUserDto(data));

      const node = graph.graphData().nodes.find((n) => n.id === -1);
      if (typeof node !== 'undefined') {
        graph.cameraPosition(
          { x: node.x, y: node.y, z: typeof node.z === 'number' ? node.z : 80 }, // new position
          { x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 }, // lookAt ({ x, y, z })
          1000, // ms transition duration
        );
      }
    }

    return () => {
      graph.pauseAnimation();
    };
  }, [data]);

  const onAddNew = () => setModalOpen(true);

  return (
    <>
      <BasicContainer
        css={{ position: 'absolute' }}
        containerRef={containerRef}
      />
      <FloatingContainer type='right'>
        <Button
          type='gradient'
          onClick={onAddNew}
        >
          Add new
        </Button>
      </FloatingContainer>
      <AddNewModal
        userId={userId}
        open={modalOpen}
        setOpen={setModalOpen}
        afterAddFunc={refetch}
      />
    </>
  );
};

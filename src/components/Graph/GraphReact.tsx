import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/user';
import { useRef, useState, useCallback } from 'react';

import { AddNewModal } from '../AddNewModal/AddNewModal';
import { Button } from '../common/Buttons/Button';
import { FloatingContainer } from '../common/Containers/FloatingContainer';
import { CenteredContainer } from '../../components/common/Containers/CenteredContainer';
import type { ForceGraph3DInstance } from '3d-force-graph';
import type { NodeObject$1 } from '../../types/graph';

import { CenteredLoading } from '../../components/common/CenteredLoading';
import ForceGraph3d from './ForceGraph3d/ForceGraph3d';
import type { UserDto } from 'types/user';

interface Props {
  userId: number;
}

export interface Node extends NodeObject$1 {
  __threeObj: THREE.Group;
  index: number;
  name: string;
  color: string;
  group: number;
}

export const GraphReact = ({ userId }: Props): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [clickedNode, setClickedNode] = useState<Node | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });

  const graphRef = useRef<ForceGraph3DInstance | null>(null);

  // useEffect(() => {
  //   if (containerRef.current === null) {
  //     return;
  //   }
  //   const graph = ForceGraph3D()(containerRef.current)
  //     .graphData({
  //       nodes: [],
  //       links: [],
  //     })
  //     .nodeAutoColorBy('group')
  //     .onNodeClick((node, event) => {
  //       if ('group' in node && 'name' in node && typeof node.name === 'string' && node.group !== -1) {
  //         window.open(node.name, '_blank');
  //       }
  //     })
  //     .nodeThreeObject((object) => {
  //       return generateAStickman();
  //       // if (object.id === -1) {
  //       //   return generateAStickman();
  //       // } else if ('name' in object && typeof object.name === 'string') {
  //       //   return getLoadingImage(object.name);
  //       // }
  //       // // TODO: Return some default object
  //       // return generateAStickman();
  //     });

  //   if (typeof data !== 'undefined') {
  //     graph.graphData(createGraphFromUserDto(data));

  //     const node = graph.graphData().nodes.find((n) => n.id === -1);
  //     if (typeof node !== 'undefined') {
  //       graph.cameraPosition(
  //         { x: node.x, y: node.y, z: typeof node.z === 'number' ? node.z : 80 }, // new position
  //         { x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 }, // lookAt ({ x, y, z })
  //         1000, // ms transition duration
  //       );
  //     }
  //   }

  //   return () => {
  //     graph.pauseAnimation();
  //   };
  // }, [data]);

  // const generateItem2DMenu = (node: Node) => {
  //   const nodeEl = document.createElement('div');
  //   nodeEl.classList.add('nodeMenuWrapper');

  //   const focusOption = document.createElement('div');
  //   focusOption.classList.add('option');
  //   focusOption.innerHTML = 'Focus this node';
  //   focusOption.addEventListener('click', (e) => focusOnNode(node));
  //   focusOption.addEventListener('mouseover', (e) => (e.target.style.cursor = 'pointer'));

  //   nodeEl.appendChild(focusOption);

  //   const textObject = new CSS2DObject(nodeEl);
  //   textObject.position.x = 0;
  //   textObject.position.y = 0;
  //   textObject.name = 'menu';

  //   return textObject;
  // };

  const onAddNew = () => setModalOpen(true);

  const focusOnNode = useCallback((node: Node) => {
    if (!('x' in node) || !('y' in node) || !('z' in node) || graphRef.current === null) {
      return;
    }

    // Aim at node from outside it
    const distance = 20;
    const distRatio = 1 + distance / Math.hypot(node.x as number, node.y as number, node.z as number);

    const newPos =
      node.x || node.y || node.z
        ? {
            x: (node.x as number) * distRatio,
            y: (node.y as number) * distRatio,
            z: (node.z as number) * distRatio,
          }
        : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

    graphRef.current.cameraPosition(
      newPos, // new position
      {
        x: node.x as number,
        y: node.y as number,
        z: node.z as number,
      }, // lookAt ({ x, y, z })
      1500, // ms transition duration
    );
  }, []);

  const viewNodeInfo = (node: Node) => {
    if ('group' in node && 'name' in node && typeof node.name === 'string' && node.group !== -1) {
      window.open(node.name, '_blank');
    }
  };

  if (isLoading) return <CenteredLoading />;

  return (
    <>
      {clickedNode && (
        <FloatingContainer type='center'>
          <CenteredContainer>
            <div>{clickedNode.name}</div>
            {/* <Button
              type='gradient'
              onClick={() => focusOnNode(clickedNode)}
            >
              Focus node
            </Button> */}

            {
              // eslint-disable-next-line eqeqeq
              clickedNode.id != '-1' && (
                <Button
                  type='gradient'
                  onClick={() => viewNodeInfo(clickedNode)}
                >
                  View node info
                </Button>
              )
            }
          </CenteredContainer>
        </FloatingContainer>
      )}
      <ForceGraph3d
        graphRef={graphRef}
        data={data as UserDto}
        setClickedNode={setClickedNode}
        focusOnNode={focusOnNode}
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

import type { ForceGraph3DInstance } from '3d-force-graph';
import React, { memo } from 'react';
import type { SetStateAction } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { createGraphFromUserDto } from '../../../utils/graph';
import { generateAStickman } from '../../../utils/3dObjects';
import type { Node } from '../GraphReact';
import type { UserDto } from 'types/user';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import type { NodeObject$1 } from '../../../types/graph';

interface ForceGraph3dProps {
  graphRef: React.MutableRefObject<ForceGraph3DInstance | null>;
  data: UserDto;
  setClickedNode: React.Dispatch<SetStateAction<Node | null>>;
  focusOnNode: (node: Node) => void;
}

function ForceGraph3d(props: ForceGraph3dProps) {
  const { graphRef, data, setClickedNode, focusOnNode } = props;

  const focusOnInitialNode = (node: NodeObject$1) => {
    if (graphRef.current) {
      console.log('dklsf');
      graphRef.current.cameraPosition(
        {
          x: node.x,
          y: node.y,
          z: typeof node.z === 'number' ? node.z - 30 : 80,
        }, // new position
        { x: node.x ?? 0, y: node.y ?? 0, z: node.z ?? 0 }, // lookAt ({ x, y, z })
        1000, // ms transition duration
      );
    }
  };

  return (
    <ForceGraph3D
      // ForceGraphMethods$1 is not exported from force graph types, I can move it into /types/graph.ts
      ref={graphRef}
      graphData={createGraphFromUserDto(data)}
      nodeThreeObject={(node) => {
        if (node.id === -1) {
          focusOnInitialNode(node);
        }
        // if (object.id === -1) {
        //   return generateAStickman();
        // } else if ('name' in object && typeof object.name === 'string') {
        //   return getLoadingImage(object.name);
        // }
        // // TODO: Return some default object
        return generateAStickman(node);
      }}
      extraRenderers={[new CSS2DRenderer()]}
      onNodeClick={(node, event) => {
        const nodeCustom = node as Node;
        setClickedNode(nodeCustom);
        focusOnNode(nodeCustom);

        // if (clickedNode) {
        //   if (nodeCustom.name === clickedNode.name) {
        //     setClickedNode(null);
        //   } else {
        //     focusOnNode(nodeCustom);
        //     setTimeout(() => {
        //       setClickedNode(nodeCustom);
        //     }, 1000);
        //   }
        // } else {
        //   focusOnNode(nodeCustom);
        //   setTimeout(() => {
        //     setClickedNode(nodeCustom);
        //   }, 1000);
        // }
      }}
      nodeAutoColorBy={'group'}
    />
  );
}

export default memo(ForceGraph3d);

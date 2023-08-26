import { type RelationDto } from '../../types/generatedApi';
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import { generateAStickman, getLoadingImage } from '../../utils/3dObjects';
import {
  focusOnNode,
  getGraphData,
  getLinkObject,
  getNodeLabel,
  linkPositionUpdate,
  viewNodeInfo,
} from './GraphHandlers';
import { type GraphNode } from '../../types/graph';

interface Props {
  graphRef: any;
  initialNode: GraphNode;
  relations: RelationDto[];
  setCurrentNode: (node: GraphNode) => void;
  type: '3D' | '2D';
}

export const Graph = ({ initialNode, graphRef, relations, type, setCurrentNode }: Props) => {
  const focusOnInitialNode = (node: GraphNode) => {
    if (node.id === initialNode.uri) {
      return generateAStickman();
    }
    return getLoadingImage(node.data ?? '');
  };

  if (type === '2D') {
    return (
      <ForceGraph2D
        ref={graphRef}
        graphData={getGraphData(relations, initialNode)}
      />
    );
  }

  // TODO: When three.js supports WebGPU use WebGPURenderer extraRenderer
  return (
    <ForceGraph3D
      ref={graphRef}
      nodeThreeObject={focusOnInitialNode}
      onNodeClick={(node, e) => {
        focusOnNode(node, graphRef);
        setCurrentNode(node);
        if (e.ctrlKey) {
          viewNodeInfo(node);
        }
      }}
      linkThreeObjectExtend
      linkThreeObject={getLinkObject}
      graphData={getGraphData(relations, initialNode)}
      linkPositionUpdate={linkPositionUpdate}
      nodeAutoColorBy='group'
      nodeLabel={getNodeLabel}
    />
  );
};

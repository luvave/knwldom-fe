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

interface Props {
  graphRef: any;
  graphStartUri: string;
  relations: RelationDto[];
  type: '3D' | '2D';
}

export const Graph = ({ graphStartUri, graphRef, relations, type }: Props) => {
  const focusOnInitialNode = (node: any) => {
    if (node.id === graphStartUri) {
      return generateAStickman();
    }
    return getLoadingImage(node.id);
  };

  if (type === '2D') {
    return (
      <ForceGraph2D
        ref={graphRef}
        graphData={getGraphData(relations, graphStartUri)}
      />
    );
  }

  // TODO: When three.js supports WebGPU use WebGPURenderer extraRenderer
  return (
    <ForceGraph3D
      ref={graphRef}
      nodeThreeObject={focusOnInitialNode}
      onNodeClick={(node) => {
        focusOnNode(node, graphRef);
        viewNodeInfo(node);
      }}
      linkThreeObjectExtend
      linkThreeObject={getLinkObject}
      graphData={getGraphData(relations, graphStartUri)}
      linkPositionUpdate={linkPositionUpdate}
      nodeAutoColorBy='group'
      nodeLabel={getNodeLabel}
    />
  );
};

import { type RelationDto } from '../../types/generatedApi';
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';

interface Props {
  graphRef: any;
  graphStartUri: string;
  relations: RelationDto[];
  type: '3D' | '2D';
}

export const Graph = ({ graphStartUri, graphRef, relations, type }: Props) => {
  const getGraphData = (relations: RelationDto[]) => {
    return {
      nodes: [
        { id: graphStartUri, name: 'You', group: -1 },
        ...(relations.map((c, index) => {
          return {
            id: c.to,
            name: c.to,
            group: index,
          };
        }) ?? []),
      ],
      links:
        relations.map((c) => {
          return {
            source: c.from,
            target: c.to,
          };
        }) ?? [],
    };
  };

  if (type === '2D') {
    return (
      <ForceGraph2D
        ref={graphRef}
        graphData={getGraphData(relations)}
      />
    );
  }

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={getGraphData(relations)}
    />
  );
};

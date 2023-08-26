import { type RelationDto } from '../../types/generatedApi';
import { getResourceName, getResourceUrl } from '../../utils/resources';
import SpriteText from 'three-spritetext';
import { type GraphData, type GraphNode } from '../../types/graph';

export const getGraphData = (relations: RelationDto[], initialNode: GraphNode): GraphData => {
  return {
    nodes: [
      initialNode,
      ...(relations.map((c) => {
        return {
          id: c.relationUri ?? '',
          name: getResourceName(c.to ?? ''),
          uri: c.relationUri,
          data: c.to,
          group: c.relationType?.relationName,
        };
      }) ?? []),
    ],
    links:
      relations.map((c) => {
        return {
          source: c.from ?? '',
          target: c.relationUri ?? '',
          text: c.relationType?.relationName,
        };
      }) ?? [],
  };
};

export const getNodeLabel = (node: GraphNode) => {
  return node.name;
};

export const focusOnNode = (node: GraphNode, graphRef: any) => {
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
};

export const viewNodeInfo = (node: GraphNode) => {
  if ('group' in node && 'name' in node && typeof node.data === 'string' && node.group !== -1) {
    window.open(getResourceUrl(node.data), '_blank');
  }
};

export const getLinkObject = (link: any) => {
  const sprite = new SpriteText(link.text);
  sprite.color = 'lightgrey';
  sprite.textHeight = 1.5;
  return sprite;
};

export const linkPositionUpdate = (sprite: any, { start, end }: any) => {
  const positions: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];
  const middlePos = Object.assign(
    {},
    ...positions.map((c) => ({
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
    })),
  );
  // Position sprite
  Object.assign(sprite.position, middlePos);
};

export const mergeArraysOfRelations = (arr1: RelationDto[], arr2: RelationDto[]): RelationDto[] => {
  const idMap = new Map();
  for (const obj of arr1) {
    idMap.set(obj.relationUri, obj);
  }
  for (const obj of arr2) {
    if (!idMap.has(obj.relationUri)) {
      idMap.set(obj.relationUri, obj);
    }
  }
  return Array.from(idMap.values());
};

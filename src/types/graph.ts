export interface GraphNode {
  id: string;
  name: string;
  uri?: string;
  data?: string;
  group?: string | number;
}

export interface GraphLink {
  source: string;
  target: string;
  text?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

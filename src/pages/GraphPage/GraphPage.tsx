import { type RelationDto, type UserGraphDto } from '../../types/generatedApi';
import { useEffect, useRef, useState } from 'react';
import { FloatingContainer } from '../../components/common/Containers/FloatingContainer';
import { Button } from '../../components/common/Buttons/Button';
import { AddNewModal } from '../../components/AddNewModal/AddNewModal';
import { useGetRelationForGraph } from '../../services/generatedApi/api';
import { useTranslation } from 'react-i18next';
import { Graph } from '../../components/Graph/Graph';
import { type GraphNode } from '../../types/graph';
import { mergeArraysOfRelations } from '../../components/Graph/GraphHandlers';
import { SearchUserModal } from '../../components/SearchUserModal/SearchUserModal';

interface Props {
  allGraphs: UserGraphDto[];
  initialGraph: UserGraphDto;
}

export const GraphPage = ({ initialGraph, allGraphs }: Props) => {
  const [currentGraph] = useState<UserGraphDto>(initialGraph);

  const defaultNode: GraphNode = {
    id: currentGraph.graph?.graphUri ?? '',
    name: 'You',
    group: -1,
    uri: currentGraph.graph?.graphUri,
  };

  const { t } = useTranslation();
  const [currentNode, setCurrentNode] = useState<GraphNode>(defaultNode);
  const [addNewModalOpen, setAddNewModalOpen] = useState<boolean>(false);
  const [searchUserModalOpen, setSearchUserModalOpen] = useState<boolean>(false);

  const { data, refetch } = useGetRelationForGraph(currentNode.uri ?? '');
  const graphRef = useRef(null);

  const [fetchedRelations, setFetchedRelations] = useState<RelationDto[]>(data ?? []);
  useEffect(() => {
    setFetchedRelations((prev) => mergeArraysOfRelations(prev, data ?? []));
  }, [data]);

  return (
    <>
      <FloatingContainer type='right'>
        <Button
          type='gradient'
          onClick={() => setAddNewModalOpen(true)}
        >
          {t('graphPage.addNew', { name: currentNode.name })}
        </Button>
        <Button
          type='gradient'
          css={{ mt: '10px' }}
          onClick={() => setSearchUserModalOpen(true)}
        >
          {t('graphPage.searchUser')}
        </Button>
      </FloatingContainer>

      <Graph
        initialNode={defaultNode}
        graphRef={graphRef}
        type='3D'
        setCurrentNode={setCurrentNode}
        relations={fetchedRelations}
      />

      <AddNewModal
        open={addNewModalOpen}
        currentNode={currentNode}
        setOpen={setAddNewModalOpen}
        afterAddFunc={refetch}
        currentRelationCount={data?.length ?? 0}
      />
      <SearchUserModal
        open={searchUserModalOpen}
        setOpen={setSearchUserModalOpen}
      />
    </>
  );
};
